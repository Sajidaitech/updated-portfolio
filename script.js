// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeLightbox();
    initializeScrollAnimations();
    initializeNavbarScroll();
    initializeHoverEffects();
    updateActiveNavLink();
    handleImageErrors();
    optimizeForPrint();

    // Attach CV download button
    const downloadBtn = document.getElementById('downloadCvBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadCV);
    }
});

// ===============================
// Navigation functionality
// ===============================
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });
}

// ===============================
// Lightbox / Modal for images
// ===============================
function initializeLightbox() {
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

    document.querySelectorAll('.popup-img').forEach(img => {
        img.addEventListener('click', function() {
            lightbox.style.display = 'block';
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.style.display === 'block') closeLightbox();
    });
}

// ===============================
// Navbar scroll background effect
// ===============================
function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
}

// ===============================
// Scroll animations
// ===============================
function initializeScrollAnimations() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-item, .education-card, .competencies-list li')
        .forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
}

// ===============================
// Download CV (Google Drive link)
// ===============================
function downloadCV() {
    const driveFileId = '1iGzqCJjMySfvbVRVekyEMwmk_sNpldfB';
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${driveFileId}`;

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.target = '_blank';
    link.download = 'Sajid_Mehmood_CV_2025.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ===============================
// Scroll to contact section
// ===============================
function scrollToContact() {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ===============================
// Active navigation highlighting
// ===============================
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

// ===============================
// Hover effects for timeline
// ===============================
function initializeHoverEffects() {
    document.querySelectorAll('.timeline-content').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 30px rgba(44, 90, 160, 0.2)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        });
    });
}

// ===============================
// Hero section loading animation
// ===============================
window.addEventListener('load', function() {
    const heroElements = document.querySelectorAll(
        '.hero-title, .hero-subtitle, .hero-description, .hero-buttons, .profile-card'
    );
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

// ===============================
// Debounce utility for scroll
// ===============================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

window.addEventListener('scroll', debounce(function() {
    // future scroll-based features
}, 10));

// ===============================
// Optimize for print
// ===============================
function optimizeForPrint() {
    window.addEventListener('beforeprint', function() {
        document.body.classList.add('printing');
    });
    window.addEventListener('afterprint', function() {
        document.body.classList.remove('printing');
    });
}

// ===============================
// Handle broken images
// ===============================
function handleImageErrors() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn(`Failed to load image: ${this.src}`);
        });
    });
}
