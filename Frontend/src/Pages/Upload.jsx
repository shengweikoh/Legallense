import React, { useState } from 'react';
import "./Upload.css";

export default function UploadContract() {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileChange = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    setIsAnalyzing(true);
    // Simulate a delay (e.g., for uploading and analysis)
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsAnalyzing(false);
    // Reset the file input after analysis
    setFile(null);
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center custom-bg" >
      <div className="card mx-auto" style={{ maxWidth: '2000px' }}>
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
               
              >
                {isAnalyzing ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Analyzing...
                  </>
                ) : (
                  <>
                    {/* Optional: If you're using Bootstrap Icons, ensure you have them installed and imported */}
                    <i className="bi bi-upload me-2"></i>
                    Analyze
                  </>
                )}
              </button>
            </div>
            {file && (
              <small className="text-muted">Selected file: {file.name}</small>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}