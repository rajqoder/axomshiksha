// Copy link functionality
(function() {
  // Function to initialize copy link button
  function initCopyLinkButton() {
    // Add click event to copy link button
    const copyButton = document.getElementById('copy-link-button');
    
    if (copyButton) {
      copyButton.addEventListener('click', async function() {
        try {
          // Get the current page URL
          const url = window.location.href;
          
          // Copy to clipboard
          await navigator.clipboard.writeText(url);
          
          // Show success feedback
          const originalText = copyButton.querySelector('.copy-text').textContent;
          copyButton.querySelector('.copy-text').textContent = 'Copied!';
          copyButton.classList.add('copied');
          
          // Reset after 2 seconds
          setTimeout(() => {
            copyButton.querySelector('.copy-text').textContent = originalText;
            copyButton.classList.remove('copied');
          }, 2000);
        } catch (err) {
          console.error('Failed to copy link: ', err);
          copyButton.querySelector('.copy-text').textContent = 'Error';
          
          // Reset after 2 seconds
          setTimeout(() => {
            copyButton.querySelector('.copy-text').textContent = 'Copy Link';
          }, 2000);
        }
      });
    }
  }

  // Run on initial load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCopyLinkButton);
  } else {
    initCopyLinkButton();
  }

  // Also run when new content is added dynamically (e.g., with Turbo)
  document.addEventListener('turbo:load', initCopyLinkButton);
  document.addEventListener('htmx:afterSettle', initCopyLinkButton);
})();