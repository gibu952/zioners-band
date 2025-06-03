// Add this at the end of the existing DOMContentLoaded event listener

// Add hover effect for navigation buttons
const navButtons = document.querySelectorAll('.nav-btn');
navButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
    
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });
});

// Existing smooth scrolling logic
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

// 1. Highlight active navigation link on scroll
const sections = document.querySelectorAll('section'); // Assuming your content is in <section> tags
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 70; // Adjust offset
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// 2. Fade in elements on scroll
const elementsToFadeIn = document.querySelectorAll('.fade-on-scroll'); // Add this class to elements you want to fade in

const fadeInOnScroll = () => {
    elementsToFadeIn.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;

        if (elementTop < viewportHeight - 100) { // Adjust offset
            element.classList.add('fade-in');
        }
    });
};

window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll); // Run on load in case elements are already in view

// 3. Change header style on scroll
const header = document.querySelector('header'); // Assuming you have a <header> tag

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) { // Change 50 to the scroll distance you prefer
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 4. Add a "Back to Top" button that appears on scroll
const backToTopButton = document.createElement('button');
backToTopButton.textContent = 'Back to Top';
backToTopButton.id = 'back-to-top'; // Give it an ID for styling
document.body.appendChild(backToTopButton); // Add button to the body

backToTopButton.style.position = 'fixed';
backToTopButton.style.bottom = '20px';
backToTopButton.style.right = '20px';
backToTopButton.style.display = 'none'; // Initially hidden

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) { // Show button after scrolling 200px
        backToTopButton.style.display = 'block';
        // Or use a class: backToTopButton.classList.add('back-to-top-visible');
    } else {
        backToTopButton.style.display = 'none';
        // Or use a class: backToTopButton.classList.remove('back-to-top-visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 5. Add a class to elements on hover (example)
const hoverElements = document.querySelectorAll('.hover-effect'); // Add this class to elements you want this effect on

hoverElements.forEach(element => {
    element.addEventListener('mouseover', () => {
        element.classList.add('hovered');
    });
    element.addEventListener('mouseout', () => {
        element.classList.remove('hovered');
    });
});
