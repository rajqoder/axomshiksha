// Simple intersection observer for fade animations
document.addEventListener('DOMContentLoaded', function() {
  const animateOnScroll = document.querySelectorAll('[data-animate-on-scroll]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // No delay for immediate animation
        entry.target.style.transition = 'opacity 0.3s ease-in-out';
        entry.target.style.opacity = '1';
        // Stop observing this element
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animateOnScroll.forEach(el => {
    // Set initial opacity to 0 for elements with animation
    el.style.opacity = '0';
    observer.observe(el);
  });
  
  // Fade in page content on load
  const mainContent = document.querySelector('main');
  if (mainContent) {
    mainContent.style.opacity = '0';
    mainContent.style.transition = 'opacity 0.4s ease-in-out';
    
    setTimeout(() => {
      mainContent.style.opacity = '1';
    }, 100);
  }
});