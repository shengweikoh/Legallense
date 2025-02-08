import "./Home.css";
import React from "react";
import { motion } from "framer-motion";
import TypingEffect from "./Animation/Typing";
import chatbotGif from "./Animation/Chatbot.gif"





const Home = () => {
    return (
        <div className="home-container-fluid">
            <div className="title">
                        <motion.div
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 2 }}
                            >
                                Legal Lense.
                            </motion.div>
                        

                        <TypingEffect/>
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