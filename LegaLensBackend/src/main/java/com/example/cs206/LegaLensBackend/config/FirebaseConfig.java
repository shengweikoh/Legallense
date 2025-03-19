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
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FirebaseConfig {

    // Inject environment variable; defaults to empty string if not set.
    @Value("${FIREBASE_SERVICE_ACCOUNT_KEY:}")
    private String firebaseCredentialsPath;

    @PostConstruct
    public void initFirebase() throws IOException {
        InputStream serviceAccount;

        // If the environment variable is set, load from the provided file path.
        if (firebaseCredentialsPath != null && !firebaseCredentialsPath.isEmpty()) {
            serviceAccount = new FileInputStream(firebaseCredentialsPath);
        } else {
            // Otherwise, load from the resources folder for local development.
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