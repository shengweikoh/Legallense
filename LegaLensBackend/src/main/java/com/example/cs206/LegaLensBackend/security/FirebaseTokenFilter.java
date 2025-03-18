package com.example.cs206.LegaLensBackend.security;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.Collections;

public class FirebaseTokenFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) 
                                    throws ServletException, IOException {
            String header = request.getHeader("Authorization");
            if (header != null && header.startsWith("Bearer")) {
                // Extract the token
                String idToken = header.substring(7);
                try {
                    FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
                    UsernamePasswordAuthenticationToken authentication = 
                    new UsernamePasswordAuthenticationToken(decodedToken.getUid(), null, Collections.emptyList());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } catch (Exception e) {
                    SecurityContextHolder.clearContext();
                    System.err.println("Firebase token verification failed: " + e.getMessage());
                }
            }
            filterChain.doFilter(request, response);
        }


}