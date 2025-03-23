import "./Home.css";
import React, { useEffect, useRef , useState} from 'react';
import { motion } from "framer-motion";
import TypingEffect from "./Animation/Typing";
import chatbotGif from "./Animation/Chatbot.gif";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ProcessScrollBoard from "./Animation/ProcessScrollBoard";
import Pricing from "./Pricing.jsx";


gsap.registerPlugin(ScrollTrigger);


const Home = () => {
    const descriptionsRef = useRef([]);

    const [hasAnimated, setHasAnimated] = useState(false);

    const leftRef = useRef([]);
    const rightRef = useRef([]);


  
    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 1200 && !hasAnimated) {

            
            leftRef.current.forEach((el) => {
                gsap.fromTo(
                  el,
                  { opacity: 0.25, x: 50 }, // Start off-screen (right)
                  { opacity: 1, x: 0, duration: 2.0, ease: "power2.out" }
                );
              });
      
              // Animate elements in rightRef (move from left to center)
              rightRef.current.forEach((el) => {
                gsap.fromTo(
                  el,
                  { opacity: 0.25, x: -50 }, // Start off-screen (left)
                  { opacity: 1, x: 0, duration: 2.0, ease: "power2.out" }
                );
              });
    
            setHasAnimated(true); // Mark animation as complete
            window.removeEventListener("scroll", handleScroll); // Remove event listener
          }
        };
    
        if (!hasAnimated) {
          window.addEventListener("scroll", handleScroll);
        }
    
        return () => window.removeEventListener("scroll", handleScroll);
      }, [hasAnimated]);
      // Select all elements with the class 'description'
    
  
    return (
      <div className="home-container-fluid">
        <div className="title">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
          >
            Legal Lens.
          </motion.div>
          <TypingEffect />
        </div>


        <ProcessScrollBoard/>

        <div className="mission">
         
            Our mission
          
        </div>


  
      
        {[ 
          { number: "01", title: "What we do", text: "LegaLens helps part-time job seekers in reviewing their contractual agreements during their employment processes. We solve the problem of the lack of knowledge in terms of legal jargon by providing an easy-to-use platform that simplifies contracts. LegaLens empowers job seekers to understand their rights and obligations and make informed decisions to protect themselves from unfair terms and legal pitfalls. " },
          {
            number: "02",
            title: "How we provide",
            text: [
              "Summarise contracts in simple terms",
              "Review contracts to highlight critical clauses that have missing information based on the Ministry of Manpower contract template",
              "Suggest better clauses to fix the issues with highlighted clauses, and provide explanations about the suggestions",
              "Compare two contracts to show pros and cons of each contract, helping users to decide which contract is more beneficial overall",
            ],
          },
          
          { number: "03", title: "Why choose us?", text: "Our AI model is trained using the standard contract template provided by the Ministry of Manpower and user feedback. This ensures the accuracy and relevance of responses, to give you a peace of mind. Furthermore, we have a team of legal experts doing routine checks on responses to verify the responses generated for the four different functions." },
          { number: "04", title: "Our Vision", text: "Empowering job-seekers, protecting individual rights" }
        ].map((section, index) => (
          <div className="description-container"key={index}>
            <div className="row align-items-center g-4">
              <div className="col-md-1 text-end">
                <div className="p-2 smoltitle" ref={(el) => rightRef.current.push(el)} >{section.number}/</div>
              </div>
              <div className="col-md-3">
                <div className="bigtitle" ref={(el) => rightRef.current.push(el)}>{section.title}</div>
              </div>
              <div
  className="col-md-8 description"
  ref={(el) => leftRef.current.push(el)}
>
  {section.number === "02" && Array.isArray(section.text) ? (
    <ol className="list-decimal list-inside text-sm text-gray-700 space y-2">
      {section.text.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ol>
  ) : (
    <p>{section.text}</p>
  )}
</div>

      

            </div>


          </div>
        ))}

        
  
         <div className="price">
                Pricing
            </div>

            <Pricing></Pricing>
      
      </div>
    );
  };






export default Home;