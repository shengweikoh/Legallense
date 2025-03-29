import { Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import geminiApi from '../services/geminiApi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

export const ContractDetails = ({ contractId: passedContractId }) => {


/**
 * Clean up raw text and split into paragraphs.
 */
const cleanContractText = (text) => {
  // 1. Split on single newlines
  let lines = text.split("\n");

  // 2. Filter out unwanted lines
  const filteredLines = lines.filter((line) => {
    const trimmed = line.trim();

    // Remove lines that are just underscores or whitespace
    if (/^[_\s]{5,}$/.test(trimmed)) return false;

    // Remove page indicators like "Page 1 of 8", etc.
    if (/^Page\s*\d+\s*(of|out of)?\s*\d+/i.test(trimmed)) return false;

    return true;
  });

  // 3. Join back with single newlines
  let cleanedText = filteredLines.join("\n");

  // 4. Reduce triple+ newlines down to double newlines (for paragraphs)
  //    This means 3+ blank lines become a single paragraph break.
  cleanedText = cleanedText.replace(/\n{3,}/g, "\n\n");

  // 5. Split on double newlines to identify paragraphs
  const paragraphs = cleanedText.split(/\n\s*\n/);

  // 6. For each paragraph, replace any remaining single newlines with a space
  //    so that lines within the same paragraph read continuously.
  const cleanedParagraphs = paragraphs.map(paragraph =>
    paragraph.replace(/\n+/g, " ")
  );

  return cleanedParagraphs;
};

  
  /****************************
   * 2) Highlight keywords
   ****************************/
  const highlightKeywords = (text) => {
    const keywords = [
      "Client", "Responsibilities", "Contractor", "Employee", "Company", "Party", "shall", "must",
      "agrees", "warrants", "acknowledges", "obligated", "breach", "liability",
      "damages", "termination", "confidentiality", "governing law", "jurisdiction",
      "fees", "payment", "penalty", "invoice", "interest", "term", "effective date",
      "duration", "basic hourly wage", "Annual leave", "Gross hourly wage", "Name",
      "Address", "Salary", "Overtime", "Work", "Schedule", "Leave", "Medical", "Coverage",
      "Insurance", "Transfer", "Conflict", "Confidential", "Non-Disparagement", "Severability"
    ];
  
    // Build a case-insensitive regex matching any keyword as a whole word
    const regex = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi");
  
    // Split the text around the keywords
    const parts = text.split(regex);
  
    // Rebuild with <strong> around matched keywords
    return parts.map((part, i) =>
      keywords.map(k => k.toLowerCase()).includes(part.toLowerCase()) ? (
        <strong key={i}>{part}</strong>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };
  
  
  /****************************
   * 3) Render with highlighting
   ****************************/
  const renderHighlightedText = (paragraphs) => {
    return (
      <div>
        {paragraphs.map((para, index) => {
          // Optional: detect if paragraph starts with a numbered clause
          // If you want to bold the entire first line of a clause, you could
          // do more advanced logic here. For simplicity, we just highlight.
          return (
            <p key={index} style={{ marginBottom: "1em", lineHeight: 1.6 }}>
              {highlightKeywords(para)}
            </p>
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
        
    <div style = {{textAlign: 'center'}}>
      {renderHighlightedText(cleanContractText(details))}
    </div>
  );
};

ContractDetails.propTypes = {
  contractId: PropTypes.string,
};