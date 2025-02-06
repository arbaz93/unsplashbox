import { useLocation } from "react-router-dom";
import { SearchForm, ImageGrid } from "../components"
import { useEffect, useState } from "react";
import { fetchSearchImagesFromAPI } from "../js/handleImageAPI";
export default function SearchFeed() {
  const searchQuery = useLocation().state.searchQuery;
  const [images, setImages] = useState([])
  const [fetchStatus, setFetchStatus] = useState('fetching');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchImages();
  }, [])


  function fetchImages() {
    fetchSearchImagesFromAPI(`search/photos?query=${searchQuery}`, currentPage)
      .then(res => {
        if (res.results.length != 0) {
          setFetchStatus('200')
          setImages(images.concat(res.results.map(i => {
            const IMAGE_DATA = {
              id: i.id,
              collections: i.current_user_collections,
              alt: i.alt_description,
              created_at: i.created_at,
              height: i.height,
              width: i.width,
              blur_hash: i.blur_hash,
              links: i.links,
              urls: i.urls,
              user: i.user
            }
            return IMAGE_DATA;
          })));
        } else {
          setFetchStatus('empty')
        }
      }).catch(error => {
        setFetchStatus(error.status)
        console.error(error)
      });
    setCurrentPage(currentPage + 1)
  }
  const spinner = <svg className="animate-spin " width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z"/></svg>;
  return (
    <section className=" flex-col pb-16 flex items-center min-height-equal-vh-minus-nav-footer">
      <div className="pt-16 pb-16 pl-9 pr-9 w-full flex justify-center half-gradient">
        <SearchForm text={searchQuery} />
      </div>
      {fetchStatus === 'fetching' ? spinner
        : fetchStatus === 400 ||  fetchStatus === 401 || fetchStatus === 403 || fetchStatus === 404 || fetchStatus === 505 || fetchStatus === 503 ? <p>{fetchStatus} | Something went wrong!</p>
        : (fetchStatus === 'empty' && images.length === 0) ? <p>{searchQuery} not found!</p>
          : <ImageGrid images={images} callback={fetchImages} fetchStatus={fetchStatus} />
      }
    </section>
  )
}
