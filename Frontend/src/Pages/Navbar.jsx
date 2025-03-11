import { Link , useLocation } from "react-router-dom";
import "./Navbar.css";
import Logo from "./Animation/LegalLense.png"
import { useNavigate } from 'react-router-dom';
import {  AppWindow,HandCoins, Handshake,GavelIcon, HistoryIcon, UploadIcon, HomeIcon, Home ,CircleUserRound} from "lucide-react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import FBInstanceAuth from "../firebase/firebase_auth"; 
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import { useEffect, useState } from "react";



const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const[user,setUser] = useState(null);
    const auth = getAuth();


    const handleLoginClick = () => {
        navigate('/login');
      }

      const isHome = location.pathname === "/" || location.pathname === "/login";

      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, [auth]);


    const handleLogout = async () => {
        try {
            await FBInstanceAuth.logout(auth);  
            setUser(null);
            navigate("/login");  
        } catch (error) {
            console.error("Logout error:", error.message);
        }
    };
    

    return (
        <nav className="navbar fixed-top">
            <div className="container-fluid">
        
            <Link className="navbar-brand" to="/">
                <HomeIcon style={{ marginRight: "10px" }} /> LegaLens
                </Link>

               {isHome ? ( 
                <div className="button-container">
                        <Link to="/home">
                            <button className="upload">
                                <AppWindow/> Dashboard</button>
                        </Link>

                        {user ? (
                            <button className="logout" onClick={handleLogout}>
                                <CircleUserRound /> Logout
                            </button>
                        ) : (
                            /* ✅ If no user, show Login button */
                            <Link to="/login">
                                <button className="login">
                                    <CircleUserRound /> Login
                                </button>
                            </Link>
                        )}
                    </div>

               )
               :(
                    <div className="info-container">
                   <span className="info-text"><Handshake className = "handshake"></Handshake>Refer a Friend</span>
                    <span className="info-text"><HandCoins className = "handcoin"></HandCoins>Free Use: 8</span>
                    </div>
               )}



          


            </div>

        </nav>
    );
};


export default Navbar;