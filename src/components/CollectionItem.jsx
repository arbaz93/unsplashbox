/* eslint-disable react/prop-types */
import HeadingSmall from './HeadingSmall'
import Description from './Description'
import { Link } from 'react-router-dom'


export default function CollectionItem({ data }) {
  const minusIcon = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.6665 7.33331H3.33317C3.15636 7.33331 2.98679 7.40355 2.86177 7.52858C2.73674 7.6536 2.6665 7.82317 2.6665 7.99998C2.6665 8.17679 2.73674 8.34636 2.86177 8.47138C2.98679 8.59641 3.15636 8.66665 3.33317 8.66665H12.6665C12.8433 8.66665 13.0129 8.59641 13.1379 8.47138C13.2629 8.34636 13.3332 8.17679 13.3332 7.99998C13.3332 7.82317 13.2629 7.6536 13.1379 7.52858C13.0129 7.40355 12.8433 7.33331 12.6665 7.33331Z" fill="#121826"/>
  </svg>
  
  return (
    <div className='flex gap-4 items-center duration-200 hover:bg-ntrl-clr-100 p-4 rounded-[0.5rem]'>
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
        <button className='font-semibold flex gap-2 items-center text-sm duration-200 hover:opacity-60'><span>{minusIcon}</span>Remove</button>
      </div>
    </div>
  )
}
