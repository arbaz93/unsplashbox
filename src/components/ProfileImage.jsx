import React from 'react'

export default function ProfileImage({ link, imageLink, alt}) {
  return (
    <a href={link}><img className='rounded-[50%] w-12 h-12' src={imageLink} alt={alt + ' profile image'} /></a>
  )
}
