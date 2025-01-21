import React from 'react'

export default function GrayButton({ icon, text }) {
  return (
    <button className='bg-ntrl-clr-100 text-ntrl-clr-300 font-semibold text-base flex gap-2 justify-center items-center px-6 py-4 rounded-[0.25rem]'><span>{icon}</span>{text}</button>
  )
}
