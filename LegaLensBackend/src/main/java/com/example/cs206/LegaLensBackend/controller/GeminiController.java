package com.example.cs206.LegaLensBackend.controller;

import com.example.cs206.LegaLensBackend.service.GeminiService;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/gemini")
public class GeminiController {

    private final GeminiService geminiService;

    public GeminiController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/chat")
    public List<String> chatWithGemini(@RequestBody Map<String, String> request) throws IOException {
        String prompt = request.get("prompt");
        return geminiService.generateResponse(prompt);
    }
}