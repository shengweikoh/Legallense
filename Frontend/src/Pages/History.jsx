import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileTextIcon, ChevronRightIcon } from "lucide-react";
import "./History.css";
import { motion } from "framer-motion";
import geminiApi from "../services/geminiApi";
import { useAuth } from "../contexts/AuthContext";
import { Typography } from "@mui/material";


export default function History() {
  const { user } = useAuth();

  const [contracts, setContracts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
  }, [user])

  if (loading) {
    return <Typography>Loading contracts...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }


  // const contracts = [
  //   { documentId: 1, title: "Coffee Shop Part-Time Contract",  },
  //   { contractId: 2, title: "Retail Store Weekend Job Agreement", date: "2023-05-22" },
  //   { contractId: 3, title: "Event Staff Contract", date: "2023-04-10" },
  //   { contractId: 1, title: "Coffee Shop Part-Time Contract", date: "2023-06-15" },
  //   { contractId: 2, title: "Retail Store Weekend Job Agreement", date: "2023-05-22" },
  //   { contractId: 3, title: "Event Staff Contract", date: "2023-04-10" },

  // ];

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
        <motion.div key = {contract.documentId}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 2, y: 0 }}
        transition={{ duration: 0.8}}
        >
          
          <div className="col-md-6 col-lg-10 mx-auto historyspace">
            <div className="card shadow-sm border-1 mt-1 historymaincard">
              <div className="card-body historycard">
                <h5 className="card-title d-flex justify-content-between align-items-center p-0 ">
                  {contract.contractName}
                </h5>
                <h6 className="card-subtitle text-muted mb-2 text-start">
                  Analyzed on {contract.dateUploaded}
                </h6>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div className="d-flex align-items-center text-muted">
                    <FileTextIcon className="me-2 text-primary" size={20} />
                    <span>Contract #{contract.documentId}</span>
                  </div>
                  <Link to={`/analysis/${contract.documentId}`} className="btn btn-outline-primary d-flex align-items-center">
                    View Analysis <ChevronRightIcon className="ms-1" size={16} />
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
