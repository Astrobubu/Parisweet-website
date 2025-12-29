/* =====================================================
   PARISWEET - JavaScript Functionality
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavbar();
    initMobileMenu();
    initMenuTabs();
    initSmoothScroll();
    initReviewsCarousel();
    initHeroScrollEffect();
});

/* ==================== HERO SCROLL EFFECT ==================== */
function initHeroScrollEffect() {
    const heroImage = document.querySelector('.hero-image img');
    if (!heroImage) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Stop calculating after hero is out of view (approx 1000px)
        if (scrollY < 1000) {
            // Blur: 0 to 8px over 500px scroll
            const blurAmount = Math.min(8, scrollY / 60);

            // Scale: 1 to 0.9 over 500px scroll (zooms out/backs away)
            const scaleAmount = Math.max(0.9, 1 - (scrollY / 5000));

            heroImage.style.filter = `blur(${blurAmount}px)`;
            heroImage.style.transform = `scale(${scaleAmount})`;
        }
    });
}

/* ==================== NAVBAR ==================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Add scrolled class when scrolled past hero
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    });
}

/* ==================== MOBILE MENU ==================== */
function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const overlay = document.getElementById('mobileNavOverlay');
    const links = document.querySelectorAll('.mobile-nav-link');

    if (!toggle || !overlay) return;

    toggle.addEventListener('click', () => {
        overlay.classList.toggle('active');
        toggle.classList.toggle('active');
        document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            overlay.classList.remove('active');
            toggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
            toggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ==================== MENU TABS ==================== */
function initMenuTabs() {
    const tabs = document.querySelectorAll('.menu-tab');
    const categories = document.querySelectorAll('.menu-category');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetCategory = tab.getAttribute('data-category');

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show corresponding category
            categories.forEach(category => {
                if (category.getAttribute('data-category') === targetCategory) {
                    category.classList.add('active');
                } else {
                    category.classList.remove('active');
                }
            });
        });
    });
}

/* ==================== SMOOTH SCROLL ==================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    const navbarHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height'));

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ==================== REVIEWS CAROUSEL ==================== */
function initReviewsCarousel() {
    const carousel = document.querySelector('.reviews-carousel');
    const dots = document.querySelectorAll('.carousel-dots .dot');

    if (!carousel || !dots.length) return;

    // Update dots on scroll
    carousel.addEventListener('scroll', () => {
        const scrollLeft = carousel.scrollLeft;
        const cardWidth = carousel.querySelector('.review-card').offsetWidth + 32; // Including gap
        const activeIndex = Math.round(scrollLeft / cardWidth);

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    });

    // Click dots to navigate
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const cardWidth = carousel.querySelector('.review-card').offsetWidth + 32;
            carousel.scrollTo({
                left: cardWidth * index,
                behavior: 'smooth'
            });
        });
    });
}

/* ==================== INTERSECTION OBSERVER FOR ANIMATIONS ==================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.journey-card, .menu-item, .review-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

// Initialize scroll animations after a short delay
setTimeout(initScrollAnimations, 100);
