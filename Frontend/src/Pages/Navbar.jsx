import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "./Animation/LegalLense.png"
import { useNavigate } from 'react-router-dom';
import { GavelIcon, HistoryIcon, UploadIcon, HomeIcon, Home } from "lucide-react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const Navbar = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
      };


    return (
        <nav className="navbar fixed-top">
            <div className="container-fluid">
        
            <Link className="navbar-brand" to="/">
                <HomeIcon style={{ marginRight: "10px" }} /> Legal Lense.
                </Link>

               
                <div className = "button-container">
                <Link to="/Dashboard">
                    <button className="upload">Find out more</button>
                </Link>

                <Link to = "/Login">
                <button className = "login">Login</button>
                </Link>

                
                </div>
            </div>

        </nav>
    );
};


export default Navbar;