import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Home";
import CoffeeForm from "./CoffeeForm";
import CoffeeDetails from "./CoffeeDetails";
//import MyStores from "./MyStores";
import MyBeans from "./MyBeans";
import MyCoffees from "./MyCoffees"
import './App.css'

function App() {
  return (
    <BrowserRouter>
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/coffee-form" element={<CoffeeForm/>} />
        <Route path="/my-stores" element={<h1>My Stores</h1>} />
        <Route path="/my-beans" element={<MyBeans/>} />
        <Route path="/my-coffees" element={<MyCoffees/>} />
        <Route path="/my-coffees/:id" element={<CoffeeDetails/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
