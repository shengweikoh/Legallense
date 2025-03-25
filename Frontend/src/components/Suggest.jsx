import { ContractDataLoader } from './ContractDataLoader';
import geminiApi from '../services/geminiApi';
import ReactMarkdown from 'react-markdown';


export const Suggest = () => {
  return (
    <ContractDataLoader request={geminiApi.suggestContract}>
      {data => 
         <ReactMarkdown>
            {data}
         </ReactMarkdown>}
    </ContractDataLoader>
  );
};
