import PropTypes from "prop-types";
import "./ContractCard.css";

/* ContractCard.jsx */
export const ContractCard = ({ contract, onClick, isSelected, buttonText = "Compare Contract" }) => {
  return (
    <div
      className="card mb-4 shadow-sm mx-auto card-height" // add 'card-height'
      style={{
        cursor: "pointer",
        padding: "20px"
      }}
      onClick={onClick}
    >
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{contract.contractName}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Analyzed on {contract.dateUploaded}
          </h6>
        </div>
        <button
          className={`btn w-100 ${isSelected ? "btn-primary" : "btn-outline-dark"}`}
          disabled={isSelected}
        >
          {isSelected ? "Selected" : buttonText}
        </button>
      </div>
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
  };