import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import "./ProcessScrollBoard.css"; // Import styles
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import arrow icons

import Identifygif from "./Identify.gif";
import Contract from "./Contract.jpg";
import Upload from "./Upload.jpg";
import AI from "./ai.jpeg";
import insight from "./insight.png";

const steps = [
  { id: 1, title: "Find the document or work related contract.", description: "" },
  { id: 2, title: "Upload the document on our website.", description: "" },
  { id: 3, title: "AI simplifies the legal terms.", description: "" },
  { id: 4, title: "Read actionable insights provided by AI.", description: "" },
];

const ProcessScrollBoard = () => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Mouse move event for scrolling
  const handleMouseMove = (e) => {
    if (!wrapperRef.current) return;

    const { left, width } = wrapperRef.current.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const moveThreshold = width * 0.3; // Mouse zones

    if (mouseX < moveThreshold && currentStep > 0) {
      setCurrentStep((prev) => prev - 1); // Move left
    } else if (mouseX > width - moveThreshold && currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1); // Move right
    }
  };

  // Animate step change with GSAP
  useEffect(() => {
    gsap.to(containerRef.current, {
      x: -currentStep * 38 + "vw", // Moves 50vw per step (Matches current CSS)
      duration: 0.7,
      ease: "power2.out",
    });
  }, [currentStep]);

  return (
    <div
      className="process-wrapper"
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
    >
      <h2 className="process-title">OUR PROCESS</h2>

      <div className="process-container" ref={containerRef}>
                {steps.map((step) => (
            <motion.div
              key={step.id}
              className="card step-card text-white"
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: step.id * 0.2 }}
              style={{
                backgroundImage: `url(${
                  step.id === 1
                    ? Contract
                    : step.id === 2
                    ? Upload
                    : step.id === 3
                    ? AI
                    : step.id === 4
                    ? insight
                    :AI
                    
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                
              
              }}
            >
              <div className="card-overlay" />
              <div className="card-body position-relative text-center maincard">
                <div className="step-number display-4 fw-bold">{step.id}</div>
                <h2 className="card-title step-title text-center mx-auto my-3">
                {step.title}
              </h2>
    
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default ProcessScrollBoard;
