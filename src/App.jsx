import { useState } from 'react'
import './App.css'
import SignUp from "./pages/SignUp"
import Login from"./pages/Login"
import { Routes, Route } from 'react-router-dom';
import Error from "./pages/Error"
import Home from './pages/Home';


function App() {


  return (
    <>
      <Routes>
      
        <Route path="/" element={<SignUp/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/error" element={<Error />}/>
        <Route path="/home" element={<Home />}/>
       
        
      </Routes>
     
    </>
  )
}

export default App
