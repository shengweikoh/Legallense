import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Pricing.css'; // optional CSS for custom styles

const PricingCard = ({ title, price, features, buttonText, isFeatured }) => (
  <div className={`card p-4 rounded-4 text-center shadow-sm ${isFeatured ? 'featured-card text-white' : ''}`}>
    <h4 className="mb-3 ">{title}</h4>
    <h1 className="fw-bold price1">${price}</h1>
    <p className="text-uppercase month">per month</p>
    <ul className="list-unstyled my-4">
      {features.map((feature, index) => (
        <li key={index} className="text-primary">• {feature}</li>
      ))}
    </ul>
    <button className="btn btn-primary w-100">
      {buttonText}
    </button>
  </div>
);

export default function Pricing() {
  return (
    <div className="container py-5">
      <div className="row g-4 justify-content-center">
        <div className="col-md-4">
          <PricingCard
            title="For Team"
            price="0"
            features={["15 Users", "Feature 2", "Feature 3", "Feature 4"]}
            buttonText="Upload Free →"
          />
        </div>
        <div className="col-md-4">
          <PricingCard
            title="Personal"
            price="29"
            features={["15 Users", "Feature 2", "Feature 3", "Feature 4"]}
            buttonText="Proceed Annually →"
            isFeatured={true}
          />
        </div>
        <div className="col-md-4">
          <PricingCard
            title="Business"
            price="59"
            features={["15 Users", "Feature 2", "Feature 3", "Feature 4"]}
            buttonText="Proceed Annually →"
          />
        </div>
      </div>
    </div>
  );
}