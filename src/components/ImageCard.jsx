import { Link } from 'react-router-dom';
import { Blurhash } from 'react-blurhash';
import { useEffect } from 'react';

export default function ImageCard({ imageData, isLoaded, onLoad }) {

  useEffect(() => {
    if(!isLoaded) {
      const img = new Image();
      img.src = imageData?.urls?.small;
      img.onload = onLoad;
    }
  }, [imageData, isLoaded, onLoad])
  return (
    // <Masonry>
    <Link to={`/image/${imageData?.id}`}
      style={{
        width: '100%',
      }}>
        <div
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: `${imageData.width} / ${imageData.height}`,
                position: 'relative',
                overflow: 'hidden',
              }}>

      {!isLoaded
        ?
        <Blurhash
          hash={imageData.blur_hash}
          width='100%'
          height='100%'
          resolutionX={32}
          resolutionY={32}
          punch={1}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        : <img src={imageData?.urls?.small} alt={imageData?.alt_description} className="rounded-[0.25rem] animation-fadein duration-200"></img>
      }
        </div>
        </Link>
    // </Masonry>
  )
}
