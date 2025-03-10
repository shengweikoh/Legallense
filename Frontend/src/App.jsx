// General Imports
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/routeProtection/ProtectedRoute.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

// Public Access Screens
import Navbar from "./Pages/Navbar.jsx";
import Login from './Pages/Login.jsx';  
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from "./Pages/Home"; 

// User Access Screens
import UploadContract from "./Pages/Upload.jsx";
import Dashboard  from './Pages/Dashboard.jsx'; 
import AnalysisPage from './Pages/Analysis.jsx'; 
import History from './Pages/History.jsx';
import ContractCompare from './Pages/CompareContracts.jsx';
import ContractComparison from './Pages/ContractComparison.jsx';
import Signup from './Pages/Signup.jsx';


function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<UploadContract />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/history" element={<History />} />
        <Route path="/compare" element={<ContractCompare />} />
        <Route path="/contractcompare" element={<ContractComparison />} />
        <Route path = "signup" element= {<Signup/>}/>

        {/* Protected Routes for Authenticated Users */}
        <Route element={<ProtectedRoute />}>
        {/* Place protected routes here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
