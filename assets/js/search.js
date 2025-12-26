// Search functionality
document.addEventListener('DOMContentLoaded', function() {
  const searchModal = document.getElementById('search-modal');
  const searchOverlay = document.getElementById('search-overlay');
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const closeModalButtons = document.querySelectorAll('.close-search-modal');
  
  // Open search modal
  if (searchButton) {
    searchButton.addEventListener('click', function(e) {
      e.preventDefault();
      openSearchModal();
    });
  }
  
  // Close search modal
  function closeSearchModal() {
    if (searchModal) {
      searchModal.classList.add('hidden');
      document.body.style.overflow = '';
      // Clear search input and results
      if (searchInput) searchInput.value = '';
      if (searchResults) searchResults.innerHTML = '';
    }
  }
  
  // Open search modal
  function openSearchModal() {
    if (searchModal) {
      searchModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      // Focus on search input
      if (searchInput) {
        setTimeout(() => {
          searchInput.focus();
        }, 100);
      }
    }
  }
  
  // Close modal when clicking overlay
  if (searchOverlay) {
    searchOverlay.addEventListener('click', closeSearchModal);
  }
  
  // Close modal with escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeSearchModal();
    }
  });
  
  // Close buttons
  if (closeModalButtons) {
    closeModalButtons.forEach(button => {
      button.addEventListener('click', closeSearchModal);
    });
  }
  
  // Search functionality
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.trim().toLowerCase();
      
      if (searchTerm.length > 0) {
        performSearch(searchTerm);
      } else {
        if (searchResults) {
          searchResults.innerHTML = '';
        }
      }
    });
  }
  
  // Perform search
  function performSearch(term) {
    // Get all posts from the site
    const posts = Array.from(document.querySelectorAll('article.card')).map(article => {
      const title = article.querySelector('.card-title a')?.textContent || '';
      const content = article.textContent || '';
      const link = article.querySelector('.card-title a')?.href || '';
      const thumbnail = article.querySelector('img')?.src || '';
      
      return {
        title,
        content,
        link,
        thumbnail
      };
    });
    
    // Filter posts based on search term
    const filteredPosts = posts.filter(post => 
      post.title.toLowerCase().includes(term) || 
      post.content.toLowerCase().includes(term)
    );
    
    // Display results
    displaySearchResults(filteredPosts);
  }
  
  // Display search results
  function displaySearchResults(results) {
    if (!searchResults) return;
    
    if (results.length === 0) {
      searchResults.innerHTML = `
        <div class="text-center py-8">
          <p class="text-gray-500 dark:text-gray-400">No results found for your search.</p>
        </div>
      `;
      return;
    }
    
    let resultsHTML = '';
    results.slice(0, 10).forEach(post => {
      resultsHTML += `
        <a href="${post.link}" class="block p-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
          <div class="flex items-start gap-4">
            ${post.thumbnail ? `<img src="${post.thumbnail}" alt="${post.title}" class="w-16 h-16 object-cover rounded">` : ''}
            <div>
              <h3 class="font-medium text-gray-900 dark:text-white">${post.title}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">${post.content.substring(0, 100)}...</p>
            </div>
          </div>
        </a>
      `;
    });
    
    searchResults.innerHTML = resultsHTML;
    
    // Add event listeners to close modal when clicking results
    const resultLinks = searchResults.querySelectorAll('a');
    resultLinks.forEach(link => {
      link.addEventListener('click', closeSearchModal);
    });
  }
});