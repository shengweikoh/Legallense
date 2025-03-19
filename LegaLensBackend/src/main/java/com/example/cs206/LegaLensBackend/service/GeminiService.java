package com.example.cs206.LegaLensBackend.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.google.cloud.vertexai.generativeai.ContentMaker;
import com.google.cloud.vertexai.generativeai.GenerativeModel;
import com.google.cloud.vertexai.generativeai.ResponseStream;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GeminiService {

    private final String projectId;
    private static final String REGION = "us-central1";
    private static final String DEFAULT_CREDENTIALS_FILE = "vertex-api-key.json";

    public GeminiService(@Value("${VERTEX_API_KEY:}") String vertexApiKeyJson) throws IOException {
        InputStream credentialsStream;

        if (vertexApiKeyJson != null && !vertexApiKeyJson.isEmpty()) {
            credentialsStream = new ByteArrayInputStream(vertexApiKeyJson.getBytes(StandardCharsets.UTF_8));
        } else {
            // Fallback for local development: load from the classpath
            File credentialsFile = new ClassPathResource(DEFAULT_CREDENTIALS_FILE).getFile();
            credentialsStream = new FileInputStream(credentialsFile);
        }

        GoogleCredentials credentials = GoogleCredentials.fromStream(credentialsStream)
                .createScoped(List.of("https://www.googleapis.com/auth/cloud-platform"));

        if (credentials instanceof ServiceAccountCredentials) {
            this.projectId = ((ServiceAccountCredentials) credentials).getProjectId();
        } else {
            throw new IllegalStateException("Credentials are not an instance of ServiceAccountCredentials");
        }
    }

    public String generateResponse(String prompt) throws IOException {
        GoogleCredentials.getApplicationDefault();
        try (VertexAI vertexAi = new VertexAI(projectId, REGION)) {
            GenerativeModel model = new GenerativeModel.Builder()
                    .setModelName("gemini-1.5-flash-001")
                    .setVertexAi(vertexAi)
                    .build();

            var content = ContentMaker.fromMultiModalData(prompt);
            ResponseStream<GenerateContentResponse> responseStream = model.generateContentStream(content);

            return responseStream.stream()
                    .flatMap(response -> response.getCandidatesList().stream())
                    .flatMap(candidate -> candidate.getContent().getPartsList().stream())
                    .map(part -> part.getText())
                    .collect(Collectors.joining(" "));
        }
    }
}