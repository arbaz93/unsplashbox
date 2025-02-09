import { useState } from 'react';
import { ImageElement } from '.'
export default function ProfileImage({ link, imageLink, blurhash, alt}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <a href={link} className='w-12 h-12 overflow-hidden rounded-[50%]'><ImageElement src={imageLink} onLoad={() => {setIsLoaded(true)}} isLoaded={isLoaded} blurhash={blurhash ?? 'L34UvhWB0KofoLa|a|jt00of~WWB'} alt={alt + ' profile image'} css={'w-full h-full'} /></a>
  )
}
