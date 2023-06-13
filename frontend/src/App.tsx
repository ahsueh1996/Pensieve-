import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import EventGallery from './routes/EventGallary'
import LargePhotoGallery from './routes/LargePhotoGallery'
import { useState } from 'react'
import Test from './playground/Test'
import SmallPhotoGallery from './routes/SmallPhotoGallery'

function App() {
  const [query, setQuery] = useState('')
  const [activeEventID, setActiveEventID] = useState(-1)

  return (
    <>
      <Test />
      <Header setQuery={setQuery} />
      <Routes>
        <Route path="/" element={<EventGallery setActiveEventID={setActiveEventID} />} />
        <Route path="/small-photo-gallery" element={<SmallPhotoGallery eventID={activeEventID} />} />
        <Route path="/large-photo-gallery" element={<LargePhotoGallery />} />
        <Route path="/query" element={<EventGallery query={query} setActiveEventID={setActiveEventID} />} />
      </Routes>
    </>
  )
}

export default App
