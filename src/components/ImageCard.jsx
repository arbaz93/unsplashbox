import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
export default function ImageCard({ imageData }) {
  
  const navigate = useNavigate();
  function handleClick(e) {
    e.preventDefault();
    navigate(`/image` , {state: {imageData}})
  }
  return (
    // <Masonry>
      <Link to={`/image`} onClick={handleClick}>
        <img src={imageData?.urls?.regular} alt={imageData?.alt} className="rounded-[0.25rem]"></img>
      </Link>
    // </Masonry>
  )
}
