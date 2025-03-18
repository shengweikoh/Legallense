package com.example.cs206.LegaLensBackend.service;

import com.example.cs206.LegaLensBackend.model.Contract;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.WriteResult;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import com.google.cloud.firestore.Firestore;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.ExecutionException;
import java.util.logging.Logger;

@Service
public class ContractService {

    private static final Logger log = Logger.getLogger(ContractService.class.getName());

    @Autowired
    private Firestore firestore;

    @Autowired
    private UserContractService userContractService;

    private final String geminiApiUrl = "https://api.gemini.com/v1/contract";

    public void setContractToPremium(String userId, String contractId) {
        try {
            log.info("Setting contract with ID: " + contractId + " to premium.");

            // Retrieve the contract using UserContractService
            Contract contract = userContractService.getUserContractById(userId, contractId);

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

    public String summarizeContract(String userId, String contractId) {
        try {
            log.info("Summarizing contract with ID: " + contractId + " for user ID: " + userId);

            // Retrieve the contract using UserContractService
            Contract contract = userContractService.getUserContractById(userId, contractId);

            // Prepare the payload for the Gemini API
            JsonObject payload = new JsonObject();
            payload.addProperty("contract", contract.getFullText());

            // Call the Gemini API
            String summary = callGeminiApi("/summarize", payload);

            // Update the summary field in Firestore
            contract.setSummary(summary);
            updateContractInFirestore(userId, contractId, contract);

            return summary;
        } catch (Exception e) {
            log.severe("Error summarizing contract: " + e.getMessage());
            throw new RuntimeException(e); // Wrap checked exceptions in a RuntimeException
        }
    }

    public String highlightContract(String userId, String contractId) {
        try {
            log.info("Highlighting contract with ID: " + contractId + " for user ID: " + userId);

            // Retrieve the contract using UserContractService
            Contract contract = userContractService.getUserContractById(userId, contractId);

            // Check if the contract is marked as premium
            if (!contract.isPremiumPaid()) {
                throw new IllegalArgumentException("Contract is not marked as premium: " + contractId);
            }

            // Prepare the payload for the Gemini API
            JsonObject payload = new JsonObject();
            payload.addProperty("contract", contract.getFullText());

            // Call the Gemini API
            String highlights = callGeminiApi("/highlight", payload);

            // Update the flag field in Firestore
            contract.setFlag(highlights);
            updateContractInFirestore(userId, contractId, contract);

            return highlights;
        } catch (Exception e) {
            log.severe("Error highlighting contract: " + e.getMessage());
            throw new RuntimeException(e); // Wrap checked exceptions in a RuntimeException
        }
    }

    public String suggestContract(String userId, String contractId) {
        try {
            log.info("Suggesting changes for contract with ID: " + contractId + " for user ID: " + userId);

            // Retrieve the contract using UserContractService
            Contract contract = userContractService.getUserContractById(userId, contractId);

            // Check if the contract is marked as premium
            if (!contract.isPremiumPaid()) {
                throw new IllegalArgumentException("Contract is not marked as premium: " + contractId);
            }

            // Prepare the payload for the Gemini API
            JsonObject payload = new JsonObject();
            payload.addProperty("contract", contract.getFullText());

            // Call the Gemini API
            String suggestions = callGeminiApi("/suggest", payload);

            // Update the suggest field in Firestore
            contract.setSuggest(suggestions);
            updateContractInFirestore(userId, contractId, contract);

            return suggestions;
        } catch (Exception e) {
            log.severe("Error suggesting contract: " + e.getMessage());
            throw new RuntimeException(e); // Wrap checked exceptions in a RuntimeException
        }
    }

    private String callGeminiApi(String endpoint, JsonObject payload) throws IOException {
        URL url = new URL(geminiApiUrl + endpoint);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setDoOutput(true);

        try (OutputStream os = connection.getOutputStream()) {
            os.write(payload.toString().getBytes("utf-8"));
        }

        int responseCode = connection.getResponseCode();
        if (responseCode == HttpURLConnection.HTTP_OK) {
            return new String(connection.getInputStream().readAllBytes(), "utf-8");
        } else {
            throw new IOException("Failed to call Gemini API: " + responseCode);
        }
    }

    private void updateContractInFirestore(String userId, String contractId, Contract contract) throws ExecutionException, InterruptedException {
        DocumentReference docRef = firestore.collection("Users")
                                             .document(userId)
                                             .collection("Contracts")
                                             .document(contractId);
        ApiFuture<WriteResult> future = docRef.set(contract);
        future.get(); // Wait for the operation to complete
        log.info("Contract with ID: " + contractId + " updated successfully.");
    }

    public String compareContracts(String userId, String contractId1, String contractId2) throws ExecutionException, InterruptedException {
        log.info("Comparing contracts with IDs: " + contractId1 + " and " + contractId2);

        // Retrieve the first contract from Firestore
        DocumentReference docRef1 = firestore.collection("Contracts").document(contractId1);
        Contract contract1 = docRef1.get().get().toObject(Contract.class);

        if (contract1 == null) {
            throw new IllegalArgumentException("Contract not found for ID: " + contractId1);
        }

        // Retrieve the second contract from Firestore
        DocumentReference docRef2 = firestore.collection("Contracts").document(contractId2);
        Contract contract2 = docRef2.get().get().toObject(Contract.class);

        if (contract2 == null) {
            throw new IllegalArgumentException("Contract not found for ID: " + contractId2);
        }

        // Combine the summaries of both contracts
        String comparisonResult = "Comparison of Contracts:\n\n" +
                "Contract 1 Summary:\n" + contract1.getSummary() + "\n\n" +
                "Contract 2 Summary:\n" + contract2.getSummary();

        log.info("Comparison completed for contracts with IDs: " + contractId1 + " and " + contractId2);

        return comparisonResult;
    }
}
