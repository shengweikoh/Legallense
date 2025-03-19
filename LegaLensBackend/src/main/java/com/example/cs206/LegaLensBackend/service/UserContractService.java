package com.example.cs206.LegaLensBackend.service;

import java.util.concurrent.ExecutionException;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.cs206.LegaLensBackend.model.Contract;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

import java.io.File;
import java.io.IOException;

@Service
public class UserContractService {

    private static final Logger log = Logger.getLogger(UserContractService.class.getName());

    @Autowired
    private Firestore firestore;

    public Contract getUserContractById(String userId, String contractId) throws Exception {
        log.info("Fetching contract with ID: " + contractId + " for user ID: " + userId);

        // Navigate to the specific contract document
        DocumentReference contractDocRef = firestore.collection("Users")
                                                     .document(userId)
                                                     .collection("Contracts")
                                                     .document(contractId);

        // Fetch the document
        ApiFuture<DocumentSnapshot> future = contractDocRef.get();
        DocumentSnapshot document = future.get();

        if (document.exists()) {
            log.info("Contract found: " + document.getData());
            // Map the Firestore document to the Contract object
            return document.toObject(Contract.class);
        } else {
            throw new IllegalArgumentException("Contract not found for ID: " + contractId);
        }
    }

    public String uploadContract(String userId, MultipartFile file, String contractName) throws Exception {
        log.info("Uploading new contract for user ID: " + userId);

        // Validate inputs
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File is missing or empty.");
        }
        if (contractName == null || contractName.isBlank()) {
            throw new IllegalArgumentException("Contract name is missing or empty.");
        }

        // Save the uploaded file to a temporary location
        File tempFile = File.createTempFile("uploaded-", ".pdf");
        file.transferTo(tempFile);

        // Extract text from the PDF
        String fullText;
        try (PDDocument document = PDDocument.load(tempFile)) {
            PDFTextStripper pdfStripper = new PDFTextStripper();
            fullText = pdfStripper.getText(document);
        } catch (IOException e) {
            throw new IllegalArgumentException("Failed to extract text from PDF: " + e.getMessage());
        }

        // Generate a unique ID for the contract
        DocumentReference docRef = firestore.collection("Users")
                                             .document(userId)
                                             .collection("Contracts")
                                             .document();
        String generatedId = docRef.getId();
        log.info("Generated contract ID: " + generatedId);

        // Create a Contract object
        Contract contract = new Contract();
        contract.setDocumentId(generatedId);
        contract.setContractName(contractName);
        contract.setFullText(fullText);
        contract.setPremiumPaid(false); // Default value
        contract.setSummary(""); // Placeholder for summary
        contract.setFlag(""); // Placeholder for flag
        contract.setSuggest(""); // Placeholder for suggestions

        // Save the contract to Firestore
        ApiFuture<WriteResult> future = docRef.set(contract);
        future.get(); // Wait for the operation to complete
        log.info("Contract " + generatedId + " uploaded successfully.");

        // Delete the temporary file
        tempFile.delete();

        return generatedId;
    }

    public void setContractToPremium(String userId, String contractId) {
        try {
            log.info("Setting contract with ID: " + contractId + " to premium.");

            // Retrieve the contract using UserContractService
            Contract contract = getUserContractById(userId, contractId);

            // Update the premiumPaid field
            contract.setPremiumPaid(true);

            // Save the updated contract to Firestore
            updateContractInFirestore(userId, contractId, contract);
            log.info("Contract with ID: " + contractId + " has been set to premium.");
        } catch (Exception e) {
            log.severe("Error setting contract to premium: " + e.getMessage());
            throw new RuntimeException(e); // Wrap checked exceptions in a RuntimeException
        }
    }

    public void updateContractInFirestore(String userId, String contractId, Contract contract) throws ExecutionException, InterruptedException {
        DocumentReference docRef = firestore.collection("Users")
                                             .document(userId)
                                             .collection("Contracts")
                                             .document(contractId);
        ApiFuture<WriteResult> future = docRef.set(contract);
        future.get(); // Wait for the operation to complete
        log.info("Contract with ID: " + contractId + " updated successfully.");
    }
}
