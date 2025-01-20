import { useLocation } from "react-router-dom";
import { SearchForm, ImageCard } from "../components"
import { ResponsiveMasonry} from 'react-responsive-masonry';
import { useEffect, useState } from "react";
import { fetchFromAPI } from "../js/fetchFromAPI";

export default function SearchFeed() {
  const searchQuery = useLocation().state.searchQuery;
  const [images, setImages] = useState([])

  useEffect(() => {
    fetchFromAPI(`search/photos?query=${searchQuery}`).then(res => {
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
    });
  }, [])

  function handleClick() {
    console.log(images)
  }
  return (
    <section className="flex flex-col">
      <div onClick={handleClick}>
        <SearchForm text={searchQuery}/>
      </div>
      <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
        {images.map(imageData => <ImageCard key={imageData.id} imageData={imageData} />)}
      </ResponsiveMasonry>
    </section>
  )
}
