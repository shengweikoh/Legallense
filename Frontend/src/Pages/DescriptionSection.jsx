import { useState, useRef } from "react";
import './DescriptionSection.css';
import { motion } from "framer-motion";

const sections = [
  {
    number: "01",
    title: "What we do",
    text:
      "LegaLens helps part-time job seekers in reviewing their contractual agreements during their employment processes. We solve the problem of the lack of knowledge in terms of legal jargon by providing an easy-to-use platform that simplifies contracts. LegaLens empowers job seekers to understand their rights and obligations and make informed decisions to protect themselves from unfair terms and legal pitfalls.",
  },
  {
    number: "02",
    title: "How we provide",
    text: [
      "Summarise contracts in simple terms",
      "Review contracts to highlight critical clauses that have missing information based on the Ministry of Manpower contract template",
      "Suggest better clauses to fix the issues with highlighted clauses, and provide explanations about the suggestions",
      "Compare two contracts to show pros and cons of each contract, helping users to decide which contract is more beneficial overall",
    ],
  },
  {
    number: "03",
    title: "Why choose us?",
    text:
      "Our AI model is trained using the standard contract template provided by the Ministry of Manpower and user feedback. This ensures the accuracy and relevance of responses, to give you peace of mind. Furthermore, we have a team of legal experts doing routine checks on responses to verify the responses generated for the four different functions.",
  },
  {
    number: "04",
    title: "Our Vision",
    text: "Empowering job-seekers, protecting individual rights",
  },
];

export default function DescriptionSections() { 
  const [openIndex, setOpenIndex] = useState(null);
  const leftRef = useRef([]);
  const rightRef = useRef([]);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {sections.map((section, index) => (
        <div className="description-container" key={index}>
          <div className="row align-items-center g-4">
            <div className="col-md-1 text-end">
              <div
                className="p-2 smoltitle"
                ref={(el) => rightRef.current.push(el)}
              >
                {section.number}/
              </div>
            </div>
            <div className="col-md-3">
              <button
                className="btn btn-link bigtitle text-start w-100"
                onClick={() => toggle(index)}
                ref={(el) => rightRef.current.push(el)}
              >
                {section.title}
              </button>
            </div>
            
            <div className="col-md-8 description" ref={(el) => leftRef.current.push(el)}>
            
              {openIndex === index && (
                <>
                  {section.number === "02" && Array.isArray(section.text) ? (
                    
                    <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2">
                        
                      {section.text.map((item, idx) => (
                        <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <li key={idx}>{item}</li>
                        </motion.div>
                      ))}

                    </ol>
                    
                  ) : (
                    <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p>{section.text}</p>
                    </motion.div>
                  )}
                </>
              )}
               
            </div>
          
          </div>
        </div>
      ))}
    </>
  );
}
