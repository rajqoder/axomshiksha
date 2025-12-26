// Theme switcher functionality
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  
  // Get all toggle elements
  const toggleCircleDesktop = document.getElementById('toggle-circle-desktop');
  const toggleCircleMobile = document.getElementById('toggle-circle-mobile');
  const toggleIconDesktop = document.getElementById('toggle-icon-desktop');
  const toggleIconMobile = document.getElementById('toggle-icon-mobile');
  
  // Sun icon SVG
  const sunIconSVG = '<path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/>';
  
  // Moon icon SVG
  const moonIconSVG = '<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>';
  
  // Check for saved theme preference or respect OS preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  
  // Apply initial theme
  document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  updateToggleUI(initialTheme === 'dark');
  
  // Update toggle UI based on theme
  function updateToggleUI(isDark) {
    const circles = [toggleCircleDesktop, toggleCircleMobile].filter(el => el);
    const icons = [toggleIconDesktop, toggleIconMobile].filter(el => el);
    
    circles.forEach(circle => {
      if (circle) {
        if (isDark) {
          circle.style.transform = 'translateX(1.75rem)';
          // Change circle background to dark for better moon icon visibility
          circle.classList.remove('bg-white');
          circle.classList.add('bg-gray-800');
        } else {
          circle.style.transform = 'translateX(0)';
          // White background for sun icon
          circle.classList.remove('bg-gray-800');
          circle.classList.add('bg-white');
        }
      }
    });
    
    icons.forEach(icon => {
      if (icon) {
        if (isDark) {
          icon.innerHTML = moonIconSVG;
          icon.classList.remove('text-yellow-500');
          icon.classList.add('text-gray-300');
        } else {
          icon.innerHTML = sunIconSVG;
          icon.classList.remove('text-gray-300');
          icon.classList.add('text-yellow-500');
        }
      }
    });
  }
  
  // Toggle theme function
  function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = !isDark;
    
    // Toggle theme class
    document.documentElement.classList.toggle('dark');
    
    // Update UI
    updateToggleUI(newTheme);
    
    // Save preference
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  }
  
  // Add event listeners
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleTheme();
    });
  }
});