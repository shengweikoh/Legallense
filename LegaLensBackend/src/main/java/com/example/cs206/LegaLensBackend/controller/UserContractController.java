package com.example.cs206.LegaLensBackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.example.cs206.LegaLensBackend.service.UserContractService;
import com.example.cs206.LegaLensBackend.model.Clause;
import com.example.cs206.LegaLensBackend.model.Contract;
import com.example.cs206.LegaLensBackend.dto.ContractDetailsDTO;
import java.util.List;

@RestController
@RequestMapping("/api/users/{userId}/contracts")
public class UserContractController {

    @Autowired
    private UserContractService userContractService;

    @GetMapping("/{contractId}")
    public ResponseEntity<Object> getUserContractById(@PathVariable String userId, @PathVariable String contractId) {
        try {
            Contract contract = userContractService.getUserContractById(userId, contractId);
            return ResponseEntity.ok(contract);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body("Contract not found: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching contract: " + e.getMessage());
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadContract(@PathVariable String userId,
                                                  @RequestParam("file") MultipartFile file,
                                                  @RequestParam("contractName") String contractName) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("File is missing or empty.");
            }
            if (contractName == null || contractName.isBlank()) {
                return ResponseEntity.badRequest().body("Contract name is missing or empty.");
            }

            String contractId = userContractService.uploadContract(userId, file, contractName);
            return ResponseEntity.ok(contractId);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error uploading contract: " + e.getMessage());
        }
    }

    @PutMapping("/{contractId}/set-premium")
    public ResponseEntity<String> setContractToPremium(@PathVariable String userId, @PathVariable String contractId) {
        try {
            userContractService.setContractToPremium(userId, contractId);
            return ResponseEntity.ok("Contract set to premium successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error setting contract to premium: " + e.getMessage());
        }
    }

    @GetMapping("")
    public ResponseEntity<Object> getAllContractsForUser(@PathVariable String userId) {
        try {
            List<ContractDetailsDTO> contracts = userContractService.getAllContractsForUser(userId);
            return ResponseEntity.ok(contracts);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching contracts: " + e.getMessage());
        }
    }

    @PostMapping("/{contractId}/summarize")
    public ResponseEntity<List<Clause>>  summarizeContract(@PathVariable String userId, @PathVariable String contractId) {
        try {
            List<Clause> summary = userContractService.getUserContractSummary(userId, contractId);
            return ResponseEntity.ok(summary);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping("/{contractId}/review")
    public ResponseEntity<List<Clause>>  reviewContract(@PathVariable String userId, @PathVariable String contractId) {
        try {
            List<Clause> review = userContractService.getUserContractReview(userId, contractId);
            return ResponseEntity.ok(review);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/compare")
    public ResponseEntity<List<Clause>> compareContracts(@PathVariable String userId, @RequestParam String contractId1, @RequestParam String contractId2) {
        try {
            List<Clause> comparison = userContractService.getUserContractCompare(userId, contractId1, contractId2);
            return ResponseEntity.ok(comparison);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
