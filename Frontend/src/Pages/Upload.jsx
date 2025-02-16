import React, { useState } from 'react';
import "./Upload.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


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

    <div className="container-fluid min-vh-100 custom-bg">
  <div className="row justify-content-center align-items-center" style={{ height: "100%" }}>
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
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-upload me-2"></i>
                      Upload
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
      </motion.div>
    </div>
  </div>

  <div className="row m-5">
  <div className="col-12">
    <div className="d-flex justify-content-center">
      <div className="card contractdetails">
        <div className="card-header">
          <h5 className="card-title">Contract Details</h5>
        </div>
        <div className="card-body">
         
  <div className="overflow-auto" style={{ height: "270px",border: "1px solid #ddd", padding: "10px" }}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur.\
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur.
  </div>
</div>

         
      </div>
    </div>
  </div>
  
</div>

<Link to="/analysis" className="btn btn-primary text-white text-decoration-none Analyze2">
  Analysis
</Link>



 

</div>






   
  );
}