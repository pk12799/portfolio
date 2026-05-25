// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

let menuOpen = false;

// Toggle mobile menu by toggling the "active" class (CSS controls visibility)
function toggleMobileMenu() {
    if (window.innerWidth <= 768) {
        menuOpen = !menuOpen;
        if (menuOpen) {
            navMenu.classList.add('active');
            hamburger.classList.add('active');
        } else {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
}

if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
}

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            menuOpen = false;
        }
    });
});

// Handle window resize for responsive menu (keep menu visible on wide screens)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.add('active');
        hamburger.classList.remove('active');
        menuOpen = false;
    } else {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        menuOpen = false;
    }
});

// Initialize menu state on load
window.addEventListener('load', () => {
    if (window.innerWidth <= 768) {
        navMenu.classList.remove('active');
    } else {
        navMenu.classList.add('active');
    }
});

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill tags, cards, and items for animation
document.querySelectorAll('.skill-tag, .project-card, .experience-item, .cert-card, .contact-method').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
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

// Add active state styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
        border-bottom: 2px solid var(--primary-color);
        padding-bottom: 0.5rem;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(10px, 10px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section - DISABLED to prevent pointer-events issues
// window.addEventListener('scroll', () => {
//     const hero = document.querySelector('.hero');
//     if (hero) {
//         const scrolled = window.pageYOffset;
//         hero.style.transform = `translateY(${scrolled * 0.5}px)`;
//     }
// });

// Highlight active section in navbar
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 300) {
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

// Initialize animations on page load
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease';
    }
});
