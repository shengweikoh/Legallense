import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "./Animation/LegalLense.png"
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
      };


    return (
        <nav className="navbar fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Legal Lense.</Link>

               
                <div className = "button-container">
                <button className = "upload">Upload Document</button>
                <button className = "login" onClick = {handleLoginClick}>Login</button>
                </div>
            </div>

        </nav>
    );
};


export default Navbar;