// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeLightbox();
    initializeScrollAnimations();
    initializeNavbarScroll();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Lightbox/Modal functionality for images
function initializeLightbox() {
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="close-btn">&times;</span>
        <div class="lightbox-content">
            <img class="lightbox-img" src="" alt="">
        </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const closeBtn = lightbox.querySelector('.close-btn');

    // Add click event to all popup images
    const popupImages = document.querySelectorAll('.popup-img');
    popupImages.forEach(img => {
        img.addEventListener('click', function() {
            lightbox.style.display = 'block';
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close lightbox functionality
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    closeBtn.addEventListener('click', closeLightbox);
    
    // Close when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            closeLightbox();
        }
    });
}

// Navbar scroll effect
function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll('.timeline-item, .education-card, .competencies-list li');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Download CV function
function downloadCV() {
    // Create a temporary link to download CV
    // You'll need to replace 'cv.pdf' with the actual path to Sajid's CV
    const link = document.createElement('a');
    link.href = 'cv.pdf'; // Replace with actual CV file path
    link.download = 'Sajid_Mehmood_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Scroll to contact section
function scrollToContact() {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Active navigation highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize active nav link highlighting
updateActiveNavLink();

// Add some interactive hover effects
function initializeHoverEffects() {
    const timelineItems = document.querySelectorAll('.timeline-content');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 30px rgba(44, 90, 160, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Initialize hover effects
initializeHoverEffects();

// Loading animation
window.addEventListener('load', function() {
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons, .profile-card');
    
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Utility function for debouncing scroll events
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

// Optimize scroll performance
const optimizedScrollHandler = debounce(function() {
    // Any scroll-based functionality can be added here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Add print styles optimization
function optimizeForPrint() {
    window.addEventListener('beforeprint', function() {
        document.body.classList.add('printing');
    });
    
    window.addEventListener('afterprint', function() {
        document.body.classList.remove('printing');
    });
}

optimizeForPrint();

// Error handling for missing images
function handleImageErrors() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.log(`Failed to load image: ${this.src}`);
        });
    });
}

handleImageErrors();