import React from "react";
import { Link } from "react-router-dom";
import { FileTextIcon, ChevronRightIcon } from "lucide-react";
import "./History.css";

export default function History() {
  const contracts = [
    { id: 1, name: "Coffee Shop Part-Time Contract", date: "2023-06-15" },
    { id: 2, name: "Retail Store Weekend Job Agreement", date: "2023-05-22" },
    { id: 3, name: "Event Staff Contract", date: "2023-04-10" },
  ];

  return (
    <div className="history-container">
      <h1 className="mb-4 fw-bold title">Contract History</h1>
      <div className="row g-3">
        {contracts.map((contract) => (
          <div key={contract.id} className="col-md-6 col-lg-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title d-flex justify-content-between align-items-center">
                  {contract.name}
                </h5>
                <h6 className="card-subtitle text-muted mb-2">
                  Analyzed on {contract.date}
                </h6>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="d-flex align-items-center text-muted">
                    <FileTextIcon className="me-2 text-primary" size={20} />
                    <span>Contract #{contract.id}</span>
                  </div>
                  <Link to={`/summary?id=${contract.id}`} className="btn btn-outline-primary d-flex align-items-center">
                    View Summary <ChevronRightIcon className="ms-1" size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
