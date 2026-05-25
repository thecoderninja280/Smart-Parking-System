package com.example.smartparking.model;

import com.example.smartparking.model.enums.SlotStatus;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ParkingSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String slotNumber;

    private int floor;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SlotStatus status;
}