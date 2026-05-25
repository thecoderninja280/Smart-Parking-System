package com.example.smartparking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminStatsDTO {
    private long totalSlots;
    private long availableSlots;
    private long occupiedSlots;
    private long maintenanceSlots;
    private long activeReservations;
    private long totalUsers;
}