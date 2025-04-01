import { useState } from "react";
import "./Upload.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AlertDialog from "../components/AlertDialog";
import { useAuth } from "../contexts/AuthContext";
import geminiApi from "../services/geminiApi";
import { ContractDetails } from "../components/ContractDetails";

export default function UploadContract() {
  const { user } = useAuth();
  const [contractName, setContractName] = useState("");
  const [contractId, setContractId] = useState("");
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [open, setOpen] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRedirect = () => {
    handleClose();
    navigate(`/analysis/${contractId}`);
  };

  const handleFileChange = (event) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setContractName(selectedFile.name);
    }
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (!file) return;

  //   setIsAnalyzing(true);
  //   // Simulate a delay (e.g., for uploading and analysis)
  //   await new Promise((resolve) => setTimeout(resolve, 3000));
  //   setIsAnalyzing(false);
  //   // Reset the file input after analysis
  //   setFile(null);
  // };

  const handleSubmit = async (event) => {
    console.log("Upload in progress.");
    event.preventDefault();
    if (!file) return;

    setIsAnalyzing(true);
    // Call the upload endpoint using geminiApi
    const response = await geminiApi.uploadContract(
      user.uid,
      file,
      contractName
    );
    setIsAnalyzing(false);

    if (response.success) {
      // Option: Show a success message or automatically open the dialog or redirect
      console.log("Upload successful. Contract ID:", response.data);
      setContractId(response.data);

      // For example, open an alert dialog to let the user continue to analysis
      // handleOpen();
      // Reset the form:
      setUploadStatus(true);
      setFile(null);
      setContractName("");
    } else {
      // Handle error
      console.error("Error uploading contract:", response.message);
      alert(`Error uploading contract: ${response.message}`);
    }
  };

  return (
    <div className="container-fluid min-vh-100 custom-bg">
      <div
        className="row justify-content-center align-items-center "
        style={{ height: "100%" }}
      >
        <div className="col-12 col-md-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 2, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Upload Contract</h5>
                <p className="card-text">Upload your contract for analysis</p>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <input
                      type="file"
                      className="form-control"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      disabled={isAnalyzing}
                    />
                    <button
                      type="submit"
                      className="btn btn-primary Analyze"
                      disabled={!file || isAnalyzing}
                    >
                      {isAnalyzing ? (
                        <>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          Upload
                        </>
                      )}
                    </button>
                  </div>
                  {file && (
                    <small className="text-muted">
                      Selected file: {file.name}
                    </small>
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {uploadStatus && (
        <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 2, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="row m-5">
          <div className="col-12">
            <div className="d-flex justify-content-center">
              <div className="card contractdetails">
                <div className="card-header">
                  <h5 className="card-title">Contract Details</h5>
                </div>
                <div className="card-body">
                  {uploadStatus && (
                    <div
                      className="overflow-auto"
                      style={{
                        maxHeight: "250px",
                        border: "1px solid #ddd",
                        padding: "10px",
                        whiteSpace: "pre-line",
                      }}
                    >
                      <ContractDetails contractId={contractId} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        </motion.div>
      )}

      {uploadStatus && (
        <AlertDialog
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          dialogButtonText="Continue to analysis"
          dialogTitle="Please read and acknowledge before continuing"
          dialogContent={`All information provided herein is solely for informational purposes and should not be construed as legal advice.
            By proceeding, you acknowledge your understanding of these terms and consent to the processing, storage, and analysis of your contract within our database.`}         
          handleAction={handleRedirect}
          actionButtonText="Yes, I acknowledge"
        />
      )}

    </div>
  );
}
