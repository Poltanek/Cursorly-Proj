import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './components/pages/HomePage'
import UploadPage from './components/pages/UploadPage'



function App() {

  return (
    <BrowserRouter>
      <div>
        {/* Route Configurations */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/UploadPage" element={<UploadPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
