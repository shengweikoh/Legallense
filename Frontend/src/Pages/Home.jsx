import "./Home.css";
import React, { useEffect, useRef , useState} from 'react';
import { motion } from "framer-motion";
import TypingEffect from "./Animation/Typing";
import chatbotGif from "./Animation/Chatbot.gif";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ProcessScrollBoard from "./Animation/ProcessScrollBoard";


gsap.registerPlugin(ScrollTrigger);


const Home = () => {
    const descriptionsRef = useRef([]);

    const [hasAnimated, setHasAnimated] = useState(false);

    const leftRef = useRef([]);
    const rightRef = useRef([]);


  
    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 350 && !hasAnimated) {

            
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
  
      
        {[ 
          { number: "01", title: "What we do", text: "We provide legal assistance through AI.We provide legal assistance through AI.We provide legal assistance through AI.We provide legal assistance through AI.We provide legal assistance through AI.We provide legal assistance through AI.We provide legal assistance through AI.We provide legal assistance through AI.We provide legal assistance through AI." },
          { number: "02", title: "How we provide", text: "Our AI simplifies complex legal terms." },
          { number: "03", title: "Why choose us?", text: "We make legal help accessible and affordable." },
          { number: "04", title: "Our Vision", text: "Bringing legal clarity to everyone." }
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
      
                className=" col-md-8 description"
                ref={(el) => leftRef.current.push(el)}
              >
                {section.text}
              </div>
            </div>
          </div>
        ))}

        
  
        {/* Cards Section */}
        <div className="row g-3 justify-content-center carddescription" style={{ paddingLeft: 125 }}>
          {[1, 2, 3,4].map((_, index) => (
            <div className="col-md-3" key={index}>
              <div className="card" style={{ width: "20rem", height: "300px" }}>
                <img
                  src={chatbotGif}
                  className="card-img-top"
                  alt="Chatbot GIF"
                  style={{ height: 300, width: 80, marginLeft: 90 }}
                />
                <div className="card-body">
                  <h5 className="card-title">Card Title</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make up the bulk of the
                    card's content.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };






export default Home;