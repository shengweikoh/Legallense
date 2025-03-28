import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import geminiApi from "../services/geminiApi";
import { useAuth } from "../contexts/AuthContext";
import { ContractCard } from "./ContractCard";
import { useEffect, useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

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
  }, [user]);

  if (loading) {
    return <Typography>Loading contracts...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div className="container my-4" style={{ borderRadius: "20px" }}>
      {/* <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-1"> */}
      <div className="d-grid"
      style = {{
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1rem",
      }}>

        {contracts
          .filter((contract) => contract.documentId !== contractId)
          .map((contract) => (
            <div key={contract.documentId} className="col">
              {/* Each card is a flex container so the footer can stick to the bottom */}
              {/* <div className="card d-flex flex-column h-100"> */}
                <div className="card-body">
                  <ContractCard
                    contract={contract}
                    onClick={() => (contract.documentId)}
                    isSelected={selectedContract === contract.documentId}
                    compareLink={`/contractcompare/${contractId}/${contract.documentId}`}
                  />
                </div>

                
            </div>
          ))}
      </div>

      
    </div>
  );
};
