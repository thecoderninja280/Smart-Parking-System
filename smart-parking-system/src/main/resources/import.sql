-- This script is executed automatically by Spring Boot on startup.

-- Create a default Admin user (password is "password")
-- The encoded password is for "password" using BCrypt
INSERT INTO users (id, name, email, password, role) VALUES (1, 'Admin User', 'admin@test.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.dGGPkE2', 'ADMIN') ON CONFLICT(id) DO NOTHING;
INSERT INTO users (id, name, email, password, role) VALUES (2, 'Regular User', 'user@test.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.dGGPkE2', 'USER') ON CONFLICT(id) DO NOTHING;

-- Create some parking slots
INSERT INTO parking_slot (id, slot_number, floor, status) VALUES (1, 'A1', 1, 'AVAILABLE') ON CONFLICT(id) DO NOTHING;
INSERT INTO parking_slot (id, slot_number, floor, status) VALUES (2, 'A2', 1, 'OCCUPIED') ON CONFLICT(id) DO NOTHING;
INSERT INTO parking_slot (id, slot_number, floor, status) VALUES (3, 'A3', 1, 'AVAILABLE') ON CONFLICT(id) DO NOTHING;
INSERT INTO parking_slot (id, slot_number, floor, status) VALUES (4, 'A4', 1, 'MAINTENANCE') ON CONFLICT(id) DO NOTHING;
INSERT INTO parking_slot (id, slot_number, floor, status) VALUES (5, 'A5', 1, 'AVAILABLE') ON CONFLICT(id) DO NOTHING;
INSERT INTO parking_slot (id, slot_number, floor, status) VALUES (6, 'B1', 2, 'AVAILABLE') ON CONFLICT(id) DO NOTHING;
INSERT INTO parking_slot (id, slot_number, floor, status) VALUES (7, 'B2', 2, 'AVAILABLE') ON CONFLICT(id) DO NOTHING;
INSERT INTO parking_slot (id, slot_number, floor, status) VALUES (8, 'B3', 2, 'OCCUPIED') ON CONFLICT(id) DO NOTHING;
INSERT INTO parking_slot (id, slot_number, floor, status) VALUES (9, 'B4', 2, 'AVAILABLE') ON CONFLICT(id) DO NOTHING;
INSERT INTO parking_slot (id, slot_number, floor, status) VALUES (10, 'B5', 2, 'AVAILABLE') ON CONFLICT(id) DO NOTHING;