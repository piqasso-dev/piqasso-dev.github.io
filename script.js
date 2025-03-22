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