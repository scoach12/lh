// Main JavaScript for Liebe-Heilung.de
// Modern, accessible, and performance-optimized

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initMobileMenu();
    initSmoothScrolling();
    initScrollIndicator();
    initIntersectionObserver();
    initContactForm();
    initScrollToTop();
    // initPreloader(); // Disabled - removed rosa loading bar
    initTooltips();
    initAccessibility();
    
    console.log('Liebe-Heilung.de initialized successfully!');
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            const isOpen = !mobileMenu.classList.contains('hidden');
            
            if (isOpen) {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            } else {
                mobileMenu.classList.remove('hidden');
                mobileMenuBtn.innerHTML = '<i class="fas fa-times text-xl"></i>';
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Close menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active navigation
                updateActiveNavigation(targetId);
            }
        });
    });
}

// Update Active Navigation
function updateActiveNavigation(activeId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('text-healing-pink', 'font-semibold');
        link.classList.add('text-gray-700');
        
        if (link.getAttribute('href') === activeId) {
            link.classList.remove('text-gray-700');
            link.classList.add('text-healing-pink', 'font-semibold');
        }
    });
}

// Scroll Progress Indicator
function initScrollIndicator() {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Show/hide indicator based on scroll position
        if (scrollTop > 10) {
            scrollIndicator.classList.add('visible');
        } else {
            scrollIndicator.classList.remove('visible');
        }
        
        // Update progress bar
        scrollIndicator.style.transform = `scaleX(${Math.max(0, scrollPercent / 100)})`;
        
        // Add pulse effect at 25%, 50%, 75%, and 100%
        const milestones = [25, 50, 75, 100];
        const tolerance = 2;
        
        let shouldPulse = false;
        milestones.forEach(milestone => {
            if (Math.abs(scrollPercent - milestone) <= tolerance) {
                shouldPulse = true;
            }
        });
        
        if (shouldPulse && !scrollIndicator.classList.contains('pulse')) {
            scrollIndicator.classList.add('pulse');
            setTimeout(() => {
                scrollIndicator.classList.remove('pulse');
            }, 2000);
        }
        
        // Analytics tracking for scroll milestones (only track once per session)
        milestones.forEach(milestone => {
            if (Math.abs(scrollPercent - milestone) <= 0.5 && !scrollIndicator.dataset[`milestone${milestone}`]) {
                scrollIndicator.dataset[`milestone${milestone}`] = 'tracked';
                trackEvent('scroll_milestone', {
                    percentage: milestone,
                    page: window.location.pathname
                });
            }
        });
    });
}

// Intersection Observer for Animations
function initIntersectionObserver() {
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                entry.target.style.animationDelay = Math.random() * 0.3 + 's';
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const contactFormModal = document.getElementById('contact-form-modal');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Wird gesendet...';
            submitBtn.disabled = true;
            submitBtn.classList.add('btn-loading');
            
            try {
                // Simulate form submission (replace with actual endpoint)
                await simulateFormSubmission(new FormData(this));
                
                // Success
                showNotification('Ihre Nachricht wurde erfolgreich gesendet!', 'success');
                this.reset();
                
            } catch (error) {
                // Error
                showNotification('Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.', 'error');
                console.error('Form submission error:', error);
                
            } finally {
                // Reset button
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('btn-loading');
                }, 1000);
            }
        });
        
        // Real-time form validation
        const formFields = contactForm.querySelectorAll('input, textarea, select');
        formFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            field.addEventListener('input', function() {
                // Remove error state while typing
                this.classList.remove('error');
            });
        });
    }
    
    // Handle modal contact form as well
    if (contactFormModal) {
        contactFormModal.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Wird gesendet...';
            submitBtn.disabled = true;
            submitBtn.classList.add('btn-loading');
            
            try {
                // Simulate form submission (replace with actual endpoint)
                await simulateFormSubmission(new FormData(this));
                
                // Success
                showNotification('Ihre Nachricht wurde erfolgreich gesendet!', 'success');
                this.reset();
                
                // Close modal after successful submission
                const kontaktModal = document.getElementById('kontaktModal');
                if (kontaktModal) {
                    kontaktModal.classList.add('hidden');
                    document.body.style.overflow = '';
                }
                
            } catch (error) {
                // Error
                showNotification('Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.', 'error');
                console.error('Form submission error:', error);
                
            } finally {
                // Reset button
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('btn-loading');
                }, 1000);
            }
        });
        
        // Real-time form validation for modal form
        const modalFormFields = contactFormModal.querySelectorAll('input, textarea, select');
        modalFormFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            field.addEventListener('input', function() {
                // Remove error state while typing
                this.classList.remove('error');
            });
        });
    }
}

