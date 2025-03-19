package com.example.cs206.LegaLensBackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.cs206.LegaLensBackend.service.HealthCheckService;

@RestController
public class HealthCheckController {

    private final HealthCheckService healthCheckService;

    public HealthCheckController(HealthCheckService healthCheckService) {
        this.healthCheckService = healthCheckService;
    }

    @GetMapping("/health")
    public String checkHealth() {
        return healthCheckService.getHealthStatus();
    }
}