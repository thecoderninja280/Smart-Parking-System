package com.example.smartparking.repository;

import com.example.smartparking.model.ParkingSlot;
import com.example.smartparking.model.enums.SlotStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParkingSlotRepository extends JpaRepository<ParkingSlot, Long> {
    long countByStatus(SlotStatus status);
}