import { ImageElement, useState } from '.'
export default function ProfileImage({ link, imageLink, alt}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <a href={link}><ImageElement src={imageLink} onLoad={() => {setIsLoaded(true)}} isLoaded={isLoaded} alt={alt + ' profile image'} css={'rounded-[50%] w-12 h-12'} /></a>
  )
}
