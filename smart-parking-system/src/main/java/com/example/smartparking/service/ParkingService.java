package com.example.smartparking.service;

import com.example.smartparking.model.ParkingSlot;
import com.example.smartparking.repository.ParkingSlotRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ParkingService {

    private final ParkingSlotRepository parkingSlotRepository;

    public ParkingService(ParkingSlotRepository parkingSlotRepository) {
        this.parkingSlotRepository = parkingSlotRepository;
    }

    public List<ParkingSlot> getAllSlots() {
        return parkingSlotRepository.findAll();
    }
}