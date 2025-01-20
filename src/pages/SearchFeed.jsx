import { useLocation } from "react-router-dom";
import { SearchForm, ImageCard } from "../components"
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from "react";
import { fetchFromAPI } from "../js/fetchFromAPI";

export default function SearchFeed() {
  const searchQuery = useLocation().state.searchQuery;
  const [images, setImages] = useState([])
  const [fetchStatus, setFetchStatus] = useState('fetching');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchImages();
  }, [])

  function handleClick() {
    console.log(fetchStatus)
  }
  function fetchImages() {
    fetchFromAPI(`search/photos?query=${searchQuery}`, currentPage)
      .then(res => {
        console.log(res)
        if (res.results.length != 0) {
          setFetchStatus('200')
          setImages(images.concat(res.results.map(i => {
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
          })));
        } else {
          setFetchStatus('empty')
        }
      })
      .catch(error => {
        console.error(error)
      });
    setCurrentPage(currentPage + 1)
    console.log(currentPage)
  }
  return (
    <section className=" flex-col flex items-center">
      <div onClick={handleClick} className="pt-16 pb-16 w-full flex justify-center half-gradient">
        <SearchForm text={searchQuery} />
      </div>
      {fetchStatus === 'fetching' ? <p>Loading!</p>
        : (fetchStatus === 'empty' && images.length === 0) ? <p>{searchQuery} not found!</p>
          : <ResponsiveMasonry className="w-[80%]" columnsCountBreakPoints={{ 350: 2, 640: 3, 900: 4 }}>
            <InfiniteScroll
              dataLength={images.length}
              next={fetchImages}
              hasMore={fetchStatus === 'empty' ? false : true}
              loader={<h1>loadad</h1>}
            >
              <Masonry gutter='1rem'>

                {images.map(imageData => <ImageCard key={imageData.id} imageData={imageData} />)}
              </Masonry>
            </InfiniteScroll>
          </ResponsiveMasonry>
      }
    </section>
  )
}
