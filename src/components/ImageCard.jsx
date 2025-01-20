import React from 'react'
import { Link } from 'react-router-dom';
import Masonry from 'react-responsive-masonry';
export default function ImageCard({ imageData: { id, alt, urls } }) {
  return (
    // <Masonry>
      <Link to={''} >
        <img src={urls.regular} alt={alt} className="rounded-[0.25rem]"></img>
      </Link>
    // </Masonry>
  )
}
