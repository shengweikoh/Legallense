import { Box, createTheme, ThemeProvider, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from '../contexts/AuthContext';
import geminiApi from '../services/geminiApi';
import { useEffect, useState } from 'react';


export const Summary = () => {
    const { user } = useAuth();

    // Temporary Contract ID
    const contractId = 123;

    const [summary, setSummary] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSummary = async (userId, contractId) => {
            const response = await geminiApi.summariseContract(userId, contractId);
            if (response.success) {
                setSummary(response.data);
            } else {
                setError(response.message);
            }
            setLoading(false);
          
        }

        fetchSummary(user.uid, contractId);

    },[user.uid, contractId])


    if (loading) {
        return <Typography> Loading... </Typography>
    }

    if (error) {
        return <Typography color='red'>{error}</Typography>
    }

    return (
        <Box>
            {summary}
        </Box>
    )


}

