// Portfolio Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    initThemeToggle();
    
    // Navigation
    initNavigation();
    
    // Typing Animation
    initTypingAnimation();
    
    // Skill Animations
    initSkillAnimations();
    
    // Scroll Animations
    initScrollAnimations();
    
    // Contact Form
    initContactForm();
    
    // Smooth Scrolling
    initSmoothScrolling();
    
    // Resume Download
    initResumeDownload();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-toggle__icon');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-color-scheme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// Resume Download Functionality
function initResumeDownload() {
    const downloadBtn = document.getElementById('download-resume');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Generate resume content dynamically
            generateAndDownloadResume();
        });
    }
}

function generateAndDownloadResume() {
    // Create resume content as text
    const resumeContent = `
NIKHIL KUMAR JHA
Full-Stack Developer | AI/ML Enthusiast

CONTACT INFORMATION
Email: nikhiljha5046@gmail.com
Phone: +917982787007
GitHub: github.com/nkj27
LinkedIn: linkedin.com/in/nikkhil2708
Location: Greater Noida, India

EDUCATION
B.Tech in Computer Science and Engineering (Artificial Intelligence and Machine Learning)
Noida Institute of Engineering and Technology, Greater Noida, India
2022 - 2026

Intermediate School
Dashmesh Public School, Delhi, India
2019 - 2021

High School
Dashmesh Public School, Delhi, India
2017 - 2019

TECHNICAL SKILLS
Programming Languages: Java, Python, JavaScript, TypeScript, SQL
Frameworks & Libraries: React.js, Next.js, Node.js, Express.js, REST APIs, Keras, Seaborn, TensorFlow, PyTorch
Tools & Technologies: Git, GitHub, GCP, AWS, Postman, Unix/Linux, MongoDB, Docker
Coursework: Data Structures and Algorithms, Computer Networks, Database Management Systems (DBMS), Operating Systems, System Design, Object-Oriented Programming (OOP)

EXPERIENCE
Machine Learning Intern | NextGenInterns | July 2024 - August 2024 (Remote)
• Successfully completed a virtual internship at NextGenInterns, developing multiple machine learning models from scratch using Python and popular ML libraries.
• Built end-to-end ML projects demonstrating skills in supervised learning, classification, and regression using tools like Scikit-learn, Pandas, and Matplotlib.

AI-ML Virtual Internship | Edunet Foundation | Sep. 2023 - Nov. 2023 (Remote)
• Completed a virtual internship under the Edunet Foundation in collaboration with AICTE, focusing on skill development and emerging technologies.
• Gained valuable insights into the world of Artificial Intelligence and Machine Learning on the AWS platform.
• Gained hands-on experience through project-based learning, improving problem-solving and technical skills in a real-world context.

PROJECTS
Workout Recommendation System
Technologies: React.js, Tailwind CSS, Node.js, Express.js, MongoDB
• Developed a rule-based engine in JavaScript to generate personalized workout plans from user fitness data.
• Built a responsive dashboard using React and Tailwind CSS to visualize plans and track user progress.
• Implemented interactive data charts with Recharts for at-a-glance progress monitoring.

Travel Itinerary Generator
Technologies: React.js, Tailwind CSS, Node.js, MongoDB, Gemini API
• Developed a full-stack MERN travel app with a Gemini AI-powered itinerary generator.
• Built a Node.js REST API to manage a MongoDB database and integrate a third-party AI service.
• Created a responsive, dark-themed React UI with Tailwind CSS for a state-managed user experience.

CERTIFICATIONS
• AWS Academy Certified: Cloud Foundations
• AWS Academy Certified: Machine Learning Foundations
• Microsoft Azure AI Certified: Document Intelligence
• Microsoft Azure AI Certified: Vision Solution
• Coursera Certified: Getting started with AI using IBM Watson
• Infosys: React JS
• Infosys: Spring and Angular

SUMMARY
Passionate Computer Science student specializing in Artificial Intelligence and Machine Learning. 
With hands-on experience in full-stack development and AI/ML technologies, I love creating innovative 
solutions that make a real impact. Always eager to learn new technologies and take on challenging projects.
    `.trim();

    // Create and download the file
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Nikhil_Kumar_Jha_Resume.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    // Show success notification
    showNotification('Resume downloaded successfully!', 'success');
}

// Navigation Functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
        navMenu.classList.add('show');
    });
    
    navClose?.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active-link'));
                navLink?.classList.add('active-link');
            }
        });
    }
}

// Typing Animation
function initTypingAnimation() {
    const typingText = document.getElementById('typing-text');
    const texts = [
        'Full-Stack Developer',
        'AI/ML Enthusiast',
        'Problem Solver',
        'Tech Innovator'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => {
                isDeleting = true;
            }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        setTimeout(typeText, typingSpeed);
    }
    
    if (typingText) {
        typeText();
    }
}

// Skill Progress Bar Animations
function initSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill__progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !bar.classList.contains('animated')) {
                const percent = bar.getAttribute('data-percent');
                bar.style.width = percent + '%';
                bar.classList.add('animated');
            }
        });
    }
    
    // Initial check
    animateSkillBars();
    
    // Check on scroll
    window.addEventListener('scroll', throttle(animateSkillBars, 100));
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll(`
        .about__content,
        .about__education,
        .skills__category,
        .timeline__item,
        .project__card,
        .cert__card,
        .contact__info,
        .contact__form
    `);
    
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic form validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            }, 2000);
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <p>${message}</p>
        <button class="notification__close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--color-success)' : 'var(--color-error)'};
        color: var(--color-btn-primary-text);
        padding: 1rem 1.5rem;
        border-radius: var(--radius-base);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            .notification__close {
                background: none;
                border: none;
                color: inherit;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                line-height: 1;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Close notification
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.style.background = getComputedStyle(document.documentElement)
            .getPropertyValue('--color-surface').replace('1)', '0.95)');
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = getComputedStyle(document.documentElement)
            .getPropertyValue('--color-background').replace('1)', '0.95)');
        header.style.backdropFilter = 'blur(10px)';
    }
});

// Project card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project__card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add a subtle loading animation
    const style = document.createElement('style');
    style.textContent = `
        body:not(.loaded) {
            opacity: 0;
        }
        body.loaded {
            opacity: 1;
            transition: opacity 0.5s ease-in;
        }
    `;
    document.head.appendChild(style);
});

// Utility Functions
function throttle(func, wait) {
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

function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Add smooth reveal animation for timeline items
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline__item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, {
        threshold: 0.1
    });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'all 0.6s ease-out';
        timelineObserver.observe(item);
    });
}

// Initialize timeline animations
document.addEventListener('DOMContentLoaded', initTimelineAnimations);

// Add parallax effect to hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }, 16));
    }
}

// Initialize parallax effect
document.addEventListener('DOMContentLoaded', initParallaxEffect);

// Add click effect to buttons
document.addEventListener('DOMContentLoaded', function() {
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
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            // Add ripple animation
            if (!document.querySelector('#ripple-style')) {
                const style = document.createElement('style');
                style.id = 'ripple-style';
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(2);
                            opacity: 0;
                        }
                    }
                    .btn {
                        position: relative;
                        overflow: hidden;
                    }
                `;
                document.head.appendChild(style);
            }
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Easter egg - Konami code
(function() {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Trigger easter egg
                document.body.style.animation = 'rainbow 2s infinite';
                
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes rainbow {
                        0% { filter: hue-rotate(0deg); }
                        100% { filter: hue-rotate(360deg); }
                    }
                `;
                document.head.appendChild(style);
                
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 10000);
                
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
})();