// Copy code functionality
(function() {
  // Function to add copy buttons to code blocks
  function addCopyButtons() {
    // Add copy buttons to all code blocks
    const codeBlocks = document.querySelectorAll('pre');
    
    codeBlocks.forEach((block) => {
      // Skip if already processed
      if (block.querySelector('.copy-code-button')) return;
      
      // Create copy button
      const button = document.createElement('button');
      button.className = 'copy-code-button';
      button.title = 'Copy code';
      button.innerHTML = '<span class="copy-text">Copy</span>';
      button.setAttribute('aria-label', 'Copy code to clipboard');
      
      // Add button to code block
      block.appendChild(button);
      
      // Add click event
      button.addEventListener('click', async () => {
        try {
          // Get the text content from the code element
          const codeElement = block.querySelector('code');
          const text = codeElement ? codeElement.textContent : block.textContent;
          
          // Copy to clipboard
          await navigator.clipboard.writeText(text);
          
          // Show success feedback
          button.innerHTML = '<span class="copy-text">Copied!</span>';
          button.classList.add('copied');
          
          // Reset after 2 seconds
          setTimeout(() => {
            button.innerHTML = '<span class="copy-text">Copy</span>';
            button.classList.remove('copied');
          }, 2000);
        } catch (err) {
          console.error('Failed to copy code: ', err);
          button.innerHTML = '<span class="copy-text">Error</span>';
          
          // Reset after 2 seconds
          setTimeout(() => {
            button.innerHTML = '<span class="copy-text">Copy</span>';
          }, 2000);
        }
      });
    });
  }

  // Run on initial load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addCopyButtons);
  } else {
    addCopyButtons();
  }

  // Also run when new content is added dynamically (e.g., with Turbo)
  document.addEventListener('turbo:load', addCopyButtons);
  document.addEventListener('htmx:afterSettle', addCopyButtons);
})();