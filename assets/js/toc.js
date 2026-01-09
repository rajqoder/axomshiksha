// Table of Contents Generator
(function() {
  let observer;
  
  // Function to generate table of contents
  function generateTOC() {
    // Check if we're on a post page and TOC element exists
    const tocContainer = document.getElementById('toc');
    if (!tocContainer) return;

    // Clear existing content
    tocContainer.innerHTML = '';

    // Find all headings in the content
    const contentBody = document.querySelector('.content-body');
    if (!contentBody) return;

    const headings = contentBody.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length === 0) return;

    // Create TOC list
    const tocList = document.createElement('ul');
    tocList.className = 'space-y-1';

    headings.forEach((heading, index) => {
      // Skip headings without text content
      if (!heading.textContent.trim()) return;

      // Ensure heading has an ID
      if (!heading.id) {
        // Create a slug from the heading text
        const slug = heading.textContent
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .trim()
          .replace(/[\s-]+/g, '-')
          .replace(/^-+|-+$/g, '');
        heading.id = slug || `heading-${index}`;
      }

      // Get heading level
      const level = parseInt(heading.tagName.charAt(1));
      
      // Create list item
      const listItem = document.createElement('li');
      
      // Create link
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      link.className = 'text-main hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 block truncate';
      
      // Add padding based on heading level (h1 = 0, h2 = 16, h3 = 32, etc.)
      const paddingLeft = Math.max(0, (level - 1) * 16);
      link.style.paddingLeft = `${paddingLeft}px`;
      
      listItem.appendChild(link);
      
      // Add to TOC list
      tocList.appendChild(listItem);
    });

    // Add list to TOC container if we have items
    if (tocList.children.length > 0) {
      tocContainer.appendChild(tocList);
      
      // Add smooth scrolling to all TOC links
      tocContainer.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            // Calculate offset for header (header height is 64px + 4px spacing)
            const headerOffset = 68; // h-16 = 64px + 4px spacing below header
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
            
            // Update URL without page jump
            history.pushState(null, null, `#${targetId}`);
            
            // Update active link with a small delay to ensure proper sync
            setTimeout(() => {
              updateActiveLink(targetId);
            }, 100);
            
            // Scroll the TOC to keep the clicked item visible
            this.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          }
        });
      });
      
      // Start observing headings for active section highlighting
      observeHeadings();
    } else {
      // Hide TOC container if no headings
      tocContainer.parentElement.parentElement.style.display = 'none';
    }
  }
  
  // Function to update active link in TOC
  function updateActiveLink(activeId) {
    // Remove active class from all links
    document.querySelectorAll('#toc a').forEach(link => {
      link.classList.remove('active');
    });
    
    // Add active class to current link
    const activeLink = document.querySelector(`#toc a[href="#${activeId}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
  
  // Function to observe headings for active section highlighting
  function observeHeadings() {
    // Disconnect previous observer if exists
    if (observer) {
      observer.disconnect();
    }
    
    // Create new observer
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id) {
            updateActiveLink(id);
          }
        }
      });
    }, {
      rootMargin: '-68px 0px -70% 0px',
      threshold: 0
    });
    
    // Observe all headings
    const contentBody = document.querySelector('.content-body');
    if (contentBody) {
      const headings = contentBody.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach(heading => {
        observer.observe(heading);
      });
    }
  }

  // Run on initial load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', generateTOC);
  } else {
    generateTOC();
  }

  // Also run when new content is added dynamically
  document.addEventListener('turbo:load', generateTOC);
  document.addEventListener('htmx:afterSettle', generateTOC);
  
  // Handle scroll events for active section
  window.addEventListener('scroll', () => {
    if (!observer) {
      observeHeadings();
    }
  }, { passive: true });
})();