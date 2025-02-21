import React from "react";
import { Link } from "react-router-dom";
import { FileTextIcon, ChevronRightIcon } from "lucide-react";
import "./History.css";
import { motion } from "framer-motion";

export default function History() {
  const contracts = [
    { id: 1, name: "Coffee Shop Part-Time Contract", date: "2023-06-15" },
    { id: 2, name: "Retail Store Weekend Job Agreement", date: "2023-05-22" },
    { id: 3, name: "Event Staff Contract", date: "2023-04-10" },
    { id: 1, name: "Coffee Shop Part-Time Contract", date: "2023-06-15" },
    { id: 2, name: "Retail Store Weekend Job Agreement", date: "2023-05-22" },
    { id: 3, name: "Event Staff Contract", date: "2023-04-10" },

  ];

  return (


    <div className="history-container">
        <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 2, y: 0 }}
              transition={{ duration: 0.4 }}
            >
      <h1 className="mb-4 fw-bold historytitle">Contract History</h1>
      <div className="row g-3">
        {contracts.map((contract) => (

        <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 2, y: 0 }}
        transition={{ duration: 0.8}}
        >
          
          <div key={contract.id} className="col-md-6 col-lg-10 mx-auto historyspace">
            <div className="card shadow-sm border-1 mt-1 historymaincard">
              <div className="card-body historycard">
                <h5 className="card-title d-flex justify-content-between align-items-center p-0 ">
                  {contract.name}
                </h5>
                <h6 className="card-subtitle text-muted mb-2 text-start">
                  Analyzed on {contract.date}
                </h6>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div className="d-flex align-items-center text-muted">
                    <FileTextIcon className="me-2 text-primary" size={20} />
                    <span>Contract #{contract.id}</span>
                  </div>
                  <Link to={`/summary?id=${contract.id}`} className="btn btn-outline-primary d-flex align-items-center">
                    View Summary <ChevronRightIcon className="ms-1" size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </motion.div>
        ))}
      </div>
      </motion.div>
    </div>
  );
}
