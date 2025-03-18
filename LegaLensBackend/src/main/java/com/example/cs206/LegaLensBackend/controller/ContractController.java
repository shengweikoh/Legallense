package com.example.cs206.LegaLensBackend.controller;

import com.example.cs206.LegaLensBackend.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/users/{userId}/contracts")
public class ContractController {

    @Autowired
    private ContractService contractService;

    @PutMapping("/{contractId}/set-premium")
    public ResponseEntity<String> setContractToPremium(@PathVariable String userId, @PathVariable String contractId) {
        try {
            contractService.setContractToPremium(userId, contractId);
            return ResponseEntity.ok("Contract set to premium successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error setting contract to premium: " + e.getMessage());
        }
    }

    @PutMapping("/{contractId}/summarize")
    public ResponseEntity<String> summarizeContract(@PathVariable String userId, @PathVariable String contractId) {
        try {
            String summary = contractService.summarizeContract(userId, contractId);
            return ResponseEntity.ok(summary);
        } catch (Exception e) {

            return ResponseEntity.status(500).body("Error summarizing contract: " + e.getMessage());
        }
    }

    @PutMapping("/{contractId}/highlight")
    public ResponseEntity<String> highlightContract(@PathVariable String userId, @PathVariable String contractId) {
        try {
            String highlights = contractService.highlightContract(userId, contractId);
            return ResponseEntity.ok(highlights);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error highlighting contract: " + e.getMessage());
        }
    }

    @PutMapping("/{contractId}/suggest")
    public ResponseEntity<String> suggestContract(@PathVariable String userId, @PathVariable String contractId) {
        try {
            String suggestions = contractService.suggestContract(userId, contractId);
            return ResponseEntity.ok(suggestions);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error suggesting contract: " + e.getMessage());
        }
    }

    @GetMapping("/compare")
    public ResponseEntity<String> compareContracts(@PathVariable String userId, @RequestParam String contractId1, @RequestParam String contractId2) {
        try {
            String comparison = contractService.compareContracts(userId, contractId1, contractId2);
            return ResponseEntity.ok(comparison);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error comparing contracts: " + e.getMessage());
        }
    }
}
