// Add scroll functionality to both elements
document.querySelector('.scroll-down').addEventListener('click', scrollToProjects);
const scrollToProjectsElement = document.querySelector('.scroll-to-projects');
if (scrollToProjectsElement) {
    scrollToProjectsElement.addEventListener('click', scrollToProjects);
}

// Function to scroll to projects section
function scrollToProjects() {
    document.querySelector('.projects').scrollIntoView({ behavior: 'smooth' });
}

// Theme switcher
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Function to toggle theme
function toggleTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

// Check for saved user preference, if any, on load of the website
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeToggle.checked = true;
    }
} else if (prefersDarkScheme.matches) {
    // If no saved preference, use system preference
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.checked = true;
}

// Add event listener for theme toggle
themeToggle.addEventListener('change', toggleTheme);

// Modal functionality
const modal = document.getElementById('contactModal');
const ctaButton = document.querySelector('.cta-button');
const closeModal = document.querySelector('.close-modal');
const contactForm = document.getElementById('contactForm');

console.log('Modal elements:', { modal, ctaButton, closeModal, contactForm });

// Open modal when clicking CTA button
ctaButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('CTA button clicked');
    modal.style.display = 'block';
    console.log('Modal display set to block');
});

// Close modal when clicking the close button
closeModal.addEventListener('click', () => {
    console.log('Close button clicked');
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        console.log('Outside modal clicked');
        modal.style.display = 'none';
    }
});

// Initialize EmailJS
(function() {
    emailjs.init("7EDGJfuIalW3-t5Vx"); // Add your EmailJS public key here
})();

// Handle form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Clear any previous messages
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = '';
    formMessage.className = 'form-message';

    // Send email using EmailJS
    emailjs.sendForm('service_vq72a92', 'template_ce5zqij', contactForm)
        .then(
            () => {
                // Show success message
                formMessage.textContent = 'Message sent successfully!';
                formMessage.className = 'form-message success';
                contactForm.reset();
                // Close modal after 2 seconds
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 2000);
            },
            (error) => {
                // Show error message
                formMessage.textContent = 'Failed to send message. Please try again later.';
                formMessage.className = 'form-message error';
                console.error('EmailJS error:', error);
            }
        )
        .finally(() => {
            // Reset button state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        });
}); 