

import { ContractDataLoader } from './ContractDataLoader';
import geminiApi from '../services/geminiApi';
import ReactMarkdown from 'react-markdown';
import "./markdown.css";

export const Highlight = () => {
  return (
    <ContractDataLoader request={geminiApi.highlightContract}>
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

