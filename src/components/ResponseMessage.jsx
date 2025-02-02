import React from 'react'

export default function ResponseMessage({message, type}) {
  return (
    <div className='custom-fade-out flex justify-center fixed top-4 w-screen'>
        <div className={' bg-white shadow-md rounded-[0.25rem] p-4 text-green-500 ' + (type === 'error' && ' text-rose-500')}>
            <p className='text-sm'>{message}</p>
        </div>
    </div>
  )
}
