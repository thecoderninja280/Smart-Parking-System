import { apiRequest } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in and redirect
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    if (token && userRole) {
        window.location.href = userRole === 'ADMIN' ? '/admin.html' : '/dashboard.html';
        return;
    }

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const errorMessageDiv = document.getElementById('error-message');

    // Tab switching logic
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginFormContainer = document.getElementById('login-form-container');
    const registerFormContainer = document.getElementById('register-form-container');

    function showLogin() {
        loginTab.classList.add('border-indigo-500', 'text-indigo-600');
        loginTab.classList.remove('border-transparent', 'text-gray-500', 'hover:text-gray-600', 'hover:border-gray-300');
        registerTab.classList.add('border-transparent', 'text-gray-500', 'hover:text-gray-600', 'hover:border-gray-300');
        registerTab.classList.remove('border-indigo-500', 'text-indigo-600');
        loginFormContainer.classList.remove('hidden');
        registerFormContainer.classList.add('hidden');
        errorMessageDiv.textContent = '';
    }

    function showRegister() {
        registerTab.classList.add('border-indigo-500', 'text-indigo-600');
        registerTab.classList.remove('border-transparent', 'text-gray-500', 'hover:text-gray-600', 'hover:border-gray-300');
        loginTab.classList.add('border-transparent', 'text-gray-500', 'hover:text-gray-600', 'hover:border-gray-300');
        loginTab.classList.remove('border-indigo-500', 'text-indigo-600');
        registerFormContainer.classList.remove('hidden');
        loginFormContainer.classList.add('hidden');
        errorMessageDiv.textContent = '';
    }
    
    showLogin(); // Default to login tab
    loginTab.addEventListener('click', showLogin);
    registerTab.addEventListener('click', showRegister);

    // Login form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMessageDiv.textContent = '';
        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await apiRequest('/auth/login', {
                method: 'POST',
                body: JSON.stringify(data),
            });
            localStorage.setItem('token', response.token);
            localStorage.setItem('userEmail', response.email);
            localStorage.setItem('userRole', response.role);
            window.location.href = response.role === 'ADMIN' ? '/admin.html' : '/dashboard.html';
        } catch (error) {
            errorMessageDiv.textContent = `Login failed: ${error.message}`;
        }
    });

    // Registration form submission
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMessageDiv.textContent = '';
        const formData = new FormData(registerForm);
        const data = Object.fromEntries(formData.entries());

        try {
            await apiRequest('/auth/register', {
                method: 'POST',
                body: JSON.stringify(data),
            });
            alert('Registration successful! Please log in.');
            showLogin(); // Switch to login form
            loginForm.reset();
            registerForm.reset();
        } catch (error) {
            errorMessageDiv.textContent = `Registration failed: ${error.message}`;
        }
    });
});