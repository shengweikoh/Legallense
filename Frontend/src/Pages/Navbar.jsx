import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "./Animation/LegalLense.png"
import { useNavigate } from 'react-router-dom';
import { GavelIcon, HistoryIcon, UploadIcon, HomeIcon, Home } from "lucide-react";


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
                <button className = "login" onClick = {handleLoginClick}>Login</button>
                </div>
            </div>

        </nav>
    );
};


export default Navbar;