import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useStore, useCollectionsStore } from '../zustandstore/store';
import { fetchCollectionImages } from '../js/handleCollectionsAPI';
import { Description, Heading, ImageGrid, Spinner } from '../components';

export default function Collection() {
  const { id, collectionname, totalphotos } = useParams();
  const [collectionImages, setCollectionImages] = useState([]);
  const [fetchStatus, setFetchStatus] = useState('fetching');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTotalImages, setCurrentTotalImages] = useState(0);
  // zustand store
  const setResponseMessage = useStore(state => state.setResponseMessage);

  useEffect(() => {
    handleFetch();
  }, []);

  function handleFetch() {
    fetchCollectionImages(id, currentPage)
      .then(res => {
        if (res.data.length != 0) {
          setFetchStatus('200');
          setCurrentTotalImages(prev => prev + res.data.length);
          setCollectionImages(prevImages => {
            const newImages = res.data.filter(img => !prevImages.some(prev => prev.id === img.id));
            return [...prevImages, ...newImages];
          });
          setCurrentPage(currentPage + 1);

        } else if (res.data.length == 0 && collectionImages.length == 0) {
          setFetchStatus('premium');
        } else {
          setFetchStatus('empty');
        }
      })
      .catch(err => {
        setResponseMessage(`something went wrong! | ${err.status}`);
        setFetchStatus(err.status)
        console.error(err)
      })
  }
  return (
    <section className='flex flex-col gap-10 py-12 px-8 min-height-equal-vh-minus-nav-footer'>
      <div className='flex flex-col items-center text-center '>
        <Heading title={collectionname} gradient={true} />
        <Description text={`${currentTotalImages} / ${totalphotos ?? '##'} photos`} size={'lg'} />
      </div>
      <div className={'flex-1 ' + (fetchStatus === 'premium' && ' flex items-center justify-center')}>
        {fetchStatus === 'fetching' ? <div className='flex justify-center items-center w-full h-full'><Spinner /></div>
          : fetchStatus === 400 || fetchStatus === 401 || fetchStatus === 404 || fetchStatus === 505 || fetchStatus === 503 ? <div><p className='text-center'>{fetchStatus} | Something went wrong!</p></div>
            : fetchStatus === 403 ? <div><p className='text-center'>Demo limit reached!</p></div>
              : fetchStatus === 'premium' ? <div><p className='text-center'>This collection features exclusive premium images. Access to these images is restricted and not available for public viewing.<br /> To explore this collection, please visit <a className='text-blue-500' href={`https://unsplash.com/collections/${id}`}>this link</a></p></div>
                : <ImageGrid images={collectionImages} callback={handleFetch} fetchStatus={fetchStatus} />
        }
      </div>
      <div className='text-center opacity-50'>
        <Description text={'Certain premium and private images may not be visible.'} />

      </div>
    </section>
  )
}
