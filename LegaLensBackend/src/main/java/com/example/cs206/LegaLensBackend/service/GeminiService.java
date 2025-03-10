package com.example.cs206.LegaLensBackend.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.google.cloud.vertexai.generativeai.ContentMaker;
import com.google.cloud.vertexai.generativeai.GenerativeModel;
import com.google.cloud.vertexai.generativeai.ResponseStream;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GeminiService {

    private static final String PROJECT_ID = "cs206-453301";
    private static final String REGION = "us-central1";
    private static final String CREDENTIALS_FILE = "vertex-api-key.json"; // Ensure this file is inside `src/main/resources`

    public List<String> generateResponse(String prompt) throws IOException {
        // Load the credentials file from the classpath
        File credentialsFile = new ClassPathResource(CREDENTIALS_FILE).getFile();

		// Print the absolute path for debugging
		System.out.println("Credentials File Path: " + credentialsFile.getAbsolutePath());

        // Set environment variable for VertexAI to pick up credentials
        System.setProperty("GOOGLE_APPLICATION_CREDENTIALS", credentialsFile.getAbsolutePath());

        // Initialize VertexAI (automatically picks up credentials from environment)
        try (VertexAI vertexAi = new VertexAI(PROJECT_ID, REGION)) {
            GenerativeModel model = new GenerativeModel.Builder()
                    .setModelName("gemini-1.5-flash-001")
                    .setVertexAi(vertexAi)
                    .build();

            var content = ContentMaker.fromMultiModalData(prompt);
            ResponseStream<GenerateContentResponse> responseStream = model.generateContentStream(content);

            return responseStream.stream()
                    .map(GenerateContentResponse::toString)
                    .collect(Collectors.toList());
        }
    }
}