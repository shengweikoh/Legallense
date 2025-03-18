import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import "./ProcessScrollBoard.css"; // Import styles
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import arrow icons

import Identifygif from "./Identify.gif";

const steps = [
  { id: 1, title: "Step 1", description: "Identify the legal problem" },
  { id: 2, title: "Step 2", description: "Process the document using AI" },
  { id: 3, title: "Step 3", description: "Simplify the legal terms" },
  { id: 4, title: "Step 4", description: "Provide actionable insights" },
];

const ProcessScrollBoard = () => {
  const containerRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0); // Track current step


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep === steps.length - 1 ? 0 : prevStep + 1));
    },4000); // Auto-scroll every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);


  useEffect(() => {
    gsap.to(containerRef.current, {
      x: -currentStep * 40 + "vw", // Move by viewport width
      duration: 1.0,
      ease: "power2.out",
    });
  }, [currentStep]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="process-wrapper">


      OUR PROCESS 
     

     <button className="arrow left-arrow" onClick={prevStep}>
        <FaArrowLeft />
      </button>
      <div className="process-container" ref={containerRef}>
    
        {steps.map((step) => (

          <motion.div
            key={step.id}
            className="step-box"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: step * 0.2 }}
          >
            <div className="step-number">{step.id}</div>
            <img 
            src= {Identifygif}
            alt="Step Animation" 
            className="step-gif"
          />
            
            <h2 className="step-title">{step.title}</h2>
            <p className="step-description">{step.description}</p>
          </motion.div>

        ))}

        
    
      </div>

      <button className="arrow right-arrow" onClick={nextStep}>
        <FaArrowRight />
      </button>

      
    </div>
  );
};

export default ProcessScrollBoard;