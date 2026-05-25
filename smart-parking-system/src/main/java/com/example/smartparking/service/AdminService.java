package com.example.smartparking.service;

import com.example.smartparking.dto.AdminStatsDTO;
import com.example.smartparking.model.ParkingSlot;
import com.example.smartparking.model.enums.SlotStatus;
import com.example.smartparking.repository.ParkingSlotRepository;
import com.example.smartparking.repository.ReservationRepository;
import com.example.smartparking.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminService {

    private final ParkingSlotRepository parkingSlotRepository;
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;

    public AdminService(ParkingSlotRepository parkingSlotRepository, ReservationRepository reservationRepository, UserRepository userRepository) {
        this.parkingSlotRepository = parkingSlotRepository;
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
    }

    public AdminStatsDTO getDashboardStats() {
        long totalSlots = parkingSlotRepository.count();
        long availableSlots = parkingSlotRepository.countByStatus(SlotStatus.AVAILABLE);
        long occupiedSlots = parkingSlotRepository.countByStatus(SlotStatus.OCCUPIED) + parkingSlotRepository.countByStatus(SlotStatus.RESERVED);
        long maintenanceSlots = parkingSlotRepository.countByStatus(SlotStatus.MAINTENANCE);
        long activeReservations = reservationRepository.countByStatus("ACTIVE");
        long totalUsers = userRepository.count();

        return new AdminStatsDTO(totalSlots, availableSlots, occupiedSlots, maintenanceSlots, activeReservations, totalUsers);
    }

    @Transactional
    public ParkingSlot updateSlotStatus(Long slotId, SlotStatus status) {
        ParkingSlot slot = parkingSlotRepository.findById(slotId)
                .orElseThrow(() -> new EntityNotFoundException("Parking slot not found"));
        slot.setStatus(status);
        return parkingSlotRepository.save(slot);
    }
}