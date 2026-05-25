package com.example.smartparking.service;

import com.example.smartparking.dto.ReservationRequest;
import com.example.smartparking.model.ParkingSlot;
import com.example.smartparking.model.Reservation;
import com.example.smartparking.model.User;
import com.example.smartparking.model.enums.SlotStatus;
import com.example.smartparking.repository.ParkingSlotRepository;
import com.example.smartparking.repository.ReservationRepository;
import com.example.smartparking.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final ParkingSlotRepository parkingSlotRepository;
    private final UserRepository userRepository;

    public ReservationService(ReservationRepository reservationRepository, ParkingSlotRepository parkingSlotRepository, UserRepository userRepository) {
        this.reservationRepository = reservationRepository;
        this.parkingSlotRepository = parkingSlotRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Reservation createReservation(ReservationRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        ParkingSlot slot = parkingSlotRepository.findById(request.getParkingSlotId())
                .orElseThrow(() -> new EntityNotFoundException("Parking slot not found"));

        if (slot.getStatus() != SlotStatus.AVAILABLE) {
            throw new IllegalStateException("Parking slot is not available");
        }

        slot.setStatus(SlotStatus.RESERVED);
        parkingSlotRepository.save(slot);

        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setParkingSlot(slot);
        reservation.setStartTime(LocalDateTime.now());
        reservation.setEndTime(request.getEndTime());
        reservation.setStatus("PENDING_PAYMENT");

        return reservationRepository.save(reservation);
    }
    
    @Transactional
    public Reservation confirmReservationAndMockPayment(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
            .orElseThrow(() -> new EntityNotFoundException("Reservation not found"));
        
        // Mock payment successful
        reservation.setStatus("ACTIVE");
        
        // In a real scenario, you might also create a Payment record here.
        
        return reservationRepository.save(reservation);
    }

    public List<Reservation> getUserReservations(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        return reservationRepository.findByUser(user);
    }
}