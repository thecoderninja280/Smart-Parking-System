package com.example.smartparking.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class AuthRequest {
    @NotEmpty @Email
    private String email;
    @NotEmpty
    private String password;
}