import { ContractDataLoader } from "./ContractDataLoader";
import geminiApi from "../services/geminiApi";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import "./markdown.css";

export const Summary = () => {
  return (
    <ContractDataLoader request={geminiApi.summariseContract}>
      {(data) => (
        <div className="markdown" style={{ textAlign: "left" }}>
          {data.map((clause, index) => (
            <Card key={index} variant="outlined" sx={{ mb: 2, borderRadius: 2, boxShadow: '0px 4px 10px rgba(0,0,0,0.15)',}}>
              <CardHeader sx = {{"&:first-child": {pb: 0}}}
                title={
                  <Typography variant="h6" component="div">
                    <strong>
                      Clause {index + 1}: {clause.clauseName}
                    </strong>
                  </Typography>
                }
              />
              <CardContent sx={{ pb: 0, "&:last-child": { pb: 0 } }}>
                <Typography>{clause.content1}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </ContractDataLoader>
  );
};
