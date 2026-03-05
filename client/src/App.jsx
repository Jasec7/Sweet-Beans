import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Home";
import CoffeeForm from "./CoffeeForm";
import CoffeeDetails from "./CoffeeDetails";
import MyStores from "./MyStores";
import MyBeans from "./MyBeans";
import MyCoffees from "./MyCoffees";
import NavBar from './NavBar';
import './App.css'

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/coffee-form" element={<CoffeeForm/>} />
        <Route path="/my-stores" element={<MyStores/>} />
        <Route path="/my-beans" element={<MyBeans/>} />
        <Route path="/my-coffees" element={<MyCoffees/>} />
        <Route path="/my-coffees/:id" element={<CoffeeDetails/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
