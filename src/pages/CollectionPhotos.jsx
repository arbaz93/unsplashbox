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
          setCollectionImages(prevImages => {
            const newImages = res.data.filter(img => !prevImages.some(prev => prev.id === img.id));
            return [...prevImages, ...newImages];
          });
          setCurrentPage(currentPage + 1);
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
        <Description text={`${totalphotos ?? '##'} photos`} size={'lg'} />
      </div>
      <div className='flex-1'>
        {fetchStatus === 'fetching' ? <div className='flex justify-center items-center w-full h-full'><Spinner /></div>
          : fetchStatus === 400 || fetchStatus === 401 || fetchStatus === 403 || fetchStatus === 404 || fetchStatus === 505 || fetchStatus === 503 ? <p>{fetchStatus} | Something went wrong!</p>
            : <ImageGrid images={collectionImages} callback={handleFetch} fetchStatus={fetchStatus} />
        }
      </div>
      <div className='text-center opacity-50'>
        <Description text={'Certain premium and private images may not be visible.'} />

      </div>
    </section>
  )
}
