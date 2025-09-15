// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section[id]');
const observerOptions = {
    rootMargin: '-80px 0px -80px 0px', // Account for navbar height
    threshold: 0.3
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const navLink = document.querySelector(`a[href="#${entry.target.id}"]`);
        
        if (entry.isIntersecting) {
            // Remove active class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));
            // Add active class to current nav link
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Intersection Observer for Timeline Animation
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.6s ease-out ${entry.target.dataset.delay || '0s'} both`;
            
            // Add stagger effect
            const index = Array.from(timelineItems).indexOf(entry.target);
            entry.target.style.animationDelay = `${index * 0.15}s`;
        }
    });
}, timelineObserverOptions);

timelineItems.forEach((item, index) => {
    item.dataset.delay = `${index * 0.15}s`;
    timelineObserver.observe(item);
});

// Intersection Observer for Education Cards
const educationCards = document.querySelectorAll('.education-card');
const cardObserverOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -30px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = Array.from(educationCards).indexOf(entry.target);
            entry.target.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
        }
    });
}, cardObserverOptions);

educationCards.forEach(card => {
    cardObserver.observe(card);
});

// Intersection Observer for Competencies
const competencyItems = document.querySelectorAll('.competencies-list li');
const competencyObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -20px 0px'
};

const competencyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = Array.from(competencyItems).indexOf(entry.target);
            entry.target.style.animation = `fadeInUp 0.4s ease-out ${index * 0.05}s both`;
        }
    });
}, competencyObserverOptions);

competencyItems.forEach(item => {
    competencyObserver.observe(item);
});

// Intersection Observer for Contact Details
const contactDetails = document.querySelectorAll('.contact-details p');
const contactObserverOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -20px 0px'
};

const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = Array.from(contactDetails).indexOf(entry.target);
            entry.target.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
        }
    });
}, contactObserverOptions);

contactDetails.forEach(detail => {
    contactObserver.observe(detail);
});

// Button Functions
function downloadCV() {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual CV file path
    link.download = 'Sajid_Mehmood_CV.pdf'; // CV filename
    
    // Add visual feedback
    const button = event.target.closest('.btn');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
    button.disabled = true;
    
    // Simulate download process
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
    }, 1000);
    
    // Uncomment the line below when you have an actual CV file
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    
    console.log('CV download initiated');
}

function scrollToContact() {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        const offsetTop = contactSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #0C0327 0%, #1e1040 100%);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 999;
    box-shadow: 0 4px 15px rgba(12, 3, 39, 0.3);
    font-size: 18px;
`;

document.body.appendChild(scrollToTopBtn);

// Show/Hide Scroll to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
        scrollToTopBtn.style.transform = 'translateY(0)';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
        scrollToTopBtn.style.transform = 'translateY(10px)';
    }
});

// Scroll to Top Functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effect for scroll to top button
scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'translateY(-3px) scale(1.1)';
    scrollToTopBtn.style.boxShadow = '0 8px 25px rgba(12, 3, 39, 0.4)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'translateY(0) scale(1)';
    scrollToTopBtn.style.boxShadow = '0 4px 15px rgba(12, 3, 39, 0.3)';
});

// Typing Animation for Hero Subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    setTimeout(type, 1500); // Start after other animations
}

// Initialize typing animation
document.addEventListener('DOMContentLoaded', () => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        typeWriter(heroSubtitle, originalText, 150);
    }
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < hero.offsetHeight) {
        const speed = scrolled * 0.5;
        hero.style.transform = `translateY(${speed}px)`;
    }
});

// Add loading animation for images
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
        img.style.transform = 'scale(1)';
    });
    
    // Set initial state
    img.style.opacity = '0';
    img.style.transform = 'scale(0.8)';
    img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Hover effects for timeline items
timelineItems.forEach(item => {
    const content = item.querySelector('.timeline-content');
    
    item.addEventListener('mouseenter', () => {
        content.style.transform = 'translateY(-8px) scale(1.02)';
        content.style.boxShadow = '0 20px 40px rgba(12, 3, 39, 0.15)';
    });
    
    item.addEventListener('mouseleave', () => {
        content.style.transform = 'translateY(0) scale(1)';
        content.style.boxShadow = '0 10px 30px rgba(12, 3, 39, 0.1)';
    });
});

// Add click ripple effect to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Enhanced scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, #4A90E2, #27AE60);
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Handle scroll events here if needed
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

console.log('Resume website loaded successfully with enhanced animations and interactions!');
