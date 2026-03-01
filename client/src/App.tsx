//import { useState } from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
      </Routes>

      <Routes>
        <Route path="/coffee-form" element={<h1>Coffee Form</h1>} />
      </Routes>

      <Routes>
        <Route path="/my-stores" element={<h1>My Stores</h1>} />
      </Routes>

      <Routes>
        <Route path="/my-beans" element={<h1>My Beans</h1>} />
      </Routes>

      <Routes>
        <Route path="/my=coffees" element={<h1>My Coffees</h1>} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
