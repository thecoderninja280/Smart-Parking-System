package com.example.smartparking.controller;

import com.example.smartparking.dto.AuthRequest;
import com.example.smartparking.dto.AuthResponse;
import com.example.smartparking.dto.RegisterRequest;
import com.example.smartparking.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map; // <-- Import statement added

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest authRequest) {
        return ResponseEntity.ok(authService.login(authRequest));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        authService.register(registerRequest);
        // THIS IS THE CORRECTED PART - Return a JSON object instead of a plain string
        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }
}