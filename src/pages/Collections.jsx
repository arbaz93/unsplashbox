import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useStore, useCollectionsStore, useAccessStore } from '../zustandstore/store';
import { AuthenticateButton, Heading, CollectionCard } from '../components';
import { fetchAccessToken } from '../js/OAuth';
import { getUserCollections } from '../js/handleCollectionsAPI';
import Cookies from 'js-cookie';

const redirectUri = window.location.origin + '/collections'; // Redirect URI for the OAuth flow

export default function Collections() {

  // zustand store
  const collections = useCollectionsStore(state => state.collections);
  const setCollections = useCollectionsStore(state => state.setCollections);
  const accessToken = useAccessStore(state => state.accessToken);
  const setAccessToken = useAccessStore(state => state.setAccessToken);
  const setResponseMessage = useStore(state => state.setResponseMessage);

  const [searchParams] = useSearchParams();

  function urlRedirectHandler() {
    const code = searchParams.get("code"); // Extracts the 'code' query parameter
    if (code) { // if code exist fetch image data, access token and collections belonging to this image
      // Proceed with exchanging the authorization code for an access token
      fetchAccessToken(code, redirectUri)
        .then(res => {
          Cookies.set('ACCESS_TOKEN_UBOX', JSON.stringify(res.data)) // Set access token to cookies
          setAccessToken(res.data); // Remove or keep it Check later
          console.log(res.data);
          setResponseMessage({message: `Welcome ${res.data?.username ?? ''}!`, type:'success'});

        }).catch(error => console.error(error));
    } else {
      console.log('No authorization code found. This may not be a redirect.');
    }
  }
  function checkAccessToken() {
    if (Cookies.get('ACCESS_TOKEN_UBOX')) {
      // if access Token exist in cookies then set access token
      setAccessToken(JSON.parse(Cookies.get('ACCESS_TOKEN_UBOX')))
    }
  }
  useEffect(() => {
    checkAccessToken();
    urlRedirectHandler();
  }, [])
  useEffect(() => {
    // if access token exists then fetch user collections and then set them to collections and run getCollectionsThatContainCurrentImage()
    if (accessToken) {
      getUserCollections(accessToken?.username).then(res => {
        setCollections(res.data);
        console.log(res.data)
      })
    }
  }, [accessToken])

  return (
    <section className='flex flex-col gap-12 py-12 px-8 min-height-equal-vh-minus-nav-footer'>
      <div className='flex flex-col gap-4 text-center items-center'>
        <Heading title={'Collections'} gradient={true} />
        <div>
          <p className={'font-light text-lg max-w-[40ch] text-pretty'}>Explore the world through collections of beautiful photos free to use under the <a className='font-semibold text-ntrl-clr-300 underline' href='https://unsplash.com/license'>Unsplash License</a>.</p>
        </div>
      </div>
     {accessToken 
     ? ( <div className='collections-grid flex flex-1 flex-wrap gap-12 justify-center'>
        {collections.map(collection => <CollectionCard key={collection.id} collection={collection} />)}
      </div>) 
      : <div className='flex flex-1 justify-center items-center'>
        <div ><AuthenticateButton redirectUri={redirectUri} /></div>
      </div>
      }
    </section>

  )
}
