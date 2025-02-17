import "./Home.css";
import React, { useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import TypingEffect from "./Animation/Typing";
import chatbotGif from "./Animation/Chatbot.gif";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


gsap.registerPlugin(ScrollTrigger);


const Home = () => {
    
    const descriptionRef = useRef(null);
    useEffect(() => {
        // Select all elements with the class 'description'
        const descriptions = gsap.utils.toArray('.description');
        
        // Loop over each element and apply the animation
        descriptions.forEach((el) => {
          gsap.fromTo(
            el,
            {
              // Initial state: no padding/margin and fully transparent
              padding: "0px",
              margin: "0px",
              opacity: 30,
            },
            {
              // Final state: desired padding/margin and fully visible
              padding: "20px",  // adjust these values as needed
              margin: "20px",
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top bottom-=100", // when the top of the element reaches 90% of the viewport height
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }, []);


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
                        
                        <TypingEffect/>

    
            </div>



           <div className="description-container">

                <div className="row g-10">
                    <div className="col-md-1">
                    <div className="p-2 smoltitle">01/</div>
                    </div>
                    <div className="col-md-5">
                    <div className="bigtitle">What we do</div>
                    </div>
                    <div className="col-md-5">
                    <div ref={descriptionRef} className="p-3 description">
                            hi
                        </div>
                    </div>
                </div>
                </div>

                    <div className="description-container">
                    <div className="row g-10 c-20">
                        <div className="col-md-1">
                        <div className="p-2 smoltitle">02/</div>
                        </div>
                        <div className="col-md-5">
                        <div className="bigtitle">How we provide</div>
                        </div>
                        <div className="col-md-5">
                        <div ref={descriptionRef} className="p-3 description">
                            Description Description Description Description Description Description Description
                            Description Description Description Description Description Description Description
                            Description Description Description Description Description Description Description
                            Description Description Description Description Description Description Description
                            Description Description Description Description Description Description Description
                        </div>
                        </div>
                    </div>
                    </div>

                    <div className="description-container">
                    <div className="row g-10">
                        <div className="col-md-1">
                        <div className="p-2 smoltitle">03/</div>
                        </div>
                        <div className="col-md-5">
                        <div className="bigtitle">What we do</div>
                        </div>
                        <div className="col-md-5">
                        <div className="p-3 description">
                            Description Description Description Description Description Description Description
                            Description Description Description Description Description Description Description
                            Description Description Description Description Description Description Description
                            Description Description Description Description Description Description Description
                            Description Description Description Description Description Description Description
                        </div>
                        </div>
                    </div>
                    </div>

                        <div className="description-container">
                        <div className="row g-10">
                            <div className="col-md-1">
                            <div className="p-2 smoltitle">04/</div>
                            </div>
                            <div className="col-md-5">
                            <div className="bigtitle">What we do</div>
                            </div>
                            <div className="col-md-5">
                            <div className="p-3 description">
                                Description Description Description Description Description Description Description
                                Description Description Description Description Description Description Description
                                Description Description Description Description Description Description Description
                                Description Description Description Description Description Description Description
                                Description Description Description Description Description Description Description
                            </div>
                            </div>
                        </div>
                        </div>


         



            

            <div className="row g-3 justify-content-center" style = {{paddingLeft:125}} >
                    <div className="col-md-3" >
                    <div className="card " style={{ width: "20rem", height: "300px" }}>
                        <img src={chatbotGif} className="card-img-top" alt="Local GIF" style = {{height:300 ,width:80 ,marginLeft:90}} />
                        <div className="card-body">
                        <h5 className="card-title">Card Title</h5>
                        <p className="card-text">
                            Some quick example text to build on the card title and make up the bulk of the card's content.
                        </p>
                        </div>
                    </div>
                    </div>

                
                    <div className="col-md-3">
                    <div className="card" style={{ width: "20rem", height: "300px" }}>
                    <img src={chatbotGif} className="card-img-top" alt="Local GIF" style = {{height:300 ,width:80 ,marginLeft:90}} />
                        <div className="card-body">
                        <h5 className="card-title">Card Title</h5>
                        <p className="card-text">
                            Some quick example text to build on the card title and make up the bulk of the card's content.
                        </p>
                        </div>
                    </div>
                    </div>
        
                    <div className="col-md-3">
                    <div className="card" style={{ width: "20rem", height: "300px" }}>
                    <img src={chatbotGif} className="card-img-top" alt="Local GIF" style = {{height:300 ,width:80 ,marginLeft:90}} />
                        <div className="card-body">
                        <h5 className="card-title">Card Title</h5>
                        <p className="card-text">
                            Some quick example text to build on the card title and make up the bulk of the card's content.
                        </p>
                        </div>
                    </div>
                    </div>

                


  </div>      
        </div>
    );
};






export default Home;