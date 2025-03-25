import { Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import geminiApi from '../services/geminiApi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

export const ContractDetails = ({ contractId: passedContractId }) => {
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
      {details}
    </>
  );
};

ContractDetails.propTypes = {
  contractId: PropTypes.string,
};