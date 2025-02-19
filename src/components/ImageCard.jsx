import { Link } from 'react-router-dom';
import { Blurhash } from 'react-blurhash';
import { useEffect } from 'react';
import { ImageElement } from '.';

export default function ImageCard({ imageData, isLoaded, onLoad, size }) {

  return (
    // <Masonry>
    <Link to={`/image/${imageData?.id}`}
      style={{
        width: '100%',
        maxHeight: '100vh'
      }}>
      <div
        style={{
          width: '100%',
          height: 'auto',
          aspectRatio: `${imageData.width} / ${imageData.height}`,
          position: 'relative',
          overflow: 'hidden',
        }}>

        {size == 'regular' ? <ImageElement src={imageData?.urls?.regular} isLoaded={isLoaded} onLoad={onLoad} alt={imageData?.alt_description} blurhash={imageData?.blur_hash} css={"rounded-[0.25rem] w-full animation-fadein duration-200"} />
          : <ImageElement src={imageData?.urls?.small} isLoaded={isLoaded} onLoad={onLoad} alt={imageData?.alt_description} blurhash={imageData?.blur_hash} css={"rounded-[0.25rem] w-full animation-fadein duration-200"} />
        }
      </div>
    </Link>
    // </Masonry>
  )
}
