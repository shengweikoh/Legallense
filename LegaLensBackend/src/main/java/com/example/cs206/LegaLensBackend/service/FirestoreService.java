// filepath: /Users/weiqichua/Documents/y3s2/cs206/Legallense/LegaLensBackend/src/main/java/com/example/cs206/LegaLensBackend/service/YourFirestoreService.java
package com.example.cs206.LegaLensBackend.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FirestoreService {
    private final Firestore firestore;

    @Autowired
    public FirestoreService(Firestore firestore) {
        this.firestore = firestore;
    }

    // Method to test connectivity to Firestore
    public void testConnection() {
        try {
            CollectionReference users = firestore.collection("Users");
            // Get all documents in the collection (if collection exists)
            ApiFuture<QuerySnapshot> snapshot = users.get();
            int count = snapshot.get().size();
            System.out.println("Firestore connected! 'Users' collection has " + count + " documents.");
        } catch (Exception e) {
            System.err.println("Error connecting to Firestore: " + e.getMessage());
        }
    }    
}
