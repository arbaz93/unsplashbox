import { useEffect, useState } from 'react'
import { useSearchParams, useParams } from 'react-router-dom'
import { GrayButton, DownloadButton, CollectionItem, ImageCard, ProfileImage, HeadingSmall, Description, AddToCollection, Spinner, Error, AuthenticateMessage, AuthenticateButton, FullScreenImage } from '../components';
import { fetchAccessToken } from '../js/OAuth.js';
import { fetchImageFromAPI } from '../js/handleImageAPI.js';
import { getUserCollections, fetchCollectionImages } from '../js/handleCollectionsAPI';
import Cookies from 'js-cookie';
import { useAccessStore, useCollectionsStore, useAuthStore } from '../zustandstore/store.jsx';
import RelatedImages from '../components/RelatedImages.jsx';

const redirectUri = window.location.origin + '/image'; // Redirect URI for the OAuth flow

export default function ImageFeed() {

  const [imageData, setImageData] = useState({});
  const [loadingStatus, setLoadingStatus] = useState('loading');
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorLog, setErrorLog] = useState();
  const [imageId, setImageId] = useState('');
  const [imageFullScreen, setImageFullScreen] = useState(false);
  const [collectionsBelongingToImage, setCollectionsBelongingToImage] = useState([]);
  const [searchParams] = useSearchParams();
  const { id } = useParams();

  // zustend state management
  const displayAddToCollections = useCollectionsStore(state => state.displayAddToCollections);
  const setDisplayAddToCollections = useCollectionsStore(state => state.setDisplayAddToCollections);
  const accessToken = useAccessStore(state => state.accessToken);
  const setAccessToken = useAccessStore(state => state.setAccessToken);
  const setCollections = useCollectionsStore(state => state.setCollections);
  const displayAuthMessage = useAuthStore(state => state.displayAuthMessage);
  const setDisplayAuthMessage = useAuthStore(state => state.setDisplayAuthMessage);

  const { user, created_at } = imageData;
  // Icons
  const plusIcon = <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.6665 7.33335H8.6665V3.33335C8.6665 3.15654 8.59627 2.98697 8.47124 2.86195C8.34622 2.73693 8.17665 2.66669 7.99984 2.66669C7.82303 2.66669 7.65346 2.73693 7.52843 2.86195C7.40341 2.98697 7.33317 3.15654 7.33317 3.33335V7.33335H3.33317C3.15636 7.33335 2.98679 7.40359 2.86177 7.52862C2.73674 7.65364 2.6665 7.82321 2.6665 8.00002C2.6665 8.17683 2.73674 8.3464 2.86177 8.47142C2.98679 8.59645 3.15636 8.66669 3.33317 8.66669H7.33317V12.6667C7.33317 12.8435 7.40341 13.0131 7.52843 13.1381C7.65346 13.2631 7.82303 13.3334 7.99984 13.3334C8.17665 13.3334 8.34622 13.2631 8.47124 13.1381C8.59627 13.0131 8.6665 12.8435 8.6665 12.6667V8.66669H12.6665C12.8433 8.66669 13.0129 8.59645 13.1379 8.47142C13.2629 8.3464 13.3332 8.17683 13.3332 8.00002C13.3332 7.82321 13.2629 7.65364 13.1379 7.52862C13.0129 7.40359 12.8433 7.33335 12.6665 7.33335Z" fill="#121826" />
  </svg>

  // Date
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const date = new Date(created_at);

  function fetchImageData(imageId) {
    setIsLoaded(false);
    setLoadingStatus('loading');
    fetchImageFromAPI(imageId)
      .then(res => {
        setImageData(res)
        setLoadingStatus('loaded')
      })
      .catch(error => {
        console.error(error)
        setErrorLog(error)
        setLoadingStatus('error')
      })
  }
  // This function checks if page is a redirect. if it is a redirect then it handles it accordingly
  function urlRedirectHandler() {
    const code = searchParams.get("code"); // Extracts the 'code' query parameter
    const imageId = searchParams.get("state"); // Extracts the 'state' query parameter
    if (code) { // if code exist fetch image data, access token and collections belonging to this image
      getCollectionsThatContainCurrentImage(imageId);
      fetchImageData(imageId);
      fetchAccessToken(code, redirectUri)
        .then(res => {
          Cookies.set('ACCESS_TOKEN_UBOX', JSON.stringify(res.data)) // Set access token to cookies
          setAccessToken(res.data); // Remove or keep it Check later

        }).catch(error => console.error(error));
      // Proceed with exchanging the authorization code for an access token
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
  function getCollectionsThatContainCurrentImage(imageId, collectionsData = []) {
    collectionsData.forEach(collection => {
      // map over each collection and fetch that collection images from api then add the collection to collectionsBelongingToImage if current image exist in this collection

      fetchCollectionImages(collection.id)
        .then(res => {

          // if image exist in the collection
          if (res.data.some(image => image.id === imageId)) {
            setCollectionsBelongingToImage(prev => {
              const isAlreadyAdded = prev.some(col => col.id == collection.id);
              return isAlreadyAdded ? prev : [...prev, collection];
            })
          }


        })
        .catch(err => {
          console.error(err)
        })
    });
  }
  // This functions renders AddToCollection component
  function handleAddToCollectionDisplay() {
    // if access token exist then render AddToCollection else render AuthenticationMesssage component
    if (Cookies.get('ACCESS_TOKEN_UBOX')) {
      setDisplayAddToCollections(true)
    } else {
      setDisplayAuthMessage(true)
    }

  }
  function handleImageFullScreen() {
    setImageFullScreen(prev => !prev);
  }
  useEffect(() => {
    urlRedirectHandler();
    checkAccessToken();
    if (id) {
      setImageId(id);
      fetchImageData(id);
    } else {
      const imageId = searchParams.get("state"); // Extracts the 'state' query parameter
      setImageId(imageId);
    }
  }, [id])

  useEffect(() => {
    // if access token exists then fetch user collections and then set them to collections and run getCollectionsThatContainCurrentImage()
    if (accessToken) {
      getUserCollections(accessToken?.username).then(res => {
        setCollections(res.data);
        getCollectionsThatContainCurrentImage(id ?? imageId, res.data);
      })
    }
  }, [accessToken])

  return (
    <>

      {loadingStatus === 'loading' ? <div className="flex justify-center items-center min-height-equal-vh-minus-nav-footer w-screen"><Spinner /></div> : loadingStatus === 'error' ? <Error error={errorLog} /> :
        (
          <section className="grid grid-cols-1 sm:grid-cols-2 py-16 sm:px-12 gap-9 justify-center min-height-equal-vh-minus-nav-footer">
            {displayAuthMessage && <AuthenticateMessage imageId={id} redirectUri={redirectUri} />}
            {displayAddToCollections && <AddToCollection photoId={imageId} setCollectionsBelongingToImage={setCollectionsBelongingToImage} />}
            {imageFullScreen && <FullScreenImage src={imageData?.urls?.regular} alt={imageData?.alt_description} callback={handleImageFullScreen} />}
            <div onClick={handleImageFullScreen}>
              <ImageCard
                imageData={imageData}
                size={'regular'}
                isLoaded={isLoaded}
                onLoad={() => setIsLoaded(true)}
              />
            </div>
            <div className='flex flex-col gap-10 px-4'>
              <div className="flex flex-col gap-4">
                <div className='user flex gap-4  items-center text-center sm:text-left'>
                  <ProfileImage link={user?.links.html} imageLink={user?.profile_image?.medium} alt={user?.first_name} />
                  <HeadingSmall text={(user?.first_name ?? 'Name is Undefined') + " " + (user?.last_name ?? '')} />
                </div>
                <div>
                  <Description text={`Published on ${MONTHS[date?.getMonth()] ?? ''} ${date?.getDate() ?? ''}, ${date?.getFullYear() ?? ''}`} size='mid' />
                </div>
                <div className='flex flex-wrap gap-4'>
                  <GrayButton icon={plusIcon} text="Add to Collection" callback={handleAddToCollectionDisplay} />
                  <DownloadButton text="Download" filename={imageData.alt_description} imageLink={imageData.links.download_location} />
                </div>
              </div>
              <div className='flex flex-col gap-4'>
                <h2 className='text-ntrl-clr-300 font-semibold text-2xl'>Collections</h2>

                {(accessToken === null) ? <AuthenticateButton imageId={imageId} redirectUri={redirectUri} />
                  : collectionsBelongingToImage.length === 0 ? <Description text='No collections found' size='mid' />
                    : collectionsBelongingToImage.map(collection => {
                      return <CollectionItem key={collection.id} data={collection} photoId={id} actionType={'remove'} setCollectionsBelongingToImage={setCollectionsBelongingToImage} />
                    })}
              </div>
            </div>
            <div className='mt-12 px-4'>
              <HeadingSmall text={'Related images'} />
              <RelatedImages query={imageData?.tags[0]?.title} count={10} />
            </div>
          </section>
        )
      }
    </>
  )
}
