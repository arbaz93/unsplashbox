import React from 'react'

export default function Heading({ title, color}) {
  return (
    <h2 className={'text-5xl font-semibold text-ntrl-clr-300 ' + (color && ' bg-special-gradient')}>{title}</h2>
  )
}
