// ========== SMOOTH SCROLLING FOR NAVIGATION ========== 
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile menu if open
      document.querySelector('.nav-menu').style.left = '-100%';
    }
  });
});

// ========== MOBILE MENU TOGGLE ========== 
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
  hamburger.addEventListener('click', function() {
    navMenu.style.left = navMenu.style.left === '-100%' || navMenu.style.left === '' 
      ? '0' 
      : '-100%';
  });
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
  if (!event.target.closest('.nav-container')) {
    navMenu.style.left = '-100%';
  }
});

// ========== INTERSECTION OBSERVER FOR ANIMATIONS ========== 
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = getComputedStyle(entry.target).animation || 'fadeInUp 0.8s ease-out';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.section-title, .about-text, .about-image, .skill-card, .project-card, .contact-info, .contact-form').forEach(el => {
  observer.observe(el);
});

// ========== NAVBAR SCROLL EFFECT ========== 
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
  // Add shadow on scroll
  if (currentScroll > 50) {
    navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.boxShadow = 'none';
  }
  
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// ========== FORM SUBMISSION ========== 
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
      alert('Please fill in all fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Here you would typically send the form data to a server
    // For now, we'll just show a success message
    alert(`Thank you ${name}! I'll get back to you soon at ${email}`);
    
    // Reset form
    this.reset();
  });
}

// ========== SCROLL PROGRESS INDICATOR ========== 
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  
  // You can use this value to update a progress bar if needed
  // document.querySelector('.progress-bar').style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ========== ANIMATE SKILL BARS ON SCROLL ========== 
const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
  const skillsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !skillsAnimated) {
        skillBars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => {
            bar.style.transition = 'width 1s ease-out';
            bar.style.width = width;
          }, 100);
        });
        skillsAnimated = true;
      }
    });
  }, observerOptions);
  
  skillsObserver.observe(skillsSection);
}

// ========== TILT EFFECT FOR PROJECT CARDS (Optional) ========== 
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
  });
});

// ========== PARALLAX EFFECT ========== 
window.addEventListener('scroll', function() {
  const scrollY = window.scrollY;
  const hero = document.querySelector('.hero');
  
  if (hero) {
    const shapes = hero.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
      shape.style.transform = `translateY(${scrollY * (0.5 + index * 0.1)}px)`;
    });
  }
});

// ========== DYNAMIC YEAR IN FOOTER ========== 
const currentYear = new Date().getFullYear();
// You can uncomment if needed to update footer year dynamically
// const yearElement = document.querySelector('.footer');
// if (yearElement) {
//   yearElement.textContent = yearElement.textContent.replace(/\d{4}/, currentYear);
// }

// ========== BUTTON RIPPLE EFFECT ========== 
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
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
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple CSS
const style = document.createElement('style');
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ========== COUNTING ANIMATION ========== 
function animateCounter(element, target) {
  const duration = 2000; // 2 seconds
  const increment = target / (duration / 16);
  let current = 0;
  
  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Animate info counters when they come into view
const infoItems = document.querySelectorAll('.info-item p');
let countersAnimated = false;

const aboutSection = document.querySelector('.about');
if (aboutSection && infoItems.length > 0) {
  const countersObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        infoItems.forEach(item => {
          const value = parseInt(item.textContent);
          if (!isNaN(value)) {
            animateCounter(item, value);
          }
        });
        countersAnimated = true;
      }
    });
  }, observerOptions);
  
  countersObserver.observe(aboutSection);
}

// ========== ADD ACTIVE CLASS TO NAV LINKS ========== 
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// ========== PAGE LOAD ANIMATION ========== 
window.addEventListener('load', function() {
  // Add loaded class to body for any additional styling
  document.body.classList.add('loaded');
  
  // Trigger animations on page load
  const elementsToAnimate = document.querySelectorAll('[class*="fadeIn"]');
  elementsToAnimate.forEach((el, index) => {
    el.style.animationDelay = (index * 0.1) + 's';
  });
});

console.log('Portfolio loaded successfully!');
