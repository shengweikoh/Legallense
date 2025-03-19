package com.example.cs206.LegaLensBackend.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.google.cloud.vertexai.generativeai.ContentMaker;
import com.google.cloud.vertexai.generativeai.GenerativeModel;
import com.google.cloud.vertexai.generativeai.ResponseStream;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GeminiService {

    // The project ID will be loaded from the credentials file
    private final String projectId;
    private static final String REGION = "us-central1";
    private static final String CREDENTIALS_FILE = "vertex-api-key.json"; // Place this in src/main/resources

    // Constructor loads the credentials and extracts the project ID
    public GeminiService() throws IOException {
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

    public String generateResponse(String prompt) throws IOException {
        // Initialize VertexAI (it will pick up the credentials from the system property)
        try (VertexAI vertexAi = new VertexAI(projectId, REGION)) {
            GenerativeModel model = new GenerativeModel.Builder()
                    .setModelName("gemini-1.5-flash-001")
                    .setVertexAi(vertexAi)
                    .build();

            var content = ContentMaker.fromMultiModalData(prompt);
            ResponseStream<GenerateContentResponse> responseStream = model.generateContentStream(content);

            return responseStream.stream()
                    .flatMap(response -> response.getCandidatesList().stream()) // Get all candidates
                    .flatMap(candidate -> candidate.getContent().getPartsList().stream()) // Get all parts
                    .map(part -> part.getText()) // Extract text
                    .collect(Collectors.joining(" "));
        }
    }
}