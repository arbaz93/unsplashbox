/* eslint-disable react/prop-types */
import HeadingSmall from './HeadingSmall'
import Description from './Description'
import { Link } from 'react-router-dom'
import { removefromCollection, addToCollection } from '../js/handleCollectionsAPI'

export default function CollectionItem({ data, actionType }) {
  function removeFromCollection() {
    // remove collection from user's collections
  }
  const minusIcon = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.6665 7.33331H3.33317C3.15636 7.33331 2.98679 7.40355 2.86177 7.52858C2.73674 7.6536 2.6665 7.82317 2.6665 7.99998C2.6665 8.17679 2.73674 8.34636 2.86177 8.47138C2.98679 8.59641 3.15636 8.66665 3.33317 8.66665H12.6665C12.8433 8.66665 13.0129 8.59641 13.1379 8.47138C13.2629 8.34636 13.3332 8.17679 13.3332 7.99998C13.3332 7.82317 13.2629 7.6536 13.1379 7.52858C13.0129 7.40355 12.8433 7.33331 12.6665 7.33331Z" fill="#121826"/>
  </svg>
  const plusIcon = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.6665 7.33335H8.6665V3.33335C8.6665 3.15654 8.59627 2.98697 8.47124 2.86195C8.34622 2.73693 8.17665 2.66669 7.99984 2.66669C7.82303 2.66669 7.65346 2.73693 7.52843 2.86195C7.40341 2.98697 7.33317 3.15654 7.33317 3.33335V7.33335H3.33317C3.15636 7.33335 2.98679 7.40359 2.86177 7.52862C2.73674 7.65364 2.6665 7.82321 2.6665 8.00002C2.6665 8.17683 2.73674 8.3464 2.86177 8.47142C2.98679 8.59645 3.15636 8.66669 3.33317 8.66669H7.33317V12.6667C7.33317 12.8435 7.40341 13.0131 7.52843 13.1381C7.65346 13.2631 7.82303 13.3334 7.99984 13.3334C8.17665 13.3334 8.34622 13.2631 8.47124 13.1381C8.59627 13.0131 8.6665 12.8435 8.6665 12.6667V8.66669H12.6665C12.8433 8.66669 13.0129 8.59645 13.1379 8.47142C13.2629 8.3464 13.3332 8.17683 13.3332 8.00002C13.3332 7.82321 13.2629 7.65364 13.1379 7.52862C13.0129 7.40359 12.8433 7.33335 12.6665 7.33335Z" fill="#121826"/>
  </svg>
  console.log(actionType)
  function handleClick() {
    if (actionType === 'remove') {
      removeFromCollection()
    }
    if (actionType === 'add') {
      addToCollection()
    }
  }
  return (
    <div className='flex gap-4 items-center duration-200 hover:bg-ntrl-clr-100 rounded-[0.5rem]'>
      <div className='w-20 aspect-square rounded-[0.25rem]'>
        <img className='rounded-[0.25rem] object-cover w-full h-full ' src={data?.cover_photo?.urls?.thumb} alt={data?.cover_photo?.alt_description} />
      </div>
      <div className='flex flex-col gap-2 justify-center flex-1'>
        <Link to={''}>
          <HeadingSmall text={data?.title ?? 'some collection'} />
        </Link>
        <Description text={`${data?.total_photos ?? 'n'} photos`} size='mid' />
      </div>
      <div>
        {actionType === 'remove' ? <button className='font-semibold flex gap-2 items-center text-sm duration-200 hover:opacity-60 capitalize' onClick={handleClick}><span>{minusIcon}</span>Remove</button>
        : <button className='font-semibold flex gap-2 items-center text-sm duration-200 hover:opacity-60 capitalize' onClick={handleClick}><span>{plusIcon}</span>Add</button>  
      }
      </div>
    </div>
  )
}
