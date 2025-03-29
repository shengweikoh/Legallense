import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Analysis.css";
import { useState } from "react";
import { ContractDetails } from "../components/ContractDetails";
import { Summary } from "../components/Summary";
import { Review } from "../components/Review";
import { ListCompareContracts } from "../components/ListCompareContracts";
import { Button } from "@mui/material";

export default function AnalysisPage() {
  const [activeTab, setActiveTab] = useState("summary");
  const [contractDetails, setContractDetails] = useState(false);

  const handleToggleContractDetails = () => {
    setContractDetails(!contractDetails);
  }

  return (
    <div className="page">
      <div className="container-fluid m-4 analysiscontainer">
        <div className="row g-4">

          {/* Left Section: Contract Details */}
          {contractDetails &&  
          <div className="col-lg-6 d-flex flex-column">
            <div className="card contractdetails2 mb-4">
              <div className="card-header">
                <h5 className="card-title details">Contract Details</h5>
              </div>
              <div className="card-body">
                <div
                  className="overflow-auto"
                  style={{
                    maxHeight: "65vh",
                    width: "100%",
                    padding: "0px",
                    whiteSpace: "pre-line",
                  }}
                >
                  <ContractDetails />
                </div>
              </div>
            </div>
          </div>
          }




          {/* Right Section: Tabs */}
          <div
            className={`col-lg-${contractDetails ? 6 : 12} d-flex flex-column resultcontainer`}
          >
            <div className="card result">
              <div className="card-header">

                <ul
                  className="nav nav-tabs card-header-tabs d-flex justify-content-center gap-4"
                  id="analysisTabs"
                  role="tablist"
                >
                  <li className="nav-item">
                      <Button 
                      onClick={handleToggleContractDetails}
                      color="primary"
                      sx={{marginTop: 1}}
                      >{contractDetails ? 'Hide' : 'Show'} Contract Details
                      </Button>
                  </li>
 
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeTab === "summary" ? "active" : ""}`}
                      id="summary-tab"
                      onClick={() => setActiveTab("summary")}
                      role="tab"
                      aria-controls="summary"
                      aria-selected={activeTab === "summary"}
                    >
                      Summary
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeTab === "review" ? "active" : ""}`}
                      id="review-tab"
                      onClick={() => setActiveTab("review")}
                      role="tab"
                      aria-controls="review"
                      aria-selected={activeTab === "review"}
                    >
                      Review
                    </a>
                  </li>
                  {/* <li className="nav-item">
                    <a
                      className={`nav-link ${activeTab === "suggest" ? "active" : ""}`}
                      id="suggest-tab"
                      onClick={() => setActiveTab("suggest")}
                      role="tab"
                      aria-controls="suggest"
                      aria-selected={activeTab === "suggest"}
                    >
                      Suggest
                    </a>
                  </li> */}
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeTab === "compare" ? "active" : ""}`}
                      id="compare-tab"
                      onClick={() => setActiveTab("compare")}
                      role="tab"
                      aria-controls="compare"
                      aria-selected={activeTab === "compare"}
                    >
                      Compare
                    </a>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <div className="tab-content" id="analysisTabsContent">
                  <div
                    className={`tab-pane fade ${activeTab === "summary" ? "show active" : ""}`}
                    id="summary"
                    role="tabpanel"
                    aria-labelledby="summary-tab"
                    style={{
                      whiteSpace: "normal",
                      maxHeight: "65vh",
                      overflowY: "auto",
                      lineHeight: 1.8,
                    }}
                  >
                    {activeTab === "summary" && <Summary />}
                  </div>
                  <div
                    className={`tab-pane fade ${activeTab === "review" ? "show active" : ""}`}
                    id="review"
                    role="tabpanel"
                    aria-labelledby="review-tab"
                    style={{
                      whiteSpace: "normal",
                      maxHeight: "64vh",
                      overflowY: "auto",
                      lineHeight: 1.8,
                    }}
                  >
                    {activeTab === "review" && <Review />}
                  </div>

                  {/* <div
                    className={`tab-pane fade ${activeTab === "suggest" ? "show active" : ""}`}
                    id="suggest"
                    role="tabpanel"
                    aria-labelledby="suggest-tab"
                    style={{
                      whiteSpace: "normal",
                      maxHeight: "64vh",
                      overflowY: "auto",
                      lineHeight: 1.8,
                    }}
                  >
                    {activeTab === "suggest" && <Suggest />}
                  </div> */}
                  <div
                    className={`tab-pane fade ${activeTab === "compare" ? "show active" : ""}`}
                    id="compare"
                    role="tabpanel"
                    aria-labelledby="compare-tab"
                    style={{
                      whiteSpace: "normal",
                      maxHeight: "64vh",
                      overflowY: "auto",
                    }}
                  >
                    {activeTab === "compare" && (
                      <>
                        <ListCompareContracts />
                      </>
                    )}
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