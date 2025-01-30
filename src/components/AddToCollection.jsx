import { useEffect, useState } from 'react'
import { SearchForm, Description, CollectionItem } from '.'
import searchCurrentCollections from '../js/fuzzySearch.js';

export default function AddToCollection({ collections, setDisplayAddToCollections }) {
    const [searchResult, setSearchResult] = useState([]);
    const [searchCollectionsQuery, setSearchCollectionsQuery] = useState('');
    
    useEffect(() => {
      searchCurrentCollections(collections, searchCollectionsQuery) 
      console.log(searchCollectionsQuery)
    }, [searchCollectionsQuery])
    
  return (
    <div  className="flex items-center justify-center min-h-screen fixed bg-ntrl-clr-200 bg-opacity-40 inset-0" onClick={() => {setDisplayAddToCollections(false)}}>
        <div className={'flex flex-col gap-4 aspect-square absolute p-8  bg-white rounded-[0.5rem] shadow-lg'}>
            <h2 className='text-ntrl-clr-300 font-semibold text-2xl'>Add to Collections</h2>

            <SearchForm actionType={'search current collections'} setSearchCollectionsQuery={setSearchCollectionsQuery} />
            <Description text={`${searchResult.length} matches`} size='mid' />
            <div className='flex flex-col gap-4 max-h-[30rem] overflow-y-hidden'>
                {collections.map(collection => {

                    return <CollectionItem key={collection.id} data={collection} actionType={'add'} />
                })}
            </div>
        </div>
    </div>
  )
}
