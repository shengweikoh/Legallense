import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './Navbar.jsx';
import './Login.css';
import { motion } from "framer-motion";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Login = () => {

    return (

      
      <div className="login-page">
            <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 2, y: 0 }}
        transition={{ duration:0.5 }}>
  
        <NavBar />

        <div className="content-wrapper" data-aos="zoom-in">
  <div className="container">
    {/* Header Row */}
      <div className="col-12">
        <h1 className="LegaLens">LegaLens.</h1>
      </div>
  

    <div className="row">
      <div className="col-12">
        <div className="login-container">
          <form>
            <div className="form-group">
              <label className="user-name">Username</label>
              <input
                className="form-control text-left userinput"
                type="text"
                id="userinput"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="form-group">
              <label className="password">
                Password{' '}
                <span className="toggle-password">
                  Show
                </span>
              </label>
              <input
                className="form-control text-left passwordinput"
                type="password"
                id="passwordinput"
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
            <div>Or</div>


              
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
  
  export default Login;