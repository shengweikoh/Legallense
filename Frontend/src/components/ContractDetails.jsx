import { Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import geminiApi from '../services/geminiApi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

export const ContractDetails = ({ contractId: passedContractId }) => {


  const cleanContractText = (text) => {
    const lines = text.split("\n");
  
    return lines
      .filter((line) => {
        const trimmed = line.trim();
  
        // Remove lines that are just long underscores
        if (/^[_\s]{5,}$/.test(trimmed)) return false;
  
        // Remove page indicators like "Page 1 of 8", "page 2 out of 10", etc.
        if (/^Page\s*\d+\s*(of|out of)?\s*\d+/i.test(trimmed)) return false;
  
        return true;
      })
      .join("\n"); // Join lines back after filtering
  };


  const highlightKeywords = (text) => {
    const keywords = [
      "Client", "Contractor", "Employee", "Company", "Party", "shall", "must", "agrees",
      "warrants", "acknowledges", "obligated", "breach", "liability", "damages",
      "termination", "confidentiality", "governing law", "jurisdiction", "fees",
      "payment", "penalty", "invoice", "interest", "term", "effective date", "duration" , "basic hourly wage" , "Annual leave" ,  "Gross hourly wage" , "Name" , "Address"
    ];
  
    const regex = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi");
    const parts = text.split(regex);
  
    return parts.map((part, i) =>
      keywords.map(k => k.toLowerCase()).includes(part.toLowerCase()) ? (
        <strong key={i}>{part}</strong>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };
  
  const renderHighlightedText = (contractText) => {
    const lines = contractText.split("\n");
    return (
      <div style={{ whiteSpace: "pre-wrap" }}>
        {lines.map((line, index) => {
          const isNumberedClause = /^\s*\d+\./.test(line.trim());
          return (
            <div key={index}>
              {isNumberedClause ? (
                <strong>{highlightKeywords(line)}</strong>
              ) : (
                <>{highlightKeywords(line)}</>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  
  const params = useParams();
  // Use the passed contractId prop if available, else use the one from URL parameters
  const contractId = passedContractId || params.contractId;
  const { user } = useAuth();

  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !contractId) return;

    const fetchContractDetails = async (userId, contractId) => {
      const response = await geminiApi.fetchContractDetails(userId, contractId);
      if (response.success) {
        setDetails(response.data.fullText);
      } else {
        setError(response.message);
      }
      setLoading(false);
    };

    fetchContractDetails(user.uid, contractId);
  }, [user, contractId]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }
  
  if (error) {
    return <Typography color='red'>{error}</Typography>;
  }
  
  return (
        
    <>
      {renderHighlightedText(cleanContractText(details))}
    </>
  );
};

ContractDetails.propTypes = {
  contractId: PropTypes.string,
};