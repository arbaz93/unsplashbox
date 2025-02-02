import { useEffect, useState } from 'react'
import { SearchForm, Description, CollectionItem } from '.'
import searchCurrentCollections from '../js/fuzzySearch.js';
import { useCollectionsStore } from '../zustandstore/store.jsx';

export default function AddToCollection({ photoId }) {
    const collections = useCollectionsStore(state => state.collections);
    const setDisplayAddToCollections = useCollectionsStore(state => state.setDisplayAddToCollections);
    
    const [searchResult, setSearchResult] = useState(collections);
    const [searchCollectionsQuery, setSearchCollectionsQuery] = useState('');
    
    useEffect(() => {
      if(searchCollectionsQuery.length < 2 ) {
        setSearchResult(collections)
      } else {
        setSearchResult(searchCurrentCollections(collections, searchCollectionsQuery).map(result => result.item))
      }
    }, [searchCollectionsQuery])
    
  return (
    <div  className="flex items-center justify-center min-h-screen fixed bg-ntrl-clr-200 bg-opacity-40 inset-0" >
      <div className="absolute inset-0 bg-ntrl-clr-200 bg-opacity-40 inset-0" onClick={() => {setDisplayAddToCollections(false)}}></div>
       
        <div className={'flex flex-col gap-4 aspect-square absolute py-8 px-6 bg-white rounded-[0.5rem] shadow-lg'}>
            <h2 className='text-ntrl-clr-300 font-semibold text-2xl'>Add to Collections</h2>

            <SearchForm actionType={'search current collections'} setSearchCollectionsQuery={setSearchCollectionsQuery} />
            <Description text={`${searchResult.length} matches`} size='mid' />
            <div className='flex flex-col gap-4 max-h-[30rem] overflow-y-hidden'>
                {searchResult.map(collection => {
                    return <CollectionItem key={collection.id} data={collection} photoId={photoId} actionType={'add'} />
                })}
            </div>
        </div>
    </div>
  )
}
