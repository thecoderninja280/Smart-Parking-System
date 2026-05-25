const BASE_URL = 'http://localhost:8080/api';

/**
 * A helper function to perform fetch requests with authorization.
 * @param {string} endpoint - The API endpoint to call (e.g., '/auth/login').
 * @param {object} options - The options object for the fetch call (method, headers, body).
 * @returns {Promise<any>} - The JSON response from the server.
 */
export async function apiRequest(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        
        if (response.status === 204 || response.headers.get("content-length") === "0") {
            return null; // No content
        }

        return await response.json();
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
}