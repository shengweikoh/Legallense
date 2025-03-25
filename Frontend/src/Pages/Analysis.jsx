import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Analysis.css";
import { ContractDetails } from "../components/ContractDetails";
import { Summary } from "../components/Summary";
import { Highlight } from "../components/Highlight";
import { Suggest } from "../components/Suggest";

export default function AnalysisPage() {
  return (
    <div className="page">
      <div className="container-fluid m-4 analysiscontainer">
        <div className="row g-4">
          {/* Left Section: Contract Details */}
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
                    minHeight: "65vh",
                    width: "100%",
                    bo,
                    padding: "0px",
                    whiteSpace: "pre-line",
                  }}
                >
                  {/* Replace with your contract details */}
                  <ContractDetails />
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Tabs */}
          <div className="col-lg-6  d-flex flex-column resultcontainer">
            <div className="card result">
              <div className="card-header">
                <ul
                  className="nav nav-tabs card-header-tabs d-flex justify-content-center gap-4"
                  id="analysisTabs"
                  role="tablist"
                >
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
                    style={{
                      whiteSpace: "pre-line",
                      maxHeight: "64vh",
                      maxWidth:"60vw",
                      overflowY: "auto",
                    }}
                  >
                    <Summary />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="review"
                    role="tabpanel"
                    aria-labelledby="review-tab"
                    style={{
                      whiteSpace: "pre-line",
                      maxHeight: "64vh",
                      maxWidth:"60vw",
                      overflowY: "auto",
                    }}
                  >
                    <Highlight />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="suggest"
                    role="tabpanel"
                    aria-labelledby="suggest-tab"
                    style={{
                      whiteSpace: "pre-line",
                      maxHeight: "64vh",
                      maxWidth:"60vw",
                      overflowY: "auto",
                    }}
                  >
                    <Suggest />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="compare"
                    role="tabpanel"
                    aria-labelledby="compare-tab"
                    style={{
                      whiteSpace: "pre-line",
                      maxHeight: "64vh",
                      maxWidth:"60vw",
                      overflowY: "auto",
                    }}
                  >
                    <p>Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...Compare content goes here...</p>
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
