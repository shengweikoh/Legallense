import 'bootstrap/dist/css/bootstrap.min.css';
import './Pricing.css'; // optional CSS for custom styles
import PropTypes from "prop-types";


const PricingCard = ({ title, price, features, isFeatured, textBelowPrice }) => (
  <div className={`card p-4 rounded-4 text-center shadow-sm ${isFeatured ? 'featured-card text-white' : ''}`}>
    <h4 className="mb-3 ">{title}</h4>
    <h1 className="fw-bold price1">${price}</h1>
    <p className="text-uppercase month">{textBelowPrice}</p>
    <ul className="list-unstyled my-4">
      {features.map((feature, index) => (
        <li key={index} className="text-primary">• {feature}</li>
      ))}
    </ul>
    
    {/* <button className="btn btn-primary w-100">
      {buttonText}
    </button> */}
  </div>
  
);



export default function Pricing() {
  return (
    <div className="container py-5">
      <div className="row g-4 justify-content-center">
        <div className="col-md-4">
          <PricingCard
            title="Free Plan"
            price="0"
            textBelowPrice="No limits on uploads"
            features={["Free access to summary", "Refer a friend for free upgrades"]}
            // buttonText="Upload Free →"
          />
        </div>
        <div className="col-md-4">
          <PricingCard
            title="Personal"
            price="1"
            features={["Access to summary", "Access to review", "Access to suggestions", "Access to comparisons"]}
            textBelowPrice="per upgrade"
            // buttonText="Proceed Annually →"
            // isFeatured={true}
          />
        </div>

        {/* <div className="col-md-4">
          <PricingCard
            title="Business"
            price="59"
            features={["15 Users", "Feature 2", "Feature 3", "Feature 4"]}
            // buttonText="Proceed Annually →"
          />
        </div> */}
      </div>
    </div>
  );

  
}


PricingCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  buttonText: PropTypes.string,
  isFeatured: PropTypes.bool,
  textBelowPrice: PropTypes.string,
}