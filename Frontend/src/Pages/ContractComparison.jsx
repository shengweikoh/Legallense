import React , {useState} from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./ContractComparison.css";
import { motion } from "framer-motion";

export default function ContractComparison() {

    // const rowData = [
    //     { 
    //         label: "Contract", 
    //         contract1: { name: "Full-Time", file: "/Animation/hi.pdf" }, 
    //         contract2: { name: "Part-Time", file: "/Animation/hi.pdf"}, 
    //       },
    //     { label: "Salary", contract1: "$60,000 / year", contract2: "$30,000 / year" },
    //     { label: "Healthcare Benefits", contract1: "Yes, includes dental & vision", contract2: "No benefits" },
    //     { label: "Working Hours", contract1: "9 AM - 5 PM (Mon-Fri)", contract2: "Flexible, 20 hours/week" },
    //     { label: "Annual Leave", contract1: "15 days + public holidays", contract2: "5 days + public holidays" }
    //   ];
    
      const clauseComparisons = [
        {
          clauseNumber: 1,
          clauseTitle: "Name",
          contract1: "Uniqlo Part-time associate"  ,
          contract2: "HaiDiLao part-time associate"
          }
        ,
        {
          clauseNumber: 2,
          clauseTitle: "Position",
            contract1: "Position is part-time XYZ"  ,
            contract2: "Position is full-time ABC"
  
        },
        {
          clauseNumber: 3,
          clauseTitle: "Hourly Gross Salary",
          contract1: "The gross hourly wage includes salary in lieu of annual leave and public holiday pay.",
          contract2: "The gross hourly rate is separate from holiday pay, with contributions to statutory funds."
        }
      ];
      
    const contract1Name = clauseComparisons[0].contract1;
    const contract2Name = clauseComparisons[0].contract2;

    const sortedComparisons = clauseComparisons.slice().sort((a, b) => a.clauseNumber - b.clauseNumber);


    return (
    <div className = "ContractComparisonBackground">

    <div className=" container d-flex justify-content-center">
      <div className="card job-card">
        <div className="table-container">
          <table className="table borderless">
          <thead>
              <tr className="table-header-row">
                <th className="table-heading">Category</th>
                <th className="table-heading">{contract1Name}</th> 
                <th className="table-heading">{contract2Name}</th>
              </tr>
            </thead>
            <tbody>
                {sortedComparisons.filter(clause => clause.clauseNumber >= 2).map((clause) => (
                  <tr key={clause.clauseNumber} className="table-row">
                    <td className="table-label">{clause.clauseTitle}</td>
                    <td className="table-value">{clause.contract1}</td>
                    <td className="table-value">{clause.contract2}</td>
                  </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
    </div>
    </div>
    );


}