// Simulate Form Submission
async function simulateFormSubmission(formData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 90% success rate
            if (Math.random() > 0.1) {
                resolve({ status: 'success' });
            } else {
                reject(new Error('Simulation error'));
            }
        }, 2000);
    });
}

// Field Validation
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    }
    
    // Phone validation (if provided)
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
        isValid = phoneRegex.test(value);
    }
    
    // Apply visual feedback
    if (isValid) {
        field.classList.remove('error');
        field.classList.add('success');
    } else {
        field.classList.remove('success');
        field.classList.add('error');
    }
    
    return isValid;
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white opacity-70 hover:opacity-100">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        // Show/hide based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top functionality
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Track event for analytics
            trackEvent('scroll_to_top', {
                source: 'footer_button'
            });
        });
    }
}

// Preloader
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'fixed inset-0 bg-white z-50 flex items-center justify-center';
    preloader.innerHTML = `
        <div class="text-center">
            <div class="w-16 h-16 border-4 border-healing-pink/30 border-t-healing-pink rounded-full animate-spin mb-4"></div>
            <p class="text-gray-600 font-medium">Lädt...</p>
        </div>
    `;
    
    document.body.appendChild(preloader);
    
    // Hide preloader when page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.remove(), 300);
        }, 500);
    });
}

// Tooltip Initialization
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        
        element.addEventListener('mouseenter', function() {
            showTooltip(this, tooltipText);
        });
        
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

// Show Tooltip
function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip-popup fixed bg-gray-900 text-white px-3 py-2 rounded text-sm z-50 pointer-events-none';
    tooltip.textContent = text;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
    
    setTimeout(() => tooltip.style.opacity = '1', 10);
}

// Hide Tooltip
function hideTooltip() {
    const tooltip = document.querySelector('.tooltip-popup');
    if (tooltip) {
        tooltip.style.opacity = '0';
        setTimeout(() => tooltip.remove(), 150);
    }
}

// Accessibility Enhancements
function initAccessibility() {
    // Skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Zum Hauptinhalt springen';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
    
    // Focus management
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const focusable = Array.from(document.querySelectorAll(focusableElements))
                .filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));
            
            const firstFocusable = focusable[0];
            const lastFocusable = focusable[focusable.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance Monitoring
function initPerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                
                console.log('Page Load Time:', loadTime + 'ms');
                
                // Send to analytics if needed
                if (loadTime > 3000) {
                    console.warn('Slow page load detected:', loadTime + 'ms');
                }
            }, 0);
        });
    }
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You could send this to an error tracking service
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registered successfully');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Analytics Integration Helper
function trackEvent(eventName, eventData = {}) {
    // Google Analytics 4 example
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Console log for development
    console.log('Event tracked:', eventName, eventData);
}

// Cookie Consent (GDPR Compliance)
function initCookieConsent() {
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
        const consentBanner = document.createElement('div');
        consentBanner.className = 'fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50';
        consentBanner.innerHTML = `
            <div class="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <p class="text-sm">
                    Diese Website verwendet Cookies, um Ihnen die bestmögliche Erfahrung zu bieten. 
                    <a href="#" class="underline hover:no-underline">Mehr erfahren</a>
                </p>
                <div class="space-x-4">
                    <button onclick="acceptCookies()" class="bg-healing-pink px-4 py-2 rounded hover:bg-healing-pink/90 transition-colors">
                        Akzeptieren
                    </button>
                    <button onclick="declineCookies()" class="border border-white px-4 py-2 rounded hover:bg-white hover:text-gray-900 transition-colors">
                        Ablehnen
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(consentBanner);
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.querySelector('.fixed.bottom-0').remove();
    // Initialize analytics and other tracking
    initAnalytics();
}

function declineCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    document.querySelector('.fixed.bottom-0').remove();
}

function initAnalytics() {
    // Initialize Google Analytics or other tracking tools
    console.log('Analytics initialized');
}

// Initialize cookie consent
// initCookieConsent();

// Modal functionality is now handled directly in HTML inline JavaScript