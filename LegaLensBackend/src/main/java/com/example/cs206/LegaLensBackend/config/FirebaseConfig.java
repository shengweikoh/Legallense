package com.example.cs206.LegaLensBackend.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Configuration
public class FirebaseConfig {

    // Inject the JSON content from the environment variable.
    @Value("${FIREBASE_SERVICE_ACCOUNT_KEY:}")
    private String firebaseCredentialsJson;

    @PostConstruct
    public void initFirebase() throws IOException {
        InputStream serviceAccount;

        if (firebaseCredentialsJson != null && !firebaseCredentialsJson.isEmpty()) {
            // Convert the JSON string to an InputStream using ByteArrayInputStream
            serviceAccount = new ByteArrayInputStream(firebaseCredentialsJson.getBytes(StandardCharsets.UTF_8));
        } else {
            // Fallback: load from the classpath for local development
            serviceAccount = getClass().getClassLoader().getResourceAsStream("serviceAccountKey.json");
            if (serviceAccount == null) {
                throw new IOException("Firebase serviceAccountKey.json not found in resources.");
            }
        }

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }
    }

    @Bean
    public Firestore fireStore() {
        return FirestoreClient.getFirestore();
    }
}