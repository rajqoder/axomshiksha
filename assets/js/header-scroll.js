// Header scroll effect functionality
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  let lastScrollTop = 0;
  let ticking = false;
  
  // Set initial state
  function updateHeaderState() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
      // Add scrolled class with slight delay for smooth transition
      setTimeout(() => {
        header.classList.remove('header-initial');
        header.classList.add('header-scrolled');
      }, 10);
    } else {
      header.classList.remove('header-scrolled');
      header.classList.add('header-initial');
    }
    
    ticking = false;
  }
  
  // Optimized scroll handler using requestAnimationFrame
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateHeaderState);
      ticking = true;
    }
    lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  }
  
  // Initialize header state
  updateHeaderState();
  
  // Attach scroll listener
  window.addEventListener('scroll', onScroll, { passive: true });
});