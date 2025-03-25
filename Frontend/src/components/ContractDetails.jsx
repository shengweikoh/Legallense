import { Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import geminiApi from '../services/geminiApi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


export const ContractDetails = () => {
    const { contractId } = useParams();
    const { user } = useAuth();

    const [details, setDetails] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user) return;

        const fetchContractDetails = async (userId, contractId) => {
            const response = await geminiApi.fetchContractDetails(userId, contractId);
            if (response.success) {
                setDetails(response.data.fullText);
            } else {
                setError(response.message);
            }
            setLoading(false);
          
        }

        fetchContractDetails(user.uid, contractId);

    },[user, contractId]) // Error!


    if (loading) {
        return <Typography> Loading... </Typography>
    }

    if (error) {
        return <Typography color='red'>{error}</Typography>
    }

    return (
       <>
        {details}
       </>

    )


}

