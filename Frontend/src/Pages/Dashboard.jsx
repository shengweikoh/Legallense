import { Link } from "react-router-dom"; // Use react-router-dom for client-side routing
import {
  UploadIcon,
  HistoryIcon,
  AlertTriangleIcon,
  EditIcon,
} from "lucide-react";
import "./Dashboard.css"; // Import custom CSS
import { motion } from "framer-motion";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Dashboard() {
  return (
    <div className = "headcontainer"> 

        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 2, y: 0 }}
            transition={{ duration:0.5 }}>
    

    <div className="container my-5">
      <p className="lead">
        Empower yourself with clear contract insights.
      </p>

      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title ">Upload Contract</h5>
              <small className="text-muted  ">Analyze a new contract</small>
            </div>
            <div className="card-body d-flex align-items-center justify-content-center">
              <Link to="/upload" className="btn btn-primary w-100 mt-4">
                <UploadIcon className="me-2" size={16} />
                Upload Contract
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title">Contract History</h5>
              <small className="text-muted">View the analyses of your past contracts.</small>
            </div>
            <div className="card-body d-flex align-items-center justify-content-center">
              <Link to="/history" className="history btn btn-primary w-100">
                <HistoryIcon className="me-2" size={16} />
                View History
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title">Compare Contracts</h5>
              <small className="text-muted">Compare terms and clauses across 2 contracts.</small>
            </div>
            <div className="card-body d-flex align-items-center justify-content-center">
              <Link to="/compare" className="history btn btn-primary w-100">
                <HistoryIcon className="me-2" size={16} />
                Compare Contracts
              </Link>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-5 feature-section">
        <h2 className="h4 mb-4 key-feature">Key Features</h2>

        <div className="row mt-5">
          <div className="col-md-6 d-flex mb-3">
            <AlertTriangleIcon className="me-3" size={24} color="orange" />
            <div>
              <h5>Summarise contracts</h5>
              <p className="mb-0">
                Read through the key details of your contract immediately.
              </p>
            </div>

          </div>
          <div className="col-md-6 d-flex mb-3">
            <EditIcon className="me-3" size={24} color="green" />
            <div>
              <h5>Highlight Concerning Clauses</h5>
              <p className="mb-0">
                We identify and explain potentially problematic contract terms.
              </p>
            </div>
          </div>
        </div>

        <div className="row ">
          <div className="col-md-6 d-flex mt-5">
            <AlertTriangleIcon className="me-3" size={24} color="orange" />
            <div>
              <h5>Suggest improvements</h5>
              <p className="mb-0">
                Get AI-Powered suggestions for negotiating better terms.
              </p>
            </div>
          </div>

          <div className="col-md-6 d-flex mt-5">
            <EditIcon className="me-3" size={24} color="green" />
            <div>
              <h5>Compare</h5>
              <p className="mb-0 ">
                 Contrast your contract with previous contracts.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
    </motion.div>
    </div>
  );
}
