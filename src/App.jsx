import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Collection, Collections, SearchFeed, ImageFeed, ErrorPage, SuccessAuth } from './pages';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

export default function App() {
  return (
    <> 
      <BrowserRouter>
      <Navigation />
        <Routes>
          <Route path='/' index element={<Home />} />
          <Route path='/search' element={<SearchFeed />}/>
          <Route path='/image/:id' element={<ImageFeed />} />
          <Route path='/image/*' element={<ImageFeed />} />
          <Route path='/collections' element={<Collections />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/success' element={<SuccessAuth />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      <Footer />
      </BrowserRouter>
    </>
  )
}
