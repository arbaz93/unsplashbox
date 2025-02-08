import React from 'react'

export default function Heading({ title, gradient}) {
  return (
    <h2 className={'text-5xl font-semibold text-ntrl-clr-300 capitalize' + (gradient && ' bg-special-gradient')}>{title}</h2>
  )
}
