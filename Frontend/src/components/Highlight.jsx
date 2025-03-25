// import { Typography } from '@mui/material';
// import { useAuth } from '../contexts/AuthContext';
// import geminiApi from '../services/geminiApi';
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';


// export const Highlight = () => {
//     const { contractId } = useParams();
//     const { user } = useAuth();

//     const [highlight, setHighlight] = useState(null);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true)

//     useEffect(() => {
//         if (!user) return;
//         const fetchSummary = async (userId, contractId) => {
//             const response = await geminiApi.highlightContract(userId, contractId);
//             if (response.success) {
//                 setHighlight(response.data);
//             } else {
//                 setError(response.message);
//             }
//             setLoading(false);
          
//         }

//         fetchSummary(user.uid, contractId);

//     },[user, contractId]) // Error!


//     if (loading) {
//         return <Typography> Loading... </Typography>
//     }

//     if (error) {
//         return <Typography color='red'>{error}</Typography>
//     }

//     return (
//         <>
//             {highlight}
//         </>
//     )


// }

import { ContractDataLoader } from './ContractDataLoader';
import geminiApi from '../services/geminiApi';

export const Highlight = () => {
  return (
    <ContractDataLoader request={geminiApi.highlightContract}>
      {data => 
         <>
            {data}
         </>}
    </ContractDataLoader>
  );
};
