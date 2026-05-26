import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './components/pages/HomePage'
import UploadPage from './components/pages/UploadPage'
import LearnPage from './components/pages/LearnPage'
import AboutPage from './components/pages/AboutPage'



function App() {

  return (
    <BrowserRouter>
      <div>
        {/* Route Configurations */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/UploadPage" element={<UploadPage />} />
          <Route path="/LearnPage" element={<LearnPage />} />
          <Route path="/AboutPage" element={<AboutPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
