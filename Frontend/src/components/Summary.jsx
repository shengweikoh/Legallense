// import { Typography } from '@mui/material';
// import { useAuth } from '../contexts/AuthContext';
// import geminiApi from '../services/geminiApi';
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';


// export const Summary = () => {
//     const { contractId } = useParams();
//     const { user } = useAuth();

//     const [summary, setSummary] = useState(null);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true)

//     useEffect(() => {
//         if (!user) return;
//         const fetchSummary = async (userId, contractId) => {
//             const response = await geminiApi.summariseContract(userId, contractId);
//             if (response.success) {
//                 setSummary(response.data);
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
//             {summary}
//         </>
//     )


// }

import { ContractDataLoader } from './ContractDataLoader';
import geminiApi from '../services/geminiApi';
import ReactMarkdown from 'react-markdown';

export const Summary = () => {
  return (
    <ContractDataLoader request={geminiApi.summariseContract}>
      {data => 
         <ReactMarkdown>
            {data}
         </ReactMarkdown>}
    </ContractDataLoader>
  );
};

