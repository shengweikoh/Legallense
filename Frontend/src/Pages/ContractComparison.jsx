import React , {useEffect, useState} from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./ContractComparison.css";
import { motion } from "framer-motion";
import geminiApi from '../services/geminiApi';
import { useAuth } from '../contexts/AuthContext';
import { Button, Typography } from '@mui/material';


export default function ContractComparison() {

    const { contractId1, contractId2 } = useParams();
    const [clauses, setClauses] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    // Helper function to format text by removing extra spaces
    const formatText = (text) => {
      return text
      .replace(/\\"/g, '"') // Replaces \" with "
      .replace(/\s+/g, ' ')
      .trim();
    };

    const navigate = useNavigate(-1);
    
    useEffect( () => {
      if (!user) {
        return;
      }
      if (clauses) {
        return;
      }

      const fetchClauses = async (userId, contractId1, contractId2) => {
        const response = await geminiApi.compareContracts(userId, contractId1, contractId2);
        if (response.success) {
          setClauses(response.data);
        } else {
          setError(response.message)
        }
        setLoading(false);
      }

      fetchClauses(user.uid, contractId1, contractId2);

    }, [user, contractId1, contractId2, clauses])


    if (loading) {
      return <Typography>Loading...</Typography>;
    }
    
    if (error) {
      return <Typography color='red'>{error}</Typography>;
    }

    const contractNames = clauses[0]


    return (
      <div className="ContractComparisonBackground">
        <div className="container">
          <div className="d-flex justify-content-center">
            <div className="card job-card">
              {/* Put your button here, above the table */}
              <Button
                color='back'
                variant='contained'
                onClick={() => navigate(-1)}
                sx = {{
                  maxWidth: 20,
                  marginBottom: 1,
                  marginLeft: 1,
                  textTransform: 'capitalize'
                }}
                >
                  Back
                  </Button>
              <div className="table-container">
                <table className="table borderless">
                  <thead>
                    <tr className="table-header-row">
                      <th className="table-heading">Category</th>
                      <th className="table-heading">{contractNames.contract1}</th>
                      <th className="table-heading">{contractNames.contract2}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clauses
                      .filter((clause, index) => index > 0)
                      .map((clause, index) => (
                        <tr key={index} className="table-row">
                          <td className="table-label">{clause.clauseName}</td>
                          <td className="table-value">
                            {formatText(clause.contract1)}
                          </td>
                          <td className="table-value">
                            {formatText(clause.contract2)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );


}





