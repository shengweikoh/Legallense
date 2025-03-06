import React , {useState} from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./ContractComparison.css";
import { motion } from "framer-motion";

export default function ContractComparison() {

    const rowData = [
        { 
            label: "Contract", 
            contract1: { name: "Full-Time", file: "/Animation/hi.pdf" }, 
            contract2: { name: "Part-Time", file: "/Animation/hi.pdf"}, 
          },
        { label: "Salary", contract1: "$60,000 / year", contract2: "$30,000 / year" },
        { label: "Healthcare Benefits", contract1: "Yes, includes dental & vision", contract2: "No benefits" },
        { label: "Working Hours", contract1: "9 AM - 5 PM (Mon-Fri)", contract2: "Flexible, 20 hours/week" },
        { label: "Annual Leave", contract1: "15 days + public holidays", contract2: "5 days + public holidays" }
      ];
    


    return (
    <div className = "ContractComparisonBackground">

    <div className=" container d-flex justify-content-center">
      <div className="card job-card">
        <div className="table-container">
          <table className="table borderless">
          <thead>
              <tr className="table-header-row">
                <th className="table-heading">Category</th>
                <th className="table-heading">Contract 1</th>
                <th className="table-heading">Contract 2</th>
              </tr>
            </thead>
            <tbody>
              {rowData.map((row, index) => (
                <tr key={index} className="table-row">
                  <td className="table-label">{row.label}</td>

                  {/* Handle contract links properly */}
                  <td className="table-value">
                    {row.label === "Contract" ? (
                      <a href={row.contract1.file} target="_blank" rel="noopener noreferrer" className="contract-link">
                        {row.contract1.name}
                      </a>
                    ) : (
                      row.contract1
                    )}
                  </td>

                  <td className="table-value">
                    {row.label === "Contract" ? (
                      <a href={row.contract2.file} target="_blank" rel="noopener noreferrer" className="contract-link">
                        {row.contract2.name}
                      </a>
                    ) : (
                      row.contract2
                    )}
                  </td>
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




