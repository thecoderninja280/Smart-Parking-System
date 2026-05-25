package com.example.smartparking.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReservationRequest {
    @NotNull
    private Long parkingSlotId;
    @NotNull @Future
    private LocalDateTime endTime;
}