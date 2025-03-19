package com.example.cs206.LegaLensBackend.service;

import com.example.cs206.LegaLensBackend.model.Contract;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.google.cloud.vertexai.generativeai.ContentMaker;
import com.google.cloud.vertexai.generativeai.GenerativeModel;
import com.google.cloud.vertexai.generativeai.ResponseStream;
import org.springframework.core.io.ClassPathResource;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.io.IOException;
import java.io.File;
import java.io.FileInputStream;
import java.util.List;
import java.util.stream.Collectors;
import java.util.logging.Logger;

@Service
public class GeminiContractService {
    // The project ID will be loaded from the credentials file
    private final String projectId;
    private static final String REGION = "us-central1";
    private static final String CREDENTIALS_FILE = "vertex-api-key.json"; // Place this in src/main/resources

    private static final Logger log = Logger.getLogger(GeminiContractService.class.getName());

    @Autowired
    private UserContractService userContractService;

    // Constructor loads the credentials and extracts the project ID
    public GeminiContractService() throws IOException {
        // Load the credentials file from the classpath
        File credentialsFile = new ClassPathResource(CREDENTIALS_FILE).getFile();

        // Optionally set the GOOGLE_APPLICATION_CREDENTIALS system property
        System.setProperty("GOOGLE_APPLICATION_CREDENTIALS", credentialsFile.getAbsolutePath());

        // Load GoogleCredentials from the JSON file
        GoogleCredentials credentials = GoogleCredentials.fromStream(new FileInputStream(credentialsFile))
                .createScoped(List.of("https://www.googleapis.com/auth/cloud-platform"));

        // Ensure the credentials are a ServiceAccountCredentials instance to extract the project ID
        if (credentials instanceof ServiceAccountCredentials) {
            this.projectId = ((ServiceAccountCredentials) credentials).getProjectId();
        } else {
            throw new IllegalStateException("Credentials are not an instance of ServiceAccountCredentials");
        }
    }

    private String callGeminiApi(String endpoint, JsonObject payload) throws IOException {
        // Initialize VertexAI (it will pick up the credentials from the system property)
        try (VertexAI vertexAi = new VertexAI(projectId, REGION)) {
            GenerativeModel model = new GenerativeModel.Builder()
                    .setModelName("gemini-1.5-flash-001")
                    .setVertexAi(vertexAi)
                    .build();

            
            // Load the prompt from the JSON file located in resources/gemini-prompts/summary.json
            InputStream promptStream = getClass().getResourceAsStream("/gemini-prompts" + endpoint);
            if (promptStream == null) {
                throw new RuntimeException("Prompt file not found at /gemini-prompts" + endpoint);
            }
            InputStreamReader reader = new InputStreamReader(promptStream, StandardCharsets.UTF_8);
            JsonElement promptElement = JsonParser.parseReader(reader);

            // Add the prompt JSON to the payload (the key "prompt" can be adjusted as needed)
            payload.add("prompt", promptElement.getAsJsonObject());

            // Convert the JsonObject payload to a string representation
            String payloadString = payload.toString();

            var content = ContentMaker.fromMultiModalData(payloadString);
            ResponseStream<GenerateContentResponse> responseStream = model.generateContentStream(content);

            return responseStream.stream()
                    .flatMap(response -> response.getCandidatesList().stream()) // Get all candidates
                    .flatMap(candidate -> candidate.getContent().getPartsList().stream()) // Get all parts
                    .map(part -> part.getText()) // Extract text
                    .collect(Collectors.joining(" "));
        }
    }

    public String summarizeContract(String userId, String contractId) {
        try {
            log.info("Summarizing contract with ID: " + contractId + " for user ID: " + userId);

            // Retrieve the contract using UserContractService
            Contract contract = userContractService.getUserContractById(userId, contractId);

            // Prepare the payload for the Gemini API
            JsonObject payload = new JsonObject();

            // Now add the contract text to the payload
            payload.addProperty("contract", contract.getFullText());

            // Call the Gemini API
            String summary = callGeminiApi("/summary.json", payload);

            // Update the summary field in Firestore
            contract.setSummary(summary);
            userContractService.updateContractInFirestore(userId, contractId, contract);

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
            String highlights = callGeminiApi("/highlight.json", payload);

            // Update the flag field in Firestore
            contract.setFlag(highlights);
            userContractService.updateContractInFirestore(userId, contractId, contract);

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
            String suggestions = callGeminiApi("/suggest.json", payload);

            // Update the suggest field in Firestore
            contract.setSuggest(suggestions);
            userContractService.updateContractInFirestore(userId, contractId, contract);

            return suggestions;
        } catch (Exception e) {
            log.severe("Error suggesting contract: " + e.getMessage());
            throw new RuntimeException(e); // Wrap checked exceptions in a RuntimeException
        }
    }

    public String compareContracts(String userId, String contractId1, String contractId2) {
        try {
            log.info("Comparing contracts with IDs: " + contractId1 + " and " + contractId2 + " for user ID: " + userId);

            // Retrieve the first contract using UserContractService
            Contract contract1 = userContractService.getUserContractById(userId, contractId1);
            if (contract1 == null) {
                throw new IllegalArgumentException("Contract not found for ID: " + contractId1);
            }

            // Retrieve the second contract using UserContractService
            Contract contract2 = userContractService.getUserContractById(userId, contractId2);
            if (contract2 == null) {
                throw new IllegalArgumentException("Contract not found for ID: " + contractId2);
            }

            // Combine the summaries of both contracts
            String comparisonResult = "Comparison of Contracts:\n\n" +
                    "Contract 1 Name: " + contract1.getContractName() + "\n" +
                    "Contract 1 Summary:\n" + contract1.getSummary() + "\n\n" +
                    "Contract 2 Name: " + contract2.getContractName() + "\n" +
                    "Contract 2 Summary:\n" + contract2.getSummary();

            log.info("Comparison completed for contracts with IDs: " + contractId1 + " and " + contractId2);

            return comparisonResult;
        } catch (Exception e) {
            log.severe("Error comparing contracts: " + e.getMessage());
            throw new RuntimeException(e); // Wrap checked exceptions in a RuntimeException
        }
    }
}
