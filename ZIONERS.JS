document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });

    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const navLinksContainer = document.querySelector(".nav-links");

    hamburgerMenu.addEventListener("click", () => {
        navLinksContainer.classList.toggle("active");
    });

    // Add click event for the "Explore More" button
    const exploreButton = document.querySelector('.explore-button');
    exploreButton.addEventListener('click', () => {
        alert('Thank you for exploring Zioners Band! Stay tuned for more updates.');
    });

    // Add hover effect for social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseover', () => {
            icon.style.transform = 'scale(1.2)';
        });
        icon.addEventListener('mouseout', () => {
            icon.style.transform = 'scale(1)';
        });
    });

    // Add alert for form submission
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for reaching out! We will get back to you soon.');
        contactForm.reset();
    });

    // Add dynamic styling for the contacts section
    const contactSection = document.querySelector('.contact-section');
    contactSection.addEventListener('mouseover', () => {
        contactSection.style.backgroundColor = '#070707'; // Light blue background
        contactSection.style.transition = 'background-color 0.3s ease';
    });
    contactSection.addEventListener('mouseout', () => {
        contactSection.style.backgroundColor = ''; // Reset to default
    });

    // Add functionality for the "Read More" buttons in the blog section
    const readMoreButtons = document.querySelectorAll('.read-more-button');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('More blog content coming soon! Stay tuned.');
        });
    });

    // Add dynamic styling for the blog section
    const blogSection = document.querySelector('.blog-section');

    // Change background color on hover
    blogSection.addEventListener('mouseover', () => {
        blogSection.style.backgroundColor = '#f4f4f4';
        blogSection.style.transition = 'background-color 0.3s ease';
    });
    blogSection.addEventListener('mouseout', () => {
        blogSection.style.backgroundColor = ''; // Reset to default
    });

    // Add border to blog cards on hover
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.border = '2px solid #333';
            card.style.transition = 'border 0.3s ease';
        });
        card.addEventListener('mouseout', () => {
            card.style.border = ''; // Reset to default
        });
    });

    // Change blog title color on hover
    const blogTitles = document.querySelectorAll('.blog-title');
    blogTitles.forEach(title => {
        title.addEventListener('mouseover', () => {
            title.style.color = '#007BFF';
            title.style.transition = 'color 0.3s ease';
        });
        title.addEventListener('mouseout', () => {
            title.style.color = ''; // Reset to default
        });
    });

    // Add shadow effect to blog images on hover
    const blogImages = document.querySelectorAll('.blog-image');
    blogImages.forEach(image => {
        image.addEventListener('mouseover', () => {
            image.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
            image.style.transition = 'box-shadow 0.3s ease';
        });
        image.addEventListener('mouseout', () => {
            image.style.boxShadow = ''; // Reset to default
        });
    });

    // Enlarge "Read More" button on hover
    readMoreButtons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.1)';
            button.style.transition = 'transform 0.3s ease';
        });
        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1)';
        });
    });

    // Add dynamic styles to the header section of the Machadise page
    const headerSection = document.querySelector('.header-section');

    // Change background color on hover
    headerSection.addEventListener('mouseover', () => {
        headerSection.style.backgroundColor = '#333';
        headerSection.style.transition = 'background-color 0.3s ease';
    });
    headerSection.addEventListener('mouseout', () => {
        headerSection.style.backgroundColor = ''; // Reset to default
    });

    // Add shadow effect to the header
    headerSection.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    headerSection.style.transition = 'box-shadow 0.3s ease';

    // Change header text color on hover
    const headerText = headerSection.querySelector('.header-text');
    headerText.addEventListener('mouseover', () => {
        headerText.style.color = '#FFD700'; // Gold color
        headerText.style.transition = 'color 0.3s ease';
    });
    headerText.addEventListener('mouseout', () => {
        headerText.style.color = ''; // Reset to default
    });

    // Enlarge header logo on hover
    const headerLogo = headerSection.querySelector('.header-logo');
    headerLogo.addEventListener('mouseover', () => {
        headerLogo.style.transform = 'scale(1.2)';
        headerLogo.style.transition = 'transform 0.3s ease';
    });
    headerLogo.addEventListener('mouseout', () => {
        headerLogo.style.transform = 'scale(1)';
    });

    // Add border to the header section
    headerSection.style.border = '2px solid #007BFF'; // Blue border
    headerSection.style.transition = 'border 0.3s ease';
});

