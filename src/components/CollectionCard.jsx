import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/collectionsCard.css';
import { HeadingSmall, Description, ImageElement } from '.';

export default function CollectionCard({ collection }) {
  const [isLoaded, setIsLoaded] = useState({})
  let images = []
  for (let i = 0; i < collection.preview_photos.length; i++) {
    if (i === 3) break;
    images.push(collection.preview_photos[i]);
  }

  function handleImageLoad(id) {
    setIsLoaded({...isLoaded, [id]: true});
  }

  return (
    <Link to={`/collection/${collection.id}/${(collection?.title).replace('/', ' ') ?? "Collection"}/${collection?.total_photos}`} style={{ height: 'min-content', display: 'grid', gap: '1rem'}}>
      <div className='three-image-grid sm:w-80 md:w-[30rem] aspect-custom overflow-hidden rounded-lg'>
        {images.map((image, i) => <ImageElement index={i} src={image?.urls?.small} alt={image?.urls?.slug} css={`item-${i + 1} w-full object-cover h-full`} key={image?.id} isLoaded={isLoaded[image?.id ?? false]} onLoad={() => handleImageLoad(image?.id)} blurhash={image?.blur_hash}/>)}
      </div>
      <div className='flex flex-col'>
        <HeadingSmall text={collection?.title ?? "Collection"} />
        <Description text={`${collection?.total_photos ?? '##'} photos`} size={'mid'} opacity={' opacity-50 '} />

      </div>
    </Link>
  )
}
