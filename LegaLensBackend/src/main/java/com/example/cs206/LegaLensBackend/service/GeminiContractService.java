package com.example.cs206.LegaLensBackend.service;

import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Value;
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
import java.io.ByteArrayInputStream;
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
    private static final String DEFAULT_CREDENTIALS_FILE = "vertex-api-key.json"; // Place this in src/main/resources

    private static final Logger log = Logger.getLogger(GeminiContractService.class.getName());

    // The constructor now accepts an environment variable for production override.
    public GeminiContractService(@Value("${VERTEX_API_KEY:}") String vertexApiKeyJson) throws IOException {
        InputStream credentialsStream;

        if (vertexApiKeyJson != null && !vertexApiKeyJson.isEmpty()) {
            // Use the provided JSON from the environment variable.
            credentialsStream = new ByteArrayInputStream(vertexApiKeyJson.getBytes(StandardCharsets.UTF_8));
        } else {
            // Fallback for local development: load from the classpath.
            File credentialsFile = new ClassPathResource(DEFAULT_CREDENTIALS_FILE).getFile();
            credentialsStream = new FileInputStream(credentialsFile);
        }

        // Load credentials from the stream.
        GoogleCredentials credentials = GoogleCredentials.fromStream(credentialsStream)
                .createScoped(List.of("https://www.googleapis.com/auth/cloud-platform"));

        if (credentials instanceof ServiceAccountCredentials) {
            this.projectId = ((ServiceAccountCredentials) credentials).getProjectId();
        } else {
            throw new IllegalStateException("Credentials are not an instance of ServiceAccountCredentials");
        }
    }

    private String callGeminiApi(String endpoint, JsonObject payload) throws IOException {
        GoogleCredentials.getApplicationDefault();
        // Initialize VertexAI (it will pick up the credentials from the system property)
        try (VertexAI vertexAi = new VertexAI(projectId, REGION)) {
            GenerativeModel model = new GenerativeModel.Builder()
                    .setModelName("gemini-2.0-flash-001")
                    .setVertexAi(vertexAi)
                    .build();

            
            // Load the prompt from the JSON file located in resources/gemini-prompts
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

    public String summarizeContract(String contract, String userId, String contractId) {
        try {
            log.info("Summarizing contract with ID: " + contractId + " for user ID: " + userId);

            // Prepare the payload for the Gemini API
            JsonObject payload = new JsonObject();

            // Now add the contract text to the payload
            payload.addProperty("contract", contract);

            // Call the Gemini API
            String summary = callGeminiApi("/summary.json", payload);

            return summary;
        } catch (Exception e) {
            log.severe("Error summarizing contract: " + e.getMessage());
            throw new RuntimeException(e); // Wrap checked exceptions in a RuntimeException
        }
    }

    public String reviewContract(String contract, String userId, String contractId) {
        try {
            log.info("Reviewing changes for contract with ID: " + contractId + " for user ID: " + userId);

            // Prepare the payload for the Gemini API
            JsonObject payload = new JsonObject();
            payload.addProperty("contract", contract);

            // Call the Gemini API
            String review = callGeminiApi("/review.json", payload);

            return review;
        } catch (Exception e) {
            log.severe("Error reviewing contract: " + e.getMessage());
            throw new RuntimeException(e); // Wrap checked exceptions in a RuntimeException
        }
    }

    public String compareContracts(String contract1, String contract2) {
        try {
            // Prepare the payload for the Gemini API
            JsonObject payload = new JsonObject();

            payload.addProperty("contract1", contract1);
            payload.addProperty("contract2", contract2);

            String compare = callGeminiApi("/compare.json", payload);

            return compare;
        } catch (Exception e) {
            log.severe("Error comparing contracts: " + e.getMessage());
            throw new RuntimeException(e); // Wrap checked exceptions in a RuntimeException
        }
    }
}
