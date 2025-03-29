import { ContractDataLoader } from './ContractDataLoader';
import geminiApi from '../services/geminiApi';
import {
  Card,
  CardContent,
  CardHeader,
  Typography
} from '@mui/material';
import "./markdown.css";

export const Summary = () => {
  return (
    <ContractDataLoader request={geminiApi.summariseContract}>
      {(data) => (
        <div className="markdown" style={{ textAlign: "left" }}>
          {data.map((clause, index) => (
            <Card
              key={index}
              variant="outlined"
              sx={{ mb: 2}}
            >
              <CardHeader
                title={
                  <Typography variant="h5" component="div">
                    <strong>Clause {index+1}: {clause.clauseName}</strong>
                  </Typography>
                }
              />
              <CardContent sx = {{paddingBottom:0, marginBottom:0}}>
                <Typography variant="body2">
                  <strong>Description: </strong> {clause.content1}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </ContractDataLoader>
  );
};
