import React from 'react'

export default function FullScreenImage({ src, alt, callback }) {
  // <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
  const minimizeIcon = <svg xmlns="http://www.w3.org/2000/svg" fill='black' width='16px' viewBox="0 0 512 512"><path d="M439 7c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8l-144 0c-13.3 0-24-10.7-24-24l0-144c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l39 39L439 7zM72 272l144 0c13.3 0 24 10.7 24 24l0 144c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39L73 505c-9.4 9.4-24.6 9.4-33.9 0L7 473c-9.4-9.4-9.4-24.6 0-33.9l87-87L55 313c-6.9-6.9-8.9-17.2-5.2-26.2s12.5-14.8 22.2-14.8z"/></svg>;
  return (
    <div className='absolute inset-0 bg-ntrl-clr-300 bg-opacity-50 z-50' onClick={callback}>
      <button className='absolute top-4 right-4 bg-ntrl-clr-100 p-2 rounded-lg' title='minimize'>{minimizeIcon}</button>
      <img src={src} alt={alt} className='w-full' />
    </div>
  )
}
