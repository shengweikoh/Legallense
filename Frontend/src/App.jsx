// General Imports
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/routeProtection/ProtectedRoute.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

// Public Access Screens
import Navbar from "./Pages/Navbar.jsx";
import Login from './Pages/Login.jsx';  
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
import { AuthProvider } from './contexts/AuthContext.jsx';


function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <AuthProvider>
        <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path = "/signup" element= {<Signup/>}/>
            <Route path="/login" element={<Login />} />

            <Route element = {<ProtectedRoute />}>
                <Route path="/upload" element={<UploadContract />} />
                <Route path="/home" element={<Dashboard />} />
                <Route path="/analysis/:contractId" element={<AnalysisPage />} />
                <Route path="/history" element={<History />} />
                <Route path="/compare" element={<ContractCompare />} />
                <Route path="/contractcompare/:contractId1/:contractId2" element={<ContractComparison />} />
              </Route>

            {/* Protected Routes for Authenticated Users */}
 
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
