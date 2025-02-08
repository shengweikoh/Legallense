import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from "./Pages/Home"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Pages/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './Pages/Login.jsx';    


function App() {
  const [count, setCount] = useState(0)

  return (

    <Router>
    <Navbar/>
    
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />


    </Routes>
    

</Router>

     
  )
};

export default App
