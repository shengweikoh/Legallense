package com.example.cs206.LegaLensBackend.controller;

import com.example.cs206.LegaLensBackend.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/api/gemini")
public class GeminiController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping("/chat")
    public Mono<String> chatWithGemini(@RequestBody Map<String, String> requestBody) {
        String prompt = requestBody.get("prompt");
        return geminiService.getGeminiResponse(prompt);
    }
}