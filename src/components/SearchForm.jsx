import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SearchForm({ text, actionType = 'search', setSearchCollectionsQuery }) {
    const [searchQuery, setSearchQuery] = useState(text || '')
    const navigate = useNavigate();
    let location = useLocation().pathname;

    function handleSubmit(e) {
        e.preventDefault();

        if(actionType === 'search' && searchQuery.length > 1) {
            navigate(`/search` , {state: {searchQuery}})
            if (location === '/search') window.location.reload();
        }
    }
    useEffect(() => {
        if (actionType === 'search current collections' && searchQuery.length > 1) {
            // set setCollection Query in AddToCollection component equal to the searchQuery whenever the state of searchQuery changes
            setSearchCollectionsQuery(searchQuery)
        }
    }, [searchQuery])
    return (
        <form onSubmit={handleSubmit} className='border-solid bg-white shadow border-ntrl-clr-100 border-[1px] flex rounded-xl w-full md:w-[45vw]'>
            <input type="text" name="search" id="search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className='flex-1 text-lg px-4 py-5 border-none' placeholder='Enter you keyword...'/>
            <button className='mr-4'><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="7" stroke="#E5E7EB" strokeWidth="2" />
                <path d="M20 20L17 17" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
            </svg>
            </button>
        </form>
    )
}

