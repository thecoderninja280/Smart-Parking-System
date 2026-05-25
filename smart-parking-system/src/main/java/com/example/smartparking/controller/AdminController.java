package com.example.smartparking.controller;

import com.example.smartparking.dto.AdminStatsDTO;
import com.example.smartparking.dto.SlotUpdateRequest;
import com.example.smartparking.model.ParkingSlot;
import com.example.smartparking.service.AdminService;
import com.example.smartparking.service.ParkingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;
    private final ParkingService parkingService;

    public AdminController(AdminService adminService, ParkingService parkingService) {
        this.adminService = adminService;
        this.parkingService = parkingService;
    }

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsDTO> getStats() {
        return ResponseEntity.ok(adminService.getDashboardStats());
    }

    @GetMapping("/slots")
    public ResponseEntity<List<ParkingSlot>> getAllSlots() {
        return ResponseEntity.ok(parkingService.getAllSlots());
    }
    
    @PutMapping("/slots/{id}")
    public ResponseEntity<ParkingSlot> updateSlotStatus(@PathVariable Long id, @Valid @RequestBody SlotUpdateRequest request) {
        ParkingSlot updatedSlot = adminService.updateSlotStatus(id, request.getStatus());
        return ResponseEntity.ok(updatedSlot);
    }
}