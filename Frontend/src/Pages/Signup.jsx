import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { FirestoreDB } from '../firebase/firebase_config';  // Firestore instance
import FBInstanceAuth from "../firebase/firebase_auth";  // Firebase auth helper
import NavBar from './Navbar.jsx';
import GoogleCustomButton from "./GoogleButton.jsx";
import './Signup.css';


const Signup = () => {
    return (
        <div className="signup-page">
             <NavBar />
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}>
                
                <div className="content-wrapper-signup">
                    <div className="container">
                        <div className="col-12">
                            <h1 className="LegaLens2">LegaLens.</h1>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="signup-container">
                                    <form>
                                        <div className="form-group">
                                            <label className="user-name">Full Name</label>
                                            <input
                                                className="form-control text-left userinput"
                                                type="text"
                                                placeholder="Enter your full name"
                                                required
                                            />
                                        </div>
                                    
                                        <div className="form-group">
                                            <label className="email">Email</label>
                                            <input
                                                className="form-control text-left userinput"
                                                type="email"
                                                placeholder="Enter your email"
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="password">Password</label>
                                            <input
                                                className="form-control text-left passwordinput"
                                                type="password"
                                                placeholder="Create a password"
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="password">Confirm Password</label>
                                            <input
                                                className="form-control text-left passwordinput"
                                                type="password"
                                                placeholder="Confirm your password"
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="text">Referral key</label>
                                            <input
                                                className="form-control text-left passwordinput"
                                                type="text"
                                                placeholder="Referral code"
                                                required
                                            />
                                        </div>

                                        <div className="auth-links">
                                            <Link to="/login" className="login-link">Already have an account? Log in</Link>
                                        </div>
                                        
                                        <button type="submit">Sign Up</button>

                                    
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </motion.div>
        </div>
    );
};

export default Signup;


