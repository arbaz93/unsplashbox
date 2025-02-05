import React from 'react'

export default function Description({ text, size, opacity }) {
  return (
    <p className={'font-light  ' + (size === 'mid' ? ' text-sm ' : size === 'lg' ? ' text-lg ' : + ' text-xs ') + opacity}>{text}</p>
  )
}
