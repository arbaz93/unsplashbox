import { Link, useLocation } from 'react-router-dom'

export default function Navigation() {
    let location = useLocation().pathname;
    return (
        <nav className='flex max-sm:flex-col  gap-5 px-6 py-4 border-b-[1px] border-b-ntrl-clr-100 border-solid'>
            <div className='logo flex-1 flex max-sm:justify-center'>
                <img src="/assets/Logo.svg" alt="unsplash logo" className='w-36'/>
            </div>
            <div className='nav-links flex gap-6 max-sm:justify-center'>
                <Link to="/" className={" text-sm px-6 py-2 rounded-[0.25rem] " + ((location === '/' || '/search') && ' bg-ntrl-clr-100 text-ntrl-clr-300 font-semibold')}>Home</Link>
                <Link to="/collections" className={" text-sm px-6 py-2 rounded-[0.25rem] " + (location == '/collections' && ' bg-ntrl-clr-100 text-ntrl-clr-300 font-semibold')}>Collections</Link>
            </div>
        </nav>
    )
}
