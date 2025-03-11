import React from "react";
import { motion } from "framer-motion";
import  "./Typing.css";

const TypingEffect = () => {
  const sentence = "The AI Powered Contract Reviewer You Need.";
  
  // Split the sentence into an array of letters
  const letters = sentence.split("");

  return (
    <div className="typing-container">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: index * 0.05, // Delay for each letter   // Repeat forever // Loop animation
            duration: 1,        // Animation duration for each letter
          }}
        >
          {letter === " " ? "\u00A0" : letter} {/* Preserve spaces */}
        </motion.span>
      ))}
    </div>
  );
};

export default TypingEffect;