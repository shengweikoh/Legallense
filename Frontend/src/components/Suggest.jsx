import { ContractDataLoader } from './ContractDataLoader';
import geminiApi from '../services/geminiApi';

export const Suggest = () => {
  return (
    <ContractDataLoader request={geminiApi.suggestContract}>
      {data => 
         <>
            {data}
         </>}
    </ContractDataLoader>
  );
};
