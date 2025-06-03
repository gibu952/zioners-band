document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 60, // Adjust for fixed navbar height
                behavior: 'smooth'
            });
        }
    });
});

// Smooth scroll to booking section
function scrollToBooking() {
    const bookingSection = document.getElementById('book-us');
    const headerOffset = 60;
    const elementPosition = bookingSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// slider
// Add this at the end of your about-us.js file

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slider-container .slide');
    let currentSlide = 0;

    function showSlide(index) {
        // Remove 'active' class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Add 'active' class to the current slide
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0; // Loop back to the first slide
        }
        showSlide(currentSlide);
    }

    // Show the first slide initially
    if (slides.length > 0) {
        showSlide(currentSlide);
        // Start the automatic slideshow, changing slide every 3000ms (3 seconds)
        setInterval(nextSlide, 3000);
    }
});

// Add this JavaScript code to your about-us.js file

document.addEventListener('DOMContentLoaded', () => {
    // ... (your existing slider and other scripts) ...

    // Light/Dark mode toggle for slider section
    const modeToggleSliderButton = document.getElementById('mode-toggle-slider');
    const sliderSection = document.getElementById('image-slider-section');

    if (modeToggleSliderButton && sliderSection) {
        modeToggleSliderButton.addEventListener('click', () => {
            sliderSection.classList.toggle('dark-mode');

            // Optional: Change button text based on mode
            if (sliderSection.classList.contains('dark-mode')) {
                modeToggleSliderButton.textContent = 'Light Mode';
            } else {
                modeToggleSliderButton.textContent = 'Dark Mode';
            }
        });
    }
});

// Booking Form Handling
document.getElementById('booking-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Add animation to button
    const submitButton = this.querySelector('.submit-button');
    submitButton.innerHTML = 'Sending...';
    submitButton.style.opacity = '0.7';

    // Simulate form submission (replace with actual form submission logic)
    setTimeout(() => {
        submitButton.innerHTML = 'Request Sent!';
        submitButton.style.backgroundColor = '#28a745';
        
        // Reset form
        setTimeout(() => {
            this.reset();
            submitButton.innerHTML = 'Submit Booking Request';
            submitButton.style.backgroundColor = '';
            submitButton.style.opacity = '1';
            
            // Show success message
            alert('Thank you for your booking request! We will contact you shortly.');
        }, 2000);
    }, 1500);
});

// Enhanced form validation and interaction
document.querySelectorAll('.booking-form input, .booking-form textarea').forEach(input => {
    // Add labels dynamically
    const label = document.createElement('label');
    label.textContent = input.placeholder;
    input.parentElement.insertBefore(label, input);
    
    // Handle focus events
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });

    // If field has value on page load, add focused class
    if (input.value) {
        input.parentElement.classList.add('focused');
    }
});
