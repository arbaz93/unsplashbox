import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useStore, useCollectionsStore, useAccessStore } from '../zustandstore/store';
import { AuthenticateButton, Heading, CollectionCard } from '../components';
import { fetchAccessToken } from '../js/OAuth';
import { getUserCollections, fetchFeaturedCollections } from '../js/handleCollectionsAPI';
import Cookies from 'js-cookie';

const redirectUri = window.location.origin + '/collections'; // Redirect URI for the OAuth flow

export default function Collections() {
  const [tab, setTab] = useState('featured');
  const [featuredPage, setFeaturedPage] = useState(1);
  const [userPage, setUserPage] = useState(1);
  const [fetchStatus, setFetchStatus] = useState('fetching');
  const [featuredCollections, setFeaturedCollections] = useState([]);
  const [userCollections, setUserCollections] = useState([]);
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
          setTab('user_collections');
          setResponseMessage({ message: `Welcome ${res.data?.username ?? ''}!`, type: 'success' });

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
  function handleCollectionTab() {

    if (tab === 'featured') {
      fetchFeaturedCollections(featuredPage)
        .then(res => {
          const newData = res.data;

          const uniqueCollections = [...featuredCollections, ...newData].reduce((acc, item) => {
            acc.set(item.id, item)
            return acc;
          }, new Map());


          const updatedCollections = Array.from(uniqueCollections.values());

          setFeaturedCollections(updatedCollections);
          setCollections(updatedCollections);
          if(res.data.length === 0) setFetchStatus('empty');
        }
        )
        .catch(err => {
          console.error(err);
          setResponseMessage({ message: `${err.status} : ${(err.status == 403 ? 'limit reached ' : 'Something went wrong!')}`, type: 'error' });
        })
    }
    if (tab === 'user_collections') {
      if (accessToken) {
        getUserCollections(accessToken?.username, userPage)
          .then(res => {
            const newData = res.data;

            const uniqueCollections = [...userCollections, ...newData].reduce((acc, item) => {
              acc.set(item.id, item)
              return acc;
            }, new Map());
  
  
            const updatedCollections = Array.from(uniqueCollections.values());
            setUserCollections(updatedCollections)
            setCollections(updatedCollections)
            if(res.data.length === 0) setFetchStatus('empty');
          })
          .catch(err => {
            console.error(err);
            setResponseMessage({ message: `${err.status} : ${(err.status == 403 ? 'limit reached ' : 'Something went wrong!')}`, type: 'error' });
          })
      }
    }
  }
  function handlePageScroll() {
    if(tab === 'featured') {
      setFeaturedPage(prev => prev + 1);
    }
    if(tab === 'user_collections') {
      setUserPage(prev => prev + 1);
    }
  }
  function handleTabChange(tabName) {
    setFetchStatus('fetching')
    setTab(tabName)
  }
  useEffect(() => {
    checkAccessToken();
    urlRedirectHandler();
  }, [])
  useEffect(() => {
    handleCollectionTab();
  }, [tab, userPage, featuredPage])
  return (
    <section className='flex flex-col gap-12 py-12 px-8 min-height-equal-vh-minus-nav-footer'>
      <div className='flex flex-col gap-4 text-center items-center'>
        <Heading title={'Collections'} gradient={true} />
        <div>
          <p className={'font-light text-lg max-w-[40ch] text-pretty'}>Explore the world through collections of beautiful photos free to use under the <a className='font-semibold text-ntrl-clr-300 underline' href='https://unsplash.com/license'>Unsplash License</a>.</p>
        </div>
        <div className='flex gap-4'>
          <button className={" text-sm px-6 py-2 rounded-[0.25rem] " + ((tab === 'featured') && ' bg-ntrl-clr-100 text-ntrl-clr-300 font-semibold')} onClick={() => { handleTabChange('featured') }} title='featured collections button'>Featured Collections</button>
          <button className={" text-sm px-6 py-2 rounded-[0.25rem] " + ((tab === 'user_collections') && ' bg-ntrl-clr-100 text-ntrl-clr-300 font-semibold')} onClick={() => {  handleTabChange('user_collections')}} title='your collections button'>Your Collections</button>
        </div>
      </div>
      {(!accessToken && (tab == 'user_collections'))
        ? <div className='flex flex-1 justify-center items-center'>
          <div ><AuthenticateButton redirectUri={redirectUri} /></div>
        </div>
        : (<InfiniteScroll
          className="ml-auto overflow-hidden"
          dataLength={collections.length}
          next={handlePageScroll}
          hasMore={fetchStatus === 'empty' ? false : true}
        >
          <div className='collections-grid flex flex-1 flex-wrap gap-12 justify-center'>
            {collections.map(collection => <CollectionCard key={collection.id} collection={collection} />)}
          </div>
        </InfiniteScroll>)
      }
    </section>

  )
}
