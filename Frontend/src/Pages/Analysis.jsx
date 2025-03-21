import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./Analysis.css";
import { ContractDetails } from '../components/ContractDetails';
import { Summary } from '../components/Summary';


export default function AnalysisPage() {
  return (
   <div className = "page">
    <div className="container-fluid m-5 analysiscontainer">
      <div className="row ">
        {/* Left Section: Contract Details */}
        <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column">
          <div className="card contractdetails2 mb-4">
            <div className="card-header">
              <h5 className="card-title">Contract Details</h5>
            </div>
            <div className="card-body">
              <div
                className="overflow-auto"
                style={{
                  height: "270px",
                  width:"100%",  
                  border: "1px solid #ddd",
                  padding: "10px",
                  whiteSpace: "pre-line"
                }}
              >
                {/* Replace with your contract details */}
                <ContractDetails />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Tabs */}
        <div className="col-lg-6 col-md-6 col-sm-6 d-flex flex-column">
          <div className="card  result">
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs" id="analysisTabs" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="summary-tab"
                    data-bs-toggle="tab"
                    href="#summary"
                    role="tab"
                    aria-controls="summary"
                    aria-selected="true"
                  >
                    Summary
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="review-tab"
                    data-bs-toggle="tab"
                    href="#review"
                    role="tab"
                    aria-controls="review"
                    aria-selected="false"
                  >
                    Review
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="suggest-tab"
                    data-bs-toggle="tab"
                    href="#suggest"
                    role="tab"
                    aria-controls="suggest"
                    aria-selected="false"
                  >
                    Suggest
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="compare-tab"
                    data-bs-toggle="tab"
                    href="#compare"
                    role="tab"
                    aria-controls="compare"
                    aria-selected="false"
                  >
                    Compare
                  </a>
                </li>
              </ul>
            </div>
            <div className="card-body">
              <div className="tab-content" id="analysisTabsContent">
                <div
                  className="tab-pane fade show active"
                  id="summary"
                  role="tabpanel"
                  aria-labelledby="summary-tab"
                  style = {{
                    whiteSpace:"pre-line",
                  }}
                >
                    <Summary />
                </div>
                <div
                  className="tab-pane fade"
                  id="review"
                  role="tabpanel"
                  aria-labelledby="review-tab"
                >
                  <p>Review content goes here...</p>
                </div>
                <div
                  className="tab-pane fade"
                  id="suggest"
                  role="tabpanel"
                  aria-labelledby="suggest-tab"
                >
                  <p>Suggest content goes here...</p>
                </div>
                <div
                  className="tab-pane fade"
                  id="compare"
                  role="tabpanel"
                  aria-labelledby="compare-tab"
                >
                  <p>Compare content goes here...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>

    </div>
  );
}