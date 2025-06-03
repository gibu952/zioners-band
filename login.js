document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.auth-form');
    const errorMessage = document.getElementById('error-message');
    const passwordInput = document.getElementById('password');
    const googleLoginButton = document.querySelector('.google-login');
    const loginButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = form.email.value.trim();
        const password = form.password.value.trim();

        if (!validateEmail(email)) {
            showError('Please enter a valid email address.');
            return;
        }

        if (password.length < 6) {
            showError('Password must be at least 6 characters long.');
            return;
        }

        // Simulate successful login
        alert('Login successful!');
        form.reset();
    });

    googleLoginButton.addEventListener('click', () => {
        alert('Redirecting to Google login...');
    });

    loginButton.addEventListener('click', () => {
        loginButton.classList.add('button-clicked');
        setTimeout(() => {
            loginButton.classList.remove('button-clicked');
        }, 300);
    });

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    }
});
