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
            className="step-box"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: step.id * 0.2 }}
          >
            <div className="step-number">{step.id}</div>
            <img src={Identifygif} alt="Step Animation" className="step-gif" />
            <h2 className="step-title">{step.title}</h2>
            <p className="step-description">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProcessScrollBoard;
