import { ContractDataLoader } from "./ContractDataLoader";
import geminiApi from "../services/geminiApi";
import "./markdown.css";

export const Summary = () => {
  
  return (
    <ContractDataLoader request={geminiApi.summariseContract}>
      {(data) => (
        <div className="markdown" style = {{textAlign: "left"}}>
          {data.map((clause, index) => {
            return (
              <div key={index}>
                <h4>{clause.clauseName}</h4>
                <p>{clause.content1}</p>
              </div>
            );
          })}
        </div>
      )}
    </ContractDataLoader>
  );
};