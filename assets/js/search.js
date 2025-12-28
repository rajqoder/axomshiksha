// Search functionality
let searchIndex = null;

async function loadSearchIndex() {
  if (searchIndex === null) {
    try {
      const response = await fetch('/search.json');
      searchIndex = await response.json();
    } catch {
      searchIndex = [];
    }
  }
  return searchIndex;
}

function debounce(fn, delay) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('search-modal');
  const overlay = document.getElementById('search-overlay');
  const button = document.getElementById('search-button');
  const input = document.getElementById('search-input');
  const resultsBox = document.getElementById('search-results');
  const closeBtns = document.querySelectorAll('.close-search-modal');

  let resultLinks = [];

  /* ---------- Modal ---------- */

  const openModal = () => {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input.focus(), 100);
  };

  const closeModal = () => {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    input.value = '';
    resultsBox.innerHTML = '';
    resultLinks = [];
  };

  button?.addEventListener('click', e => {
    e.preventDefault();
    openModal();
  });

  overlay?.addEventListener('click', closeModal);
  closeBtns.forEach(b => b.addEventListener('click', closeModal));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  /* ---------- Search ---------- */

  const runSearch = debounce(async () => {
    const term = input.value.trim().toLowerCase();
    if (!term) {
      resultsBox.innerHTML = '';
      resultLinks = [];
      return;
    }

    const posts = await loadSearchIndex();
    const matches = posts.filter(p =>
      (p.title || '').toLowerCase().includes(term)
    );

    renderResults(matches);
  }, 300);

  input.addEventListener('input', runSearch);

  /* ---------- Keyboard Handling ---------- */

  input.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' && resultLinks.length) {
      e.preventDefault();
      resultLinks[0].focus();
    }
  });

  function renderResults(posts) {
    if (!posts.length) {
      resultsBox.innerHTML = `
        <p class="text-center text-white py-8">No results found</p>
      `;
      resultLinks = [];
      return;
    }

    resultsBox.innerHTML = posts.slice(0, 10).map((p, i) => `
      <a href="${p.url}"
         data-index="${i}"
         tabindex="0"
         class="block p-4 border-b border-gray-200 dark:border-gray-700
                hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
        <h3 class="font-medium text-white">${p.title}</h3>
        <p class="text-sm text-white mt-1">
          ${p.publishTime ? new Date(p.publishTime).toLocaleDateString() : ''}
        </p>
      </a>
    `).join('');

    resultLinks = [...resultsBox.querySelectorAll('a')];

    resultLinks.forEach((link, i) => {
      link.addEventListener('keydown', e => {
        if (e.key === 'ArrowDown' && i < resultLinks.length - 1) {
          e.preventDefault();
          resultLinks[i + 1].focus();
        }

        if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (i === 0) input.focus();
          else resultLinks[i - 1].focus();
        }

        if (e.key === 'Enter') {
          window.location.href = link.href;
        }
      });

      link.addEventListener('click', closeModal);
    });
  }
});
