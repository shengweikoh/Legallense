package com.example.cs206.LegaLensBackend.config;

import com.example.cs206.LegaLensBackend.security.FirebaseTokenFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Disable CSRF since this is likely a stateless REST API.
            .csrf(csrf -> csrf.disable())

            // Define URL-authorization rules.
            .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/public/**").permitAll()  // Public endpoints.
                    .anyRequest().authenticated()
            )

            // Add our custom Firebase token filter before Spring Security's UsernamePasswordAuthenticationFilter.
            .addFilterBefore(new FirebaseTokenFilter(), UsernamePasswordAuthenticationFilter.class)
            
            // Enable HTTP Basic authentication if needed (or you can customize).
            .httpBasic(Customizer.withDefaults());
        
        return http.build();
    }
}