import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./CompareContracts.css";
import { motion } from "framer-motion";
import geminiApi from "../services/geminiApi";
import { useAuth } from "../contexts/AuthContext";
import { Typography } from "@mui/material";

export default function ContractCompare() {
  const { user } = useAuth();
  const [contracts, setContracts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchContracts = async (userId) => {
      const response = await geminiApi.fetchHistoryContracts(userId);
      if (response.success) {
        setContracts(response.data);
      } else {
        setError(response.message);
      }
      setLoading(false);
    };

    fetchContracts(user.uid);
  }, [user]);

  if (loading) {
    return <Typography>Loading contracts...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

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
    <div className="background-contract">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 2, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="comparison-title">Contract Comparison</h1>
      </motion.div>
      <div className="container-fluid compare-container d-flex justify-content-center align-items-start py-4">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 2, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="row justify-content-center gx-1 custom-row">
              {/* Left Selection Column */}

              <div className="col-md-6 px-2">
                <h4 className="text-center">Select a contract</h4>
                <p className="text-center">
                  Select the first contract for comparison
                </p>
                <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
                  {contracts.map((contract) => (
                    <div
                      key={contract.documentId}
                      className={`card mb-4 shadow-sm mx-auto ${
                        selectedLeft === contract.documentId
                          ? "border border-primary"
                          : ""
                      }`}
                      style={{
                        opacity:
                          selectedLeft && selectedLeft !== contract.documentId
                            ? 0.5
                            : 1,
                        cursor: "pointer",
                        padding: "5px",
                      }}
                      onClick={() => handleSelect(contract.documentId, "left")}
                    >
                      <div className="card-body">
                        <h5 className="card-title">{contract.contractName}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          Analyzed on {contract.dateUploaded}
                        </h6>
                        <button
                          className={`btn w-100 ${
                            selectedLeft === contract.documentId
                              ? "btn-primary"
                              : "btn-outline-dark"
                          }`}
                          disabled={selectedLeft === contract.documentId}
                        >
                          {selectedLeft === contract.documentId
                            ? "Selected"
                            : "Compare"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Selection Column */}
              {selectedLeft &&               <div className="col-md-6 px-2 ">
                <h4 className="text-center">Select another contract</h4>
                <p className="text-center">
                  Select the second contract for comparison
                </p>
                <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
                  {contracts.map((contract) => (
                    <div
                      key={contract.documentId}
                      className={`card mb-4 shadow-sm mx-auto ${
                        selectedRight === contract.documentId
                          ? "border-primary"
                          : ""
                      }`}
                      style={{
                        opacity:
                          selectedRight && selectedRight !== contract.documentId
                            ? 0.5
                            : 1,
                        cursor: "pointer",
                        padding: "5px",
                      }}
                      onClick={() => handleSelect(contract.documentId, "right")}
                    >
                      <div className="card-body">
                        <h5 className="card-title">{contract.contractName}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          Analyzed on {contract.dateUploaded}
                        </h6>
                        <button
                          className={`btn w-100 ${
                            selectedRight === contract.documentId
                              ? "btn-primary"
                              : "btn-outline-dark"
                          }`}
                          disabled={selectedRight === contract.documentId}
                        >
                          {selectedRight === contract.documentId
                            ? "Selected"
                            : "Compare"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>}

            </div>
          </motion.div>

          {/* Compare Button */}
          {selectedLeft && selectedRight && (
            <div className="text-center mt-4">
              <Link to={`/contractcompare/${selectedLeft}/${selectedRight}`}>
                <button className="btn btn-success btn-lg">
                  Compare Selected Contracts
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
