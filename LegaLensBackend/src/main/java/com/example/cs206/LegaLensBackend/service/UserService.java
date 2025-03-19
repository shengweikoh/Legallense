package com.example.cs206.LegaLensBackend.service;

import com.example.cs206.LegaLensBackend.model.User;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;

import java.util.Optional;

import org.springframework.stereotype.Service;
@Service
public class UserService {

    private final Firestore firestore;

    public UserService(Firestore firestore) {
        this.firestore = firestore;
    }

    public Optional<User> getUserById(String userId) throws Exception {
        DocumentSnapshot snapshot = firestore.collection("Users").document(userId).get().get();
        if (snapshot.exists()) {
            User user = snapshot.toObject(User.class);
            // System.out.println("Raw data: " + snapshot.getData());
            // System.out.println("Fetched user: " + user);
            return Optional.ofNullable(user);
        } else {
            return Optional.empty();
        }
    }
    
}
