import { ContractDataLoader } from "./ContractDataLoader";
import geminiApi from "../services/geminiApi";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import "./markdown.css";

export const Review = () => {
  return (
    <ContractDataLoader request={geminiApi.reviewContract}>
      {(data) => (
        <div className="markdown" style={{ textAlign: "left" }}>
          {data.map((clause, index) => (
            <Card key={index} variant="outlined" sx={{ mb: 2, borderRadius: 2, boxShadow: '0px 4px 10px rgba(0,0,0,0.15)',}}>
              <CardHeader sx = {{"&:first-child": {pb: 0}}}
                title={
                  <Typography variant="h6" component="div">
                    <strong>
                      Problem {index + 1}: {clause.clauseName}
                    </strong>
                  </Typography>
                }
              />
              <CardContent sx={{ pb: 0, "&:last-child": { pb: 0 } }}>
                <Typography>
                  <strong>Description:</strong> {clause.content1}
                </Typography>
                <Typography>
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
