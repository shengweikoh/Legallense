import "./Home.css";
import { useEffect, useRef , useState} from 'react';
import { motion } from "framer-motion";
import TypingEffect from "./Animation/Typing";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ProcessScrollBoard from "./Animation/ProcessScrollBoard";
import Pricing from "./Pricing.jsx";
import DescriptionSections from "./DescriptionSection.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";


gsap.registerPlugin(ScrollTrigger);


const Home = () => {
    // const descriptionsRef = useRef([]);

    const [hasAnimated, setHasAnimated] = useState(false);

    const leftRef = useRef([]);
    const rightRef = useRef([]);
    const navigate = useNavigate();

    const { user } = useAuth();



  
    useEffect(() => {

        if (user) {
          navigate("/home");
        }
        
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
      }, [user, navigate, hasAnimated]);
      // Select all elements with the class 'description'
    
  
    return (
      <div className="home-container-fluid">
        <div className="title">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
          >
            LegaLens
          </motion.div>
          <TypingEffect />
        </div>


        <ProcessScrollBoard/>

        <div className="mission">
            Our mission
        </div>

        <DescriptionSections></DescriptionSections>

         {/* <div className="price">
                Pricing
            </div> */}

            {/* <Pricing></Pricing> */}
      
      </div>
    );
  };






export default Home;