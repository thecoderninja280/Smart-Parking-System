package com.example.smartparking.controller;

import com.example.smartparking.dto.ReservationRequest;
import com.example.smartparking.model.Reservation;
import com.example.smartparking.service.ReservationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/user")
@PreAuthorize("hasRole('USER')")
public class UserController {

    private final ReservationService reservationService;

    public UserController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping("/reservations")
    public ResponseEntity<Reservation> createReservation(@Valid @RequestBody ReservationRequest request, Principal principal) {
        Reservation reservation = reservationService.createReservation(request, principal.getName());
        // In a real app, you would now integrate with a payment gateway.
        // For this mock, we'll just confirm it and mock the payment.
        Reservation confirmedReservation = reservationService.confirmReservationAndMockPayment(reservation.getId());
        return ResponseEntity.ok(confirmedReservation);
    }

    @GetMapping("/reservations/me")
    public ResponseEntity<List<Reservation>> getMyReservations(Principal principal) {
        return ResponseEntity.ok(reservationService.getUserReservations(principal.getName()));
    }
}