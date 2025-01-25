import { Link } from 'react-router-dom';
export default function ImageCard({ imageData }) {
  
  return (
    // <Masonry>
      <Link to={`/image/${imageData?.id}`}>
        <img src={imageData?.urls?.regular} alt={imageData?.alt_description} className="rounded-[0.25rem]"></img>
      </Link>
    // </Masonry>
  )
}
