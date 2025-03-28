import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { FirestoreDB } from '../firebase/firebase_config';  // Firestore instance
import FBInstanceAuth from "../firebase/firebase_auth";  // Firebase auth helper
import NavBar from './Navbar.jsx';
import GoogleCustomButton from "./GoogleButton.jsx";
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    setLoading(true);
                    console.log("User logged in:", user.email);
                    const role = await getUserRole(user.email);

                    if (role === 'Users') {
                        navigate('/home');  // Redirect user
                    } else {
                        setError('User role not found.');
                    }
                } catch (error) {
                    setError('Error retrieving user role.');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [auth, navigate]);

    // Retrieve user role from Firestore
    const getUserRole = async (email) => {
        try {
            const userQuery = query(collection(FirestoreDB, 'Users'), where('email', '==', email));
            const userSnapshot = await getDocs(userQuery);

            if (!userSnapshot.empty) {
              console.log("User role: Users");
              return 'Users';
            }
            return null;
        } catch (error) {
            console.error('Error checking user role:', error);
            return null;
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Login error:", error.message);
            setError("Invalid email or password.");
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const userCredential = await FBInstanceAuth.googleLogin(auth);
            const user = userCredential.user;

            if (user) {
                console.log("Google login successful");
            } 
        } catch (error) {
            console.error("Google login error:", error.message);
            setError("Google login failed.");
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}>
                <NavBar />

                <div className="content-wrapper">
                    <div className="container">
                        <div className="col-12">
                            <h1 className="LegaLens">LegaLens</h1>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="login-container">
                                    <form onSubmit={handleLogin}>
                                        <div className="form-group">
                                            <label className="user-name">Email</label>
                                            <input
                                                className="form-control text-left userinput"
                                                type="email"
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="password">Password</label>
                                            <input
                                                className="form-control text-left passwordinput"
                                                type="password"
                                                placeholder="Enter your password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="auth-links">
                                            <Link to="/signup" className="register-link">Register an Account</Link>
                                            <Link to="/forgot-password">Forgot your password?</Link>
                                        </div>
                                        <button type="submit">Login</button>
                                        <small className="text2">Or</small>

                                        <GoogleCustomButton onClick={handleGoogleLogin} />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="popup">
                        <div className="popup-content">
                            <h2>Authentication Error</h2>
                            <p>{error}</p>
                            <button onClick={() => setError(null)}>Close</button>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Login;
