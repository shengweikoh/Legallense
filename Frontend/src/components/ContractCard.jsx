import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

/* ContractCard.jsx */
export const ContractCard = ({
  contract,
  onClick,
  isSelected,
  buttonText = "Compare Contract",
  compareLink,
}) => {
  return (
    <div
      className="card mb-0 shadow-sm mx-auto card-height" // add 'card-height'
      style={{
        cursor: "pointer",
        padding: "10px",
        flexDirection: "column",
        flexGrow: 1,
      }}
      onClick={onClick}
    >
      <div className="card-body d-flex flex-column justify-content-between" style = {{flexGrow: 1}}>
        <div style = {{flexGrow: 1}}>
          <h5 className="card-title" style={{ fontSize: "1rem" }}>
            {contract.contractName}
          </h5>
          <h6
            className="card-subtitle mb-2 text-muted"
            style={{ fontSize: "0.8rem" }}
          >
            Analyzed on {contract.dateUploaded}
          </h6>
        </div>
        <button
          className={`btn w-100 ${
            isSelected ? "btn-primary" : "btn-outline-dark"
          }`}
          disabled={isSelected}
          style={{ fontSize: "0.8rem", padding: "5px 0" }}
        >
          {isSelected ? "Selected" : buttonText}
        </button>
      </div>

      {isSelected && compareLink && (
        <div
          className="card-footer text-center mt-auto"
          style={{ backgroundColor: "transparent", border: "none", display: "flex", justifyContent: "center" }}
        >
          <Link to={compareLink}>
            <Button variant="outlined" color="primary" size="large" sx = {{whiteSpace: "nowrap"}}>
              Confirm
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

ContractCard.propTypes = {
  contract: PropTypes.shape({
    documentId: PropTypes.string.isRequired,
    contractName: PropTypes.string.isRequired,
    dateUploaded: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool,
  buttonText: PropTypes.string,
  compareLink: PropTypes.string,
};
