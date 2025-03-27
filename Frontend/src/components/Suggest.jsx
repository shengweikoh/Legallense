import { ContractDataLoader } from './ContractDataLoader';
import geminiApi from '../services/geminiApi';
import ReactMarkdown from 'react-markdown';
import "./markdown.css";


export const Suggest = () => {
  return (
    <ContractDataLoader request={geminiApi.suggestContract}>
      {data => 
        <div className="markdown">
           <ReactMarkdown>
              {data}
           </ReactMarkdown>
        </div>
}
    </ContractDataLoader>
  );
};
