import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, increment } from "firebase/firestore";
import { FirestoreDB } from '../firebase/firebase_config';  // Firestore instance
import NavBar from './Navbar.jsx';
import './Signup.css';
import { Typography } from '@mui/material';


const Signup = () => {

    const navigate = useNavigate();
    const auth = getAuth();
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        // Listen for authentication state changes
        // Only user accounts created through signup
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setLoading(true);
            if (user) {
                try {
                    setLoading(true);
                    navigate('/home');
                } catch (e) {
                    setError('Error redirecting after sign up.');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        });
        // Clean up the listener on component unmount
        return () => unsubscribe();
    }, [auth, navigate]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        referral: ""
      });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword, referral } = formData;


        if (password != confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const userSignup = await createUserWithEmailAndPassword(auth, email, password);
            const user = userSignup.user;
            
            const userDocRef = doc(FirestoreDB, 'Users', user.uid);
            await setDoc(userDocRef, {
                userId: user.uid,
                name: name,
                email: user.email,
                referral: referral,
                freeUpgrade: 1,
            });
    
            console.log('User document created/updated in Firestore:', user.uid);    
            if(referral.trim() !== "") {
                const referralDocRef = doc(FirestoreDB, "Users", referral);
                const referralSnap = await getDoc(referralDocRef);
                if(referralSnap.exists()) {
                    // Increment freeUpgrade by 1 using Firestore's increment operator
                    await updateDoc(referralDocRef, {
                        freeUpgrade: increment(1)
                    });
    
                    await updateDoc(userDocRef, {
                        freeUpgrade: increment(1)
                    });
                    console.log("Referral updated successfully.");
                } else {
                    console.log("No referral found for ID:", referral);
                }
            }

            setLoading(false);
        } catch (error) {
            console.error('Error creating user:', error.message);
            setError(`Sign-up failed: ${error.message}`);
        } finally {
            setLoading(false);
        }

    }
    
    if (!loading && error) {
        <Typography> {error} </Typography>
    }


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
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label className="user-name">Name</label>
                                            <input
                                                name="name"
                                                className="form-control text-left userinput"
                                                type="text"
                                                placeholder="Enter your full name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    
                                        <div className="form-group">
                                            <label className="email">Email</label>
                                            <input
                                                name="email"
                                                className="form-control text-left userinput"
                                                type="email"
                                                placeholder="Enter your email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="password">Password</label>
                                            <input
                                                name="password"
                                                className="form-control text-left passwordinput"
                                                type="password"
                                                placeholder="Create a password"
                                                required
                                                value={formData.password}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="password">Confirm Password</label>
                                            <input
                                                name="confirmPassword"
                                                className="form-control text-left passwordinput"
                                                type="password"
                                                placeholder="Confirm your password"
                                                required
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                            />
                                        </div>


                                        <div className="form-group">
                                            <label className="referral">Referral code</label>
                                            <input
                                                name="referral"
                                                className="form-control text-left userinput"
                                                type="text"
                                                placeholder="Enter referral code if any"
                                                value={formData.referral}
                                                onChange={handleChange}
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


