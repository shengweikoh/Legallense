package com.example.cs206.LegaLensBackend.controller;

import com.example.cs206.LegaLensBackend.service.GeminiContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users/{userId}/contracts")
public class GeminiContractController {

    @Autowired
    private GeminiContractService geminiContractService;

    @PutMapping("/{contractId}/summarize")
    public ResponseEntity<String> summarizeContract(@PathVariable String userId, @PathVariable String contractId) {
        try {
            String summary = geminiContractService.summarizeContract(userId, contractId);
            return ResponseEntity.ok(summary);
        } catch (Exception e) {

            return ResponseEntity.status(500).body("Error summarizing contract: " + e.getMessage());
        }
    }

    @PutMapping("/{contractId}/highlight")
    public ResponseEntity<String> highlightContract(@PathVariable String userId, @PathVariable String contractId) {
        try {
            String highlights = geminiContractService.highlightContract(userId, contractId);
            return ResponseEntity.ok(highlights);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error highlighting contract: " + e.getMessage());
        }
    }

    @PutMapping("/{contractId}/suggest")
    public ResponseEntity<String> suggestContract(@PathVariable String userId, @PathVariable String contractId) {
        try {
            String suggestions = geminiContractService.suggestContract(userId, contractId);
            return ResponseEntity.ok(suggestions);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error suggesting contract: " + e.getMessage());
        }
    }

    @GetMapping("/compare")
    public ResponseEntity<String> compareContracts(@PathVariable String userId, @RequestParam String contractId1, @RequestParam String contractId2) {
        try {
            String comparison = geminiContractService.compareContracts(userId, contractId1, contractId2);
            return ResponseEntity.ok(comparison);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error comparing contracts: " + e.getMessage());
        }
    }
}
