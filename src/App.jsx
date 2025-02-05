import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, CollectionPhotos, Collections, SearchFeed, ImageFeed, ErrorPage, SuccessAuth } from './pages';
import { Navigation, Footer } from './components';
import { useState } from 'react';
import { ResponseMessage } from './components';
import { useStore } from './zustandstore/store';


export default function App() {
  const [displayAuthMessage, setDisplayAuthMessage] = useState(false);
  const responseMessage = useStore(state => state.responseMessage);

  return (
    <>
      <BrowserRouter>
        <Navigation />
        {responseMessage.message != '' && <ResponseMessage message={responseMessage.message} type={responseMessage.type}/>}
        <Routes>
          <Route path='/' index element={<Home />} />
          <Route path='/search' element={<SearchFeed />} />
          <Route path='/image/:id' element={<ImageFeed  setDisplayAuthMessage={setDisplayAuthMessage} displayAuthMessage={displayAuthMessage} />} />
          <Route path='/image/*' element={<ImageFeed setDisplayAuthMessage={setDisplayAuthMessage} displayAuthMessage={displayAuthMessage} />} />
          <Route path='/collections' element={<Collections />} />
          <Route path='/collection/:id/:collectionname/:totalphotos' element={<CollectionPhotos />} />
          <Route path='/success' element={<SuccessAuth />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}
