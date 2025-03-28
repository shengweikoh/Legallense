import { Link, useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";
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
      <div className="row row-cols-1 g-4">
        {contracts
          .filter((contract) => contract.documentId !== contractId)
          .map((contract) => (
            <div key={contract.documentId} className="col">
              {/* Each card is a flex container so the footer can stick to the bottom */}
              <div className="card d-flex flex-column h-100">
                <div className="card-body">
                  <ContractCard
                    contract={contract}
                    onClick={() => setSelectedContract(contract.documentId)}
                    isSelected={selectedContract === contract.documentId}
                  />
                </div>

                {/* Only show button if this card is the currently selected one */}
                {selectedContract === contract.documentId && (
                  <div className="card-footer text-center mt-auto"
                    style={{ backgroundColor: "transparent", border: "none" }}>
                    <Link to={`/contractcompare/${contractId}/${selectedContract}`}>
                      <Button variant="outlined" color="primary" size="large">
                        Continue to compare
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
