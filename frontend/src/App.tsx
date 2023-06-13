import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import EventGallery from './routes/EventGallary'
import LargePhotoGallery from './routes/LargePhotoGallery'
import { useState } from 'react'
import Test from './playground/Test'

function App() {
  const [query, setQuery] = useState('')

  return (
    <>
      <Test />
      <Header setQuery={setQuery} />
      <Routes>
        <Route path="/" element={<EventGallery />} />
        <Route path="/large-photo-gallery" element={<LargePhotoGallery />} />
        <Route path="/query" element={<EventGallery query={query} />} />
      </Routes>
    </>
  )
}

export default App
