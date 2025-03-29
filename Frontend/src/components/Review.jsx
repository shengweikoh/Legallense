import { ContractDataLoader } from './ContractDataLoader';
import geminiApi from '../services/geminiApi';
import {
  Card,
  CardContent,
  CardHeader,
  Typography
} from '@mui/material';
import "./markdown.css";

export const Review = () => {
  return (
    <ContractDataLoader request={geminiApi.reviewContract}>
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
                    <strong>Problem {index+1}: {clause.clauseName}</strong>
                  </Typography>
                }
              />
              <CardContent>
                <Typography variant="body2">
                  <strong>Description:</strong> {clause.content1}
                </Typography>
                <Typography variant="body2">
                  <strong>Suggestion:</strong> {clause.content2}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </ContractDataLoader>
  );
};
