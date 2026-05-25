import { apiRequest } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    if (!token || userRole !== 'ADMIN') {
        localStorage.clear();
        window.location.href = '/index.html';
        return;
    }

    const adminEmail = localStorage.getItem('userEmail');
    document.getElementById('admin-email').textContent = adminEmail;
    
    const statsGrid = document.getElementById('stats-grid');
    const slotsTableBody = document.getElementById('slots-table-body');
    const availableStatuses = ['AVAILABLE', 'OCCUPIED', 'RESERVED', 'MAINTENANCE'];

    function renderStats(stats) {
        statsGrid.innerHTML = `
            <div class="bg-blue-100 p-4 rounded-lg shadow">
                <div class="text-blue-800 text-sm font-bold">TOTAL SLOTS</div>
                <div class="text-blue-900 text-3xl font-extrabold">${stats.totalSlots}</div>
            </div>
             <div class="bg-green-100 p-4 rounded-lg shadow">
                <div class="text-green-800 text-sm font-bold">AVAILABLE</div>
                <div class="text-green-900 text-3xl font-extrabold">${stats.availableSlots}</div>
            </div>
             <div class="bg-red-100 p-4 rounded-lg shadow">
                <div class="text-red-800 text-sm font-bold">OCCUPIED/RESERVED</div>
                <div class="text-red-900 text-3xl font-extrabold">${stats.occupiedSlots}</div>
            </div>
             <div class="bg-gray-100 p-4 rounded-lg shadow">
                <div class="text-gray-800 text-sm font-bold">MAINTENANCE</div>
                <div class="text-gray-900 text-3xl font-extrabold">${stats.maintenanceSlots}</div>
            </div>
            <div class="bg-yellow-100 p-4 rounded-lg shadow">
                <div class="text-yellow-800 text-sm font-bold">ACTIVE RESERVATIONS</div>
                <div class="text-yellow-900 text-3xl font-extrabold">${stats.activeReservations}</div>
            </div>
            <div class="bg-purple-100 p-4 rounded-lg shadow">
                <div class="text-purple-800 text-sm font-bold">TOTAL USERS</div>
                <div class="text-purple-900 text-3xl font-extrabold">${stats.totalUsers}</div>
            </div>
        `;
    }

    function renderSlots(slots) {
        slotsTableBody.innerHTML = '';
        if (slots.length === 0) {
            slotsTableBody.innerHTML = '<tr><td colspan="4" class="text-center p-4">No slots found.</td></tr>';
            return;
        }

        slots.sort((a,b) => a.id - b.id).forEach(slot => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${slot.slotNumber}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${slot.floor}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">${slot.status}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <select data-slot-id="${slot.id}" class="status-select mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        ${availableStatuses.map(s => `<option value="${s}" ${s === slot.status ? 'selected' : ''}>${s}</option>`).join('')}
                    </select>
                </td>
            `;
            slotsTableBody.appendChild(row);
        });
        
        // Add event listeners to new select elements
        document.querySelectorAll('.status-select').forEach(select => {
            select.addEventListener('change', handleStatusChange);
        });
    }
    
    async function handleStatusChange(event) {
        const slotId = event.target.dataset.slotId;
        const newStatus = event.target.value;
        
        try {
            await apiRequest(`/admin/slots/${slotId}`, {
                method: 'PUT',
                body: JSON.stringify({ status: newStatus })
            });
            // No need to manually refresh, polling will take care of it
        } catch (error) {
            alert(`Failed to update slot: ${error.message}`);
            // Revert dropdown on failure? For now, we rely on the next poll to fix it.
        }
    }

    async function fetchData() {
        try {
            const [stats, slots] = await Promise.all([
                apiRequest('/admin/stats'),
                apiRequest('/admin/slots')
            ]);
            renderStats(stats);
            renderSlots(slots);
        } catch (error) {
            console.error('Failed to fetch admin data:', error);
            if (error.message.includes('403')) {
                alert('Session expired or unauthorized. Please log in again.');
                logout();
            } else {
                statsGrid.innerHTML = '<p class="text-red-500 col-span-full">Could not load stats data.</p>';
                slotsTableBody.innerHTML = '<tr><td colspan="4" class="text-center p-4 text-red-500">Could not load slot data.</td></tr>';
            }
        }
    }

    function logout() {
        localStorage.clear();
        window.location.href = '/index.html';
    }

    document.getElementById('logout-btn').addEventListener('click', logout);
    
    // Initial fetch and set up polling
    fetchData();
    setInterval(fetchData, 5000); // Poll every 5 seconds
});