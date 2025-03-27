import {useEffect, useState} from 'react';
import { Link, useParams } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { motion } from "framer-motion";
import geminiApi from "../services/geminiApi";
import { useAuth } from "../contexts/AuthContext";
import { Typography, Button } from "@mui/material";
import { ContractCard } from './ContractCard';
import "./ListCompare.css"

export const ListCompareContracts = () => {
  const { user } = useAuth();
  const { contractId } = useParams();
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);
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

  return (
    <div className="container my-4 smallanalysis">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-center">Your Contracts</h2>
      </motion.div>
      <div className="row">
        {contracts.filter((contract) => contract.documentId != contractId).map((contract) => (
          <div key={contract.documentId} className="col-md-4">
            <ContractCard 
              contract={contract}
              onClick={() => setSelectedContract(contract.documentId)}
              isSelected={selectedContract === contract.documentId}  
            />
          </div>
        ))}
      </div>
      {selectedContract && (
        <div className="text-center mt-4">
          <Link to={`/contractcompare/${contractId}/${selectedContract}`}>
            <Button variant="outlined" color="primary" size="large">
              Continue
            </Button>
          </Link>
        </div>
      )}      
    </div>
  );


}