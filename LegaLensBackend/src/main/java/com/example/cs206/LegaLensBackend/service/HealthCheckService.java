package com.example.cs206.LegaLensBackend.service;

import org.springframework.stereotype.Service;

@Service
public class HealthCheckService {

    public String getHealthStatus() {
        return "Service is up and running!";
    }
}