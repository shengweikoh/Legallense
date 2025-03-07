import { Link , useLocation } from "react-router-dom";
import "./Navbar.css";
import Logo from "./Animation/LegalLense.png"
import { useNavigate } from 'react-router-dom';
import {  HandCoins, Handshake,GavelIcon, HistoryIcon, UploadIcon, HomeIcon, Home ,CircleUserRound} from "lucide-react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';





const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();




    const handleLoginClick = () => {
        navigate('/login');
      };


      const isHome = location.pathname.startsWith("/home");

    return (
        <nav className="navbar fixed-top">
            <div className="container-fluid">
        
            <Link className="navbar-brand" to="/">
                <HomeIcon style={{ marginRight: "10px" }} /> Legal Lense.
                </Link>

               {!isHome && ( 

                        <div className = "button-container">
                        <Link to="/home">
                            <button className="upload">Find out more</button>
                        </Link>

                        <Link to = "/login">
                        < button className = "login">
                        <CircleUserRound> </CircleUserRound> Login</button>
                        </Link>
               
                </div>
               )} 

               {isHome && (
                    <div className="info-container">
                   <span className="info-text"><Handshake className = "handshake"></Handshake>Refer a Friend</span>
                    <span className="info-text"><HandCoins className = "handcoin"></HandCoins>Free Use: 8</span>
                    </div>
               )
               }



          


            </div>

        </nav>
    );
};


export default Navbar;