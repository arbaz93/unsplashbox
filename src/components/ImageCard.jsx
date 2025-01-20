import React from 'react'
import { Link } from 'react-router-dom';
import Masonry from 'react-responsive-masonry';
export default function ImageCard({ imageData }) {
  return (
    <Link to={''} >
        <Masonry>
            <img src='' alt=''></img>
        </Masonry>
    </Link>
  )
}
