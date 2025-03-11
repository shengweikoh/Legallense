package com.example.cs206.LegaLensBackend.controller;

import com.example.cs206.LegaLensBackend.service.GeminiService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/gemini")
public class GeminiController {

    private final GeminiService geminiService;

    public GeminiController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/chat")
    public ResponseEntity<String> chatWithGemini(@RequestBody Map<String, String> requestBody) {
        try {
            String prompt = requestBody.get("prompt");
            String responseText = geminiService.generateResponse(prompt);
            
            return ResponseEntity.ok(responseText);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Error processing request: " + e.getMessage());
        }
    }

}