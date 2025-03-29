package com.example.cs206.LegaLensBackend.service;

import java.util.concurrent.ExecutionException;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.cs206.LegaLensBackend.model.Clause;
import com.example.cs206.LegaLensBackend.model.Contract;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;

import io.github.jonathanlink.PDFLayoutTextStripper;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;

import java.io.File;
import java.io.IOException;

import com.example.cs206.LegaLensBackend.dto.ContractDetailsDTO;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserContractService {

    private static final Logger log = Logger.getLogger(UserContractService.class.getName());

    @Autowired
    private Firestore firestore;

    @Autowired
    GeminiContractService geminiContractService;

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
            log.info("Contract found: " + contractId);
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
            PDFTextStripper pdfStripper = new PDFLayoutTextStripper();
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
        contract.setPremiumPaid(true); // Default value
        contract.setSummary(""); // Placeholder for summary
        contract.setReview(""); // Placeholder for review
        contract.setDateUploaded(); // Set the current date as a String

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

    public ContractDetailsDTO getContractDetails(String userId, String contractId) throws Exception {
        Contract contract = getUserContractById(userId, contractId);
        return new ContractDetailsDTO(
            contract.getContractName(),
            contract.getDocumentId(),
            contract.getDateUploaded(),
            contract.isPremiumPaid()
        );
    }

    public List<ContractDetailsDTO> getAllContractsForUser(String userId) throws Exception {
        log.info("Fetching all contracts for user ID: " + userId);

        // Navigate to the user's contracts collection
        CollectionReference contractsCollection = firestore.collection("Users")
                                                           .document(userId)
                                                           .collection("Contracts");

        // Fetch all documents in the contracts collection
        ApiFuture<QuerySnapshot> querySnapshot = contractsCollection.get();
        List<QueryDocumentSnapshot> documents = querySnapshot.get().getDocuments();

        // Map each document to a ContractDetailsDTO
        List<ContractDetailsDTO> contractDetailsList = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            Contract contract = document.toObject(Contract.class);
            ContractDetailsDTO contractDetailsDTO = new ContractDetailsDTO(
                contract.getContractName(),
                contract.getDocumentId(),
                contract.getDateUploaded(),
                contract.isPremiumPaid()
            );
            contractDetailsList.add(contractDetailsDTO);
        }

        log.info("Fetched " + contractDetailsList.size() + " contracts for user ID: " + userId);
        return contractDetailsList;
    }

    public List<Clause> getUserContractSummary(String userId, String contractId) throws Exception {
        Contract contract = getUserContractById(userId, contractId);
        String summary = contract.getSummary();
        if (summary == null || summary == "") {
            try {
                summary = geminiContractService.summarizeContract(contract.getFullText(), userId, contractId);
            } catch (RuntimeException ex) {
                log.severe("Error summarizing contract: " + ex.getMessage());
                throw ex;
            }
            
            // Update the summary field in Firestore
            contract.setSummary(summary);
            updateContractInFirestore(userId, contractId, contract);
        }
        String[] clauseSegments = summary.split(";;");
        List<Clause> clauses = new ArrayList<>();

        parseClauseSegments(clauseSegments, clauses);
        return clauses;
    }

    public  List<Clause> getUserContractReview(String userId, String contractId) throws Exception {
        Contract contract = getUserContractById(userId, contractId);
        String review = contract.getReview();
        if (review == null || review == "") {
            try {
                review = geminiContractService.reviewContract(contract.getFullText(), userId, contractId);
            } catch (RuntimeException ex) {
                log.severe("Error summarizing contract: " + ex.getMessage());
                throw ex;
            }
            
            // Update the review field in Firestore
            contract.setReview(review);
            updateContractInFirestore(userId, contractId, contract);
        }
        String[] clauseSegments = review.split(";;");
        List<Clause> clauses = new ArrayList<>();

        parseClauseSegments(clauseSegments, clauses);
        return clauses;
    }

    public List<Clause> getUserContractCompare(String userId, String contractId1, String contractId2) throws Exception {
        log.info("Comparing contracts with IDs: " + contractId1 + " and " + contractId2 + " for user ID: " + userId);
        // Retrieve the first contract
        Contract contract1 = getUserContractById(userId, contractId1);
        if (contract1 == null) {
            throw new IllegalArgumentException("Contract not found for ID: " + contractId1);
        }

        // Retrieve the second contract
        Contract contract2 = getUserContractById(userId, contractId2);
        if (contract2 == null) {
            throw new IllegalArgumentException("Contract not found for ID: " + contractId2);
        }

        try {
            String comparisonResult = geminiContractService.compareContracts(contract1.getSummary(), contract2.getSummary());
            String[] clauseSegments = comparisonResult.split(";;");
            List<Clause> clauses = new ArrayList<>();

            Clause clauseName = new Clause();
            clauseName.setClauseName("Contract Name");
            clauseName.setContent1(contract1.getContractName());
            clauseName.setContent2(contract2.getContractName());
            clauses.add(clauseName);

            parseClauseSegments(clauseSegments, clauses);
            return clauses;
        } catch (RuntimeException ex) {
            log.severe("Error comparing contracts: " + ex.getMessage());
            throw ex;
        }
    }

    private void parseClauseSegments(String[] clauseSegments, List<Clause> clauses) {
        for (String segment : clauseSegments) {
            segment = segment.trim();
            if (segment.isEmpty()) {
                continue;
            }
            
            if (segment.startsWith("[")) {
                segment = segment.substring(1);
            }
            if (segment.startsWith("\"[")) {
                segment = segment.substring(3);
            }
            if (segment.endsWith("]")) {
                segment = segment.substring(0, segment.length() - 1);
            }
            if (segment.endsWith("]\"")) {
                segment = segment.substring(0, segment.length() - 2);
            }
            
            String[] parts = segment.split("\\],\\s*\\[");
            Clause clause = new Clause();
            clause.setClauseName(parts[0].trim().replaceAll("\\s{2,}", " "));
            clause.setContent1(parts[1].trim().replaceAll("\\s{2,}", " "));
            if (parts.length > 2) {
                clause.setContent2(parts[2].trim().replaceAll("\\s{2,}", " "));
            }
            clauses.add(clause);
        }
    }
}
