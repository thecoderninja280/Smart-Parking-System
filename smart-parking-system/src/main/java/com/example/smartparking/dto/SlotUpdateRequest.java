package com.example.smartparking.dto;

import com.example.smartparking.model.enums.SlotStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SlotUpdateRequest {
    @NotNull
    private SlotStatus status;
}