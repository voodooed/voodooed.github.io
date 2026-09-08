// Add intersection observer for fade in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all glass cards
document.querySelectorAll('.glass-card').forEach(card => {
    observer.observe(card);
});

// Enhanced Modal functionality
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove('hidden');
  modal.style.opacity = '0';
  document.body.style.overflow = 'hidden';
  
  requestAnimationFrame(() => {
      modal.style.opacity = '1';
      modal.style.transition = 'opacity 0.3s ease-in-out';
  });
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.opacity = '0';
  
  setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
  }, 300);
}

// Modal event listeners
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', function(e) {
      if (e.target === this) closeModal(this.id);
  });
});

async function loadPublications() {
  try {
    const res = await fetch('assets/js/publications.json');
    const data = await res.json();

    renderPublications('journalModal', data.journals, 'journal');
    renderPublications('proceedingsModal', data.proceedings, 'proceedings');
    renderPublications('blogModal', data.blogs, 'blogs');

  } catch (err) {
    console.error("Error loading publications:", err);
  }
}

function renderPublications(modalId, items, type) {
  const modalBody = document.querySelector(`#${modalId} .modal-body`);
  modalBody.innerHTML = '';

  items.forEach(item => {
    let html = '';
    if (type === 'journal') {
      html = `
        <div class="publication-full border-b border-gray-700 pb-6 mb-6">
          <h5 class="font-semibold mb-2">${item.title}</h5>
          <p class="text-sm text-gray-300 mb-3">${item.description}</p>
          <div class="text-xs text-gray-400 mb-3"><span class="font-medium">Authors:</span> ${item.authors}</div>
          <div class="text-xs text-gray-400 mb-3"><span class="font-medium">Journal:</span> ${item.journal}</div>
          <a href="${item.doi}" target="_blank" rel="noopener noreferrer" 
             class="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded inline-flex items-center transition-colors">
             View Paper <i class='bx bx-link-external ml-1'></i>
          </a>
        </div>`;
    } else if (type === 'proceedings') {
      html = `
        <div class="publication-full border-b border-gray-700 pb-6 mb-6">
          <h5 class="font-semibold">${item.title}</h5>
          <p class="text-sm text-gray-300">${item.authors}</p>
          <p class="text-xs text-gray-400 mt-1">${item.journal}</p>
          <a href="${item.doi}" target="_blank" rel="noopener noreferrer"
             class="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded inline-flex items-center mt-3 transition-colors">
             View Paper <i class='bx bx-link-external ml-1'></i>
          </a>
        </div>`;
    } else if (type === 'blogs') {
      html = `
        <div class="publication-full border-b border-gray-700 pb-6 mb-6">
          <h5 class="font-semibold">${item.title}</h5>
          <p class="text-sm text-gray-300">${item.authors || ''}</p>
          <p class="text-xs text-gray-400 mt-1">${item.journal || ''}</p>
    
          <a href="${item.link}" target="_blank" rel="noopener noreferrer"
             class="text-xs bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded inline-flex items-center mt-3 transition-colors">
             View Blog<i class='bx bx-link-external ml-1'></i>
          </a>
        </div>`;
    }
    
    modalBody.innerHTML += html;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadPublications();

  // Modal open buttons
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      openModal(btn.getAttribute('data-modal'));
    });
  });

  // Modal close buttons
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(btn.closest('.modal').id);
    });
  });
});

// Get DOM Elements
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenuButton = document.getElementById('close-menu');
const mobileNavLinks = document.querySelectorAll('.nav-link-mobile');

// Toggle mobile menu open
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.remove('hidden');
});

// Close mobile menu
closeMenuButton.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
});

// Close mobile menu when a mobile nav link is clicked
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Optionally close when clicking the backdrop (background overlay in menu)
mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
});

function addSmoothScroll(selector) {
    document.querySelectorAll(selector).forEach(link => {
        link.addEventListener('click', function(e) {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const section = document.querySelector(href);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}
addSmoothScroll('.nav-link');
addSmoothScroll('.nav-link-mobile');

document.addEventListener("scroll", function () {
  const hiddenText = document.querySelector(".footer-hidden");

  const scrolledToBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;

    if (scrolledToBottom) {
      hiddenText.classList.add("visible");
    } else {
      hiddenText.classList.remove("visible");
    }
});

// Function to handle CV download
function downloadCV() {
    // Check if the file exists
    fetch('assets/Documents/Vivek_IITK_CV.pdf')
      .then(response => {
        if (response.ok) {
          // Open in new tab if file exists
          window.open('assets/Documents/Vivek_IITK_CV.pdf', '_blank');
        } else {
          // Show error if file doesn't exist
          alert('CV file not found. Please contact me directly.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error loading CV. Please try again later.');
      });
  }
  
  // Add event listener to the button
  document.addEventListener('DOMContentLoaded', function() {
    const cvButton = document.querySelector('.cv-button');
    if (cvButton) {
      cvButton.addEventListener('click', downloadCV);
    }
  });

// Award button functionality
document.querySelector('.award-item button')?.addEventListener('click', (e) => {
  e.stopPropagation();
  window.open('https://www.mitacs.ca/en/programs/globalink/globalink-research-award', '_blank');
});

// === Typewriter Text Rotation ===
document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".cd-words-wrapper b");
  let currentIndex = 0;
  const intervalTime = 2000; // Time in milliseconds between transitions

  setInterval(() => {
    // Remove 'is-visible' from all
    items.forEach((item) => item.classList.remove("is-visible"));

    // Add 'is-visible' to the current item
    items[currentIndex].classList.add("is-visible");

    // Move to the next index, wrapping around if necessary
    currentIndex = (currentIndex + 1) % items.length;
  }, intervalTime);
});