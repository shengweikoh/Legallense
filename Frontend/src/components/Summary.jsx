// Summary.jsx
import { ContractDataLoader } from "./ContractDataLoader";
import geminiApi from "../services/geminiApi";
import ReactMarkdown from "react-markdown";
import "./markdown.css";

export const Summary = () => {
  return (
    <ContractDataLoader request={geminiApi.summariseContract}>
      {(data) => (
        <div className="markdown">
          <ReactMarkdown>{data}</ReactMarkdown>
        </div>
      )}
    </ContractDataLoader>
  );
};