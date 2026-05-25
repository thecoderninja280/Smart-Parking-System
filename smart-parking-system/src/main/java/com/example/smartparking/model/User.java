package com.example.smartparking.model;

import com.example.smartparking.model.enums.Role;
import jakarta.persistence.*;
import lombok.Data;

@Entity(name = "users") // User is a reserved keyword in some SQL dialects
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;
}