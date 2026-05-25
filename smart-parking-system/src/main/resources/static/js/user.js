import { apiRequest } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/index.html';
        return;
    }
    
    const userEmail = localStorage.getItem('userEmail');
    document.getElementById('user-email').textContent = userEmail;

    const parkingGrid = document.getElementById('parking-grid');
    const modal = document.getElementById('reservation-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const reservationForm = document.getElementById('reservation-form');
    const modalSlotIdInput = document.getElementById('modal-slot-id');
    const modalSlotNumberSpan = document.getElementById('modal-slot-number');
    const modalErrorMessage = document.getElementById('modal-error-message');
    const endTimeInput = document.getElementById('end-time');

    function getStatusClasses(status) {
        switch (status) {
            case 'AVAILABLE':
                return 'bg-green-500 hover:bg-green-600 cursor-pointer';
            case 'OCCUPIED':
                return 'bg-red-500 cursor-not-allowed';
            case 'RESERVED':
                return 'bg-yellow-500 cursor-not-allowed';
            case 'MAINTENANCE':
                return 'bg-gray-500 cursor-not-allowed';
            default:
                return 'bg-gray-300';
        }
    }
    
    function renderParkingSlots(slots) {
        parkingGrid.innerHTML = '';
        if (slots.length === 0) {
            parkingGrid.innerHTML = '<p>No parking slots available.</p>';
            return;
        }

        slots.sort((a,b) => a.id - b.id).forEach(slot => {
            const slotElement = document.createElement('div');
            const statusClasses = getStatusClasses(slot.status);
            
            slotElement.className = `p-4 rounded-lg shadow-md text-white text-center font-bold transition-transform transform hover:scale-105 ${statusClasses}`;
            slotElement.innerHTML = `
                <div class="text-2xl">${slot.slotNumber}</div>
                <div class="text-sm">Floor ${slot.floor}</div>
                <div class="text-xs mt-2">${slot.status.replace('_', ' ')}</div>
            `;
            
            if (slot.status === 'AVAILABLE') {
                slotElement.addEventListener('click', () => openReservationModal(slot));
            }
            
            parkingGrid.appendChild(slotElement);
        });
    }

    async function fetchParkingSlots() {
        try {
            const slots = await apiRequest('/parking/slots');
            renderParkingSlots(slots);
        } catch (error) {
            console.error('Failed to fetch parking slots:', error);
            if (error.message.includes('403')) {
                alert('Session expired. Please log in again.');
                logout();
            } else {
                parkingGrid.innerHTML = '<p class="text-red-500">Could not load parking data.</p>';
            }
        }
    }

    function openReservationModal(slot) {
        modalSlotIdInput.value = slot.id;
        modalSlotNumberSpan.textContent = slot.slotNumber;
        
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); // Adjust for local timezone
        now.setSeconds(0);
        now.setMilliseconds(0);
        endTimeInput.min = now.toISOString().slice(0,16);

        modal.classList.remove('hidden');
    }

    function closeReservationModal() {
        modal.classList.add('hidden');
        reservationForm.reset();
        modalErrorMessage.textContent = '';
    }

    modalCloseBtn.addEventListener('click', closeReservationModal);
    
    reservationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        modalErrorMessage.textContent = '';
        
        const reservationData = {
            parkingSlotId: modalSlotIdInput.value,
            endTime: endTimeInput.value,
        };

        try {
            await apiRequest('/user/reservations', {
                method: 'POST',
                body: JSON.stringify(reservationData)
            });
            alert(`Slot ${modalSlotNumberSpan.textContent} reserved successfully!`);
            closeReservationModal();
            fetchParkingSlots(); // Refresh the grid
        } catch (error) {
            modalErrorMessage.textContent = `Reservation failed: ${error.message}`;
        }
    });

    function logout() {
        localStorage.clear();
        window.location.href = '/index.html';
    }

    document.getElementById('logout-btn').addEventListener('click', logout);
    
    // Initial fetch and set up polling
    fetchParkingSlots();
    setInterval(fetchParkingSlots, 5000); // Poll every 5 seconds
});