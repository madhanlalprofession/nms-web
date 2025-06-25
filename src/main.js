// Enhanced JavaScript functionality for NMSWorks website

// Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});

// Navbar scroll effect with enhanced animations
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animated counters
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Initialize counters
document.addEventListener('DOMContentLoaded', animateCounters);

// Enhanced tab functionality with animations
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('[data-bs-toggle="tab"]');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-bs-target');
            const targetTab = document.querySelector(targetId);
            
            if (targetTab) {
                // Hide all tab panes with animation
                const allTabs = document.querySelectorAll('.tab-pane');
                allTabs.forEach(tab => {
                    tab.style.opacity = '0';
                    tab.style.transform = 'translateY(20px)';
                });
                
                // Show target tab with animation
                setTimeout(() => {
                    targetTab.style.transition = 'all 0.4s ease';
                    targetTab.style.opacity = '1';
                    targetTab.style.transform = 'translateY(0)';
                }, 100);
            }
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-particles');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Dynamic particle animation
function createParticles() {
    const particleContainer = document.querySelector('.floating-particles');
    if (!particleContainer) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particleContainer.appendChild(particle);
    }
}

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

// Enhanced form validation and animation
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        // Floating label animation
        inputs.forEach(input => {
            const label = input.nextElementSibling;
            
            input.addEventListener('focus', function() {
                if (label && label.tagName === 'LABEL') {
                    label.classList.add('floating');
                }
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value && label && label.tagName === 'LABEL') {
                    label.classList.remove('floating');
                }
                this.parentElement.classList.remove('focused');
            });
            
            // Check initial state
            if (input.value && label && label.tagName === 'LABEL') {
                label.classList.add('floating');
            }
        });
        
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                    
                    // Shake animation for invalid inputs
                    input.style.animation = 'shake 0.5s ease-in-out';
                    setTimeout(() => {
                        input.style.animation = '';
                    }, 500);
                    
                    input.addEventListener('input', function() {
                        this.classList.remove('is-invalid');
                        this.classList.add('is-valid');
                    });
                } else if (input.value.trim()) {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                }
            });
            
            if (isValid) {
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                // Loading animation
                submitBtn.innerHTML = '<span class="loading"></span> Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    submitBtn.classList.remove('btn-primary');
                    submitBtn.classList.add('btn-success');
                    
                    // Success animation
                    submitBtn.style.animation = 'pulse 0.5s ease-in-out';
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.classList.remove('btn-success');
                        submitBtn.classList.add('btn-primary');
                        submitBtn.disabled = false;
                        submitBtn.style.animation = '';
                        form.reset();
                        
                        // Reset validation classes
                        inputs.forEach(input => {
                            input.classList.remove('is-valid', 'is-invalid');
                            const label = input.nextElementSibling;
                            if (label && label.tagName === 'LABEL') {
                                label.classList.remove('floating');
                            }
                        });
                    }, 3000);
                }, 2000);
            }
        });
    });
}

// Initialize form validation
document.addEventListener('DOMContentLoaded', setupFormValidation);

// Back to top button
function setupBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top
document.addEventListener('DOMContentLoaded', setupBackToTop);

// Enhanced button animations
function setupButtonAnimations() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Loading state for navigation
        if (button.href && !button.href.includes('#')) {
            button.addEventListener('click', function(e) {
                if (!this.classList.contains('no-loading')) {
                    const originalText = this.innerHTML;
                    this.innerHTML = '<span class="loading"></span> Loading...';
                    this.disabled = true;
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.disabled = false;
                    }, 1000);
                }
            });
        }
    });
}

// Initialize button animations
document.addEventListener('DOMContentLoaded', setupButtonAnimations);

// Intersection Observer for animations
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.advantage-card, .solution-card, .client-logo');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = Math.random() * 0.3 + 's';
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', setupScrollAnimations);

// Enhanced dropdown animations
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.dropdown-menu');
        const items = menu.querySelectorAll('.dropdown-item');
        
        dropdown.addEventListener('show.bs.dropdown', function() {
            menu.style.opacity = '0';
            menu.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                menu.style.transition = 'all 0.3s ease';
                menu.style.opacity = '1';
                menu.style.transform = 'translateY(0)';
                
                // Animate items
                items.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-10px)';
                    
                    setTimeout(() => {
                        item.style.transition = 'all 0.2s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 50);
                });
            }, 50);
        });
    });
});

// Mouse cursor effects
function setupCursorEffects() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--accent-blue);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Scale cursor on hover
    const hoverElements = document.querySelectorAll('a, button, .advantage-card, .solution-card');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Initialize cursor effects (only on desktop)
if (window.innerWidth > 768) {
    document.addEventListener('DOMContentLoaded', setupCursorEffects);
}

// Performance optimization
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key to close modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) bsModal.hide();
        });
    }
    
    // Arrow keys for carousel navigation
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const activeCarousel = document.querySelector('.carousel');
        if (activeCarousel) {
            const bsCarousel = bootstrap.Carousel.getInstance(activeCarousel);
            if (bsCarousel) {
                if (e.key === 'ArrowLeft') {
                    bsCarousel.prev();
                } else {
                    bsCarousel.next();
                }
            }
        }
    }
});

// Add CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    .floating-label.focused label {
        color: var(--accent-blue) !important;
    }
    
    .floating-label.focused input,
    .floating-label.focused textarea,
    .floating-label.focused select {
        border-color: var(--accent-blue) !important;
        box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1) !important;
    }
    
    .loaded {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
    
    img[data-src] {
        opacity: 0;
    }
`;
document.head.appendChild(animationStyles);

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 NMSWorks website loaded successfully!');
    
    // Add loading class to body initially
    document.body.classList.add('loading');
    
    // Remove loading class after everything is loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 500);
    });
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Service worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}