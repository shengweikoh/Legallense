import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './Navbar.jsx';
import './Login.css';
import { motion } from "framer-motion";

const Login = () => {

    return (

       
   
      <div className="login-page">

            <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 2, y: 0 }}
        transition={{ duration:0.5 }}>
       
        
        <NavBar />
        <div className="content-wrapper" data-aos="zoom-in">

          <div className="login-container">
            <h1>Login to Your Account</h1>
            <form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  Password{' '}
                  <span className="toggle-password">
                    Show
                  </span>
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="auth-links">
                <Link to="/register" className="register-link">
                  Register an Account
                </Link>
                <Link to="/forgot-password">Forgot your password?</Link>
              </div>
              <button type="submit">Login</button>
            </form>




          </div>
        </div>
        
      </motion.div>
      </div>


    );
  };
  
  export default Login;