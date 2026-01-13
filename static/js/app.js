/**
 * Login Form JavaScript
 * Handles client-side form validation and submission
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const googleBtn = document.getElementById('googleBtn');

    // ===========================
    // Eye Tracking Feature
    // ===========================
    const eyeballs = document.querySelectorAll('.eyeball');
    const eyeSockets = document.querySelectorAll('.eye-socket');

    /**
     * Track mouse movement and move eyeballs accordingly
     */
    document.addEventListener('mousemove', function (e) {
        eyeballs.forEach((eyeball, index) => {
            const socket = eyeSockets[index];
            const socketRect = socket.getBoundingClientRect();

            // Get center of eye socket
            const socketCenterX = socketRect.left + socketRect.width / 2;
            const socketCenterY = socketRect.top + socketRect.height / 2;

            // Calculate angle between mouse and eye center
            const deltaX = e.clientX - socketCenterX;
            const deltaY = e.clientY - socketCenterY;
            const angle = Math.atan2(deltaY, deltaX);

            // Maximum distance eyeball can move (8px from center)
            const maxDistance = 8;

            // Calculate distance to mouse (clamped to maxDistance)
            const distance = Math.min(
                Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 20,
                maxDistance
            );

            // Calculate new position
            const moveX = Math.cos(angle) * distance;
            const moveY = Math.sin(angle) * distance;

            // Apply transform to move eyeball
            eyeball.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });


    /**
     * Validate email format
     * @param {string} email - Email address to validate
     * @returns {boolean} - True if valid email format
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Display error message
     * @param {string} message - Error message to display
     */
    function showError(message) {
        // Create error element if it doesn't exist
        let errorDiv = document.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            loginForm.insertBefore(errorDiv, loginForm.firstChild);
        }

        errorDiv.textContent = message;
        errorDiv.classList.add('show');

        // Auto-hide after 4 seconds
        setTimeout(() => {
            errorDiv.classList.remove('show');
        }, 4000);
    }

    /**
     * Clear error message
     */
    function clearError() {
        const errorDiv = document.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.classList.remove('show');
        }
    }

    /**
     * Handle form submission
     */
    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        clearError();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Client-side validation
        if (!email) {
            showError('Please enter your email address');
            emailInput.focus();
            return;
        }

        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            emailInput.focus();
            return;
        }

        if (!password) {
            showError('Please enter your password');
            passwordInput.focus();
            return;
        }

        if (password.length < 6) {
            showError('Password must be at least 6 characters long');
            passwordInput.focus();
            return;
        }

        // Set loading state
        loginBtn.classList.add('loading');
        loginBtn.textContent = 'Logging in...';
        loginBtn.disabled = true;

        try {
            // Submit form data
            const formData = new FormData(loginForm);
            const response = await fetch('/login', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Success - show success message
                loginBtn.textContent = '✓ Success!';
                loginBtn.style.background = '#4CAF50';

                // Redirect or handle success
                setTimeout(() => {
                    console.log('Login successful:', result);
                    // TODO: Redirect to dashboard or home page
                    // window.location.href = '/dashboard';
                }, 1000);
            } else {
                // Show error from server
                showError(result.error || 'Login failed. Please try again.');
                resetButton();
            }
        } catch (error) {
            // Network or other error
            showError('Connection error. Please try again.');
            resetButton();
            console.error('Login error:', error);
        }
    });

    /**
     * Reset login button to original state
     */
    function resetButton() {
        loginBtn.classList.remove('loading');
        loginBtn.textContent = 'Login';
        loginBtn.disabled = false;
    }

    /**
     * Handle Google button click (placeholder)
     */
    googleBtn.addEventListener('click', function () {
        console.log('Google login clicked (not implemented)');
        // TODO: Implement Google OAuth when needed
    });

    /**
     * Add input validation feedback
     */
    emailInput.addEventListener('blur', function () {
        const email = this.value.trim();
        if (email && !isValidEmail(email)) {
            this.style.borderColor = '#ff4444';
        } else {
            this.style.borderColor = '';
        }
    });

    emailInput.addEventListener('input', function () {
        this.style.borderColor = '';
    });

    passwordInput.addEventListener('input', function () {
        this.style.borderColor = '';
    });
});
