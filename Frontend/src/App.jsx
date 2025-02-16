import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from "./Pages/Home"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Pages/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './Pages/Login.jsx';  
import UploadContract from "./Pages/Upload.jsx";
import Dashboard  from './Pages/Dashboard.jsx'; 
import AnalysisPage from './Pages/Analysis.jsx';  


function App() {
  const [count, setCount] = useState(0)

  return (

    <Router>
    <Navbar/>
    
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<UploadContract />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analysis" element={<AnalysisPage />} />


    </Routes>
    

</Router>

     
  )
};

export default App
