import { useLocation } from "react-router-dom";
import { SearchForm, ImageCard } from "../components"
import Masonry, { ResponsiveMasonry} from 'react-responsive-masonry';
import { useEffect, useState } from "react";
import { fetchFromAPI } from "../js/fetchFromAPI";

export default function SearchFeed() {
  const searchQuery = useLocation().state.searchQuery;
  const [images, setImages] = useState([])
  const [fetchStatus, setFetchStatus] = useState('fetching');

  useEffect(() => {
    fetchFromAPI(`search/photos?query=${searchQuery}`)
    .then(res => {
      if(res.total != 0) {
        setFetchStatus('200')
        setImages(res.results.map(i => {
          const IMAGE_DATA = {
            id: i.id,
            alt: i.alt_description,
            created_at: i.created_at,
            height: i.height,
            width: i.width,
            links: i.links,
            urls: i.urls,
            user: i.user
          }
          return IMAGE_DATA;
        }));
      } else {
        setFetchStatus('empty')
      }
    })
    .catch(error => {
      console.error(error)
    });
  }, [])

  function handleClick() {
    console.log(images)
  }
  return (
    <section className="flex flex-col items-center">
      <div onClick={handleClick} className="pt-16 pb-16 half-gradient">
        <SearchForm text={searchQuery}/>
      </div>
      {fetchStatus === 'fetching' ? <p>Loading!</p> 
      : fetchStatus === 'empty' ? <p>{searchQuery} not found!</p> 
      : <ResponsiveMasonry className="w-[80%]" columnsCountBreakPoints={{350: 2, 640: 3, 900: 4}}>
        <Masonry gutter='1rem'>
          
        {images.map(imageData => <ImageCard key={imageData.id} imageData={imageData} />)}
        </Masonry>
      </ResponsiveMasonry>
      }
    </section>
  )
}
