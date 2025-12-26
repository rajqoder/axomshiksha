// Theme switcher functionality
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check for saved theme preference or respect OS preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  
  // Apply initial theme
  document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  themeIcon.textContent = initialTheme === 'dark' ? '🌙' : '☀️';
  
  // Toggle theme function
  function toggleTheme() {
    // Add rotation animation
    themeToggle.style.transform = 'rotate(30deg)';
    
    setTimeout(() => {
      const isDark = document.documentElement.classList.contains('dark');
      document.documentElement.classList.toggle('dark');
      
      // Update icon with fade effect
      themeIcon.style.opacity = '0';
      
      setTimeout(() => {
        themeIcon.textContent = isDark ? '☀️' : '🌙';
        themeIcon.style.opacity = '1';
      }, 150);
      
      // Reset transform
      themeToggle.style.transform = '';
      
      // Save preference
      localStorage.setItem('theme', isDark ? 'light' : 'dark');
    }, 150);
  }
  
  // Add event listener
  themeToggle?.addEventListener('click', toggleTheme);
});