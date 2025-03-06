import React , {useState} from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./CompareContracts.css";

import { motion } from "framer-motion";


export default function ContractCompare() {
  const contracts = [
    { id: 1, name: "Human Resources Executive (H group) 👑", date: "11-05-2025" },
    { id: 2, name: "Employment Engagement Intern 👑", date: "12-09-2024" },
    { id: 3, name: "Talent Acquisition Intern", date: "09-09-2024" },
    { id: 4, name: "Strategy & Experience Intern 👑", date: "04-09-2024" }
  ];

  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);

  const handleSelect = (id, side) => {
    if (side === "left") {
      setSelectedLeft(id);
      if (selectedRight === id) setSelectedRight(null); // Prevent selecting the same contract
    } else {
      setSelectedRight(id);
      if (selectedLeft === id) setSelectedLeft(null); // Prevent selecting the same contract
    }
  };

  return (

    <div className = "background-contract">
        <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 2, y: 0 }}
                    transition={{ duration:0.3 }}>
        <h1 className = "comparison-title">Contract Comparison</h1>
        </motion.div>
    <div className="container-fluid compare-container d-flex justify-content-center align-items-start py-4">
      <div className="container">


      <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 2, y: 0 }}
                    transition={{ duration:0.8 }}>
        <div className="row justify-content-center gx-1 custom-row">
          {/* Left Selection Column */}

          
        
          <div className="col-md-6 px-2">


            <h4 className="text-center">Select a contract</h4>
            <p className="text-center">Select the first contract for comparison</p>
            {contracts.map((contract) => (
              <div
                key={contract.id}
                className={`card mb-4 shadow-sm mx-auto ${selectedLeft === contract.id ? "border border-primary" : ""}`}
                style={{
                  opacity: selectedLeft && selectedLeft !== contract.id ? 0.5 : 1,
                  cursor: "pointer",
                  padding: "20px",
                }}
                onClick={() => handleSelect(contract.id, "left")}
              >
                <div className="card-body">
                  <h5 className="card-title">{contract.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Analyzed on {contract.date}</h6>
                  <button
                    className={`btn w-100 ${selectedLeft === contract.id ? "btn-primary" : "btn-outline-dark"}`}
                    disabled={selectedLeft === contract.id}
                  >
                    {selectedLeft === contract.id ? "Selected" : "Compare"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Selection Column */}
          <div className="col-md-6 px-2 ">
            <h4 className="text-center">Select another contract</h4>
            <p className="text-center">Select the second contract for comparison</p>
            {contracts.map((contract) => (
              <div
                key={contract.id}
                className={`card mb-4 shadow-sm mx-auto ${selectedRight === contract.id ? "border-primary" : ""}`}
                style={{
                  opacity: selectedRight && selectedRight !== contract.id ? 0.5 : 1,
                  cursor: "pointer",
                  padding: "20px",
                }}
                onClick={() => handleSelect(contract.id, "right")}
              >
                <div className="card-body">
                  <h5 className="card-title">{contract.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Analyzed on {contract.date}</h6>
                  <button
                    className={`btn w-100 ${selectedRight === contract.id ? "btn-primary" : "btn-outline-dark"}`}
                    disabled={selectedRight === contract.id}
                  >
                    {selectedRight === contract.id ? "Selected" : "Compare"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        </motion.div>
       

        {/* Compare Button */}
        {selectedLeft && selectedRight && (
          <div className="text-center mt-4">
            <Link to = "/contractcompare" >
            <button className="btn btn-success btn-lg">Compare Selected Contracts</button>
            </Link>
          </div>
        )}
      </div>
    </div>
    </div>

   
  );
}

