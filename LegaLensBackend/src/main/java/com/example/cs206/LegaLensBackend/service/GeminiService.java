package com.example.cs206.LegaLensBackend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import jakarta.annotation.PostConstruct;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.List;

@Service
public class GeminiService {
    
    private final WebClient webClient;
    @Value("${gemini.api.key}")
    private String apiKey;
    private String API_URL;

    public GeminiService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl(API_URL).build();
    }

    @PostConstruct
    public void init() {
        this.API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" + apiKey;
    }

    public Mono<String> getGeminiResponse(String prompt) {
        System.out.println(apiKey);
        System.out.println(API_URL);
        return webClient.post()
                .bodyValue(Map.of(
                    "contents", List.of(Map.of(
                        "parts", List.of(Map.of("text", prompt))
                    ))
                ))
                .retrieve()
                .bodyToMono(String.class);
    }
}