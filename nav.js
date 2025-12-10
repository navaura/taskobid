// Dynamic Navigation Generator with Mobile Hamburger Menu
(function () {
  'use strict';

  // Navigation configuration
  const navConfig = {
    logo: {
      text: 'TaskoBid',
      href: '/'
    },
    links: [
      { text: 'Home', href: '/' },
      { text: 'How It Works', href: 'how-it-works.html' },
      { text: 'Categories', href: 'categories.html' },
      { text: 'For Providers', href: 'for-providers.html' },
      { text: 'Pricing', href: 'pricing.html' },
      { text: 'Safety & Trust', href: 'safety.html' },
      { text: 'About', href: 'about.html' },
      { text: 'Contact', href: 'contact.html' }
    ]
  };

  // Detect current page
  function getCurrentPage() {
    let path = window.location.pathname;
    return path.split('/').pop().replace('.html', '') || 'index';
  }

  // Generate navigation markup
  function generateNav() {
    const currentPage = getCurrentPage();

    const linksHTML = navConfig.links
      .map(link => {
        const isActive = currentPage === link.href ? ' active' : '';
        return `<a href="${link.href}" class="nav-link${isActive}">${link.text}</a>`;
      })
      .join('\n');

    return `
      <nav class="main-nav">
        <div class="container">
          <div class="nav-content">

            <a href="${navConfig.logo.href}" class="nav-logo">
              <img src="./logo3.png" alt="TaskoBid Logo"
                   style="height:77px; width:auto; margin-right:6px;
                   filter: brightness(0) saturate(90%) invert(80%) sepia(0%) hue-rotate(0deg);">
            </a>

            <button class="hamburger" id="hamburgerBtn" aria-label="Menu">
              <span></span>
              <span></span>
              <span></span>
            </button>

            <div class="nav-links" id="navLinks">
              ${linksHTML}
            </div>

          </div>
        </div>
      </nav>
    `;
  }

  // Enhancements for mobile drawer UX
  function setupHamburger() {
    const hamburger = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');

    if (!hamburger || !navLinks) return;

    let isDragging = false;

    // Prevent accidental close when scrolling menu
    navLinks.addEventListener('touchstart', () => {
      isDragging = false;
    });

    navLinks.addEventListener('touchmove', () => {
      isDragging = true;
    });

    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.classList.toggle('nav-open');
    });

    // Close menu when clicking a navigation link (but NOT when scrolling)
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (!isDragging) { 
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
          document.body.classList.remove('nav-open');
        }
      });
    });
function enableDrawerScroll() {
  navLinks.addEventListener('touchmove', function (e) {
    // Allow scrolling within the nav drawer
    const isScrollable = navLinks.scrollHeight > navLinks.clientHeight;
    if (isScrollable) {
      e.stopPropagation();
    }
  }, { passive: false });
}

enableDrawerScroll();

    // Close when tapping outside (but ignore scroll movement)
    document.addEventListener('click', function (e) {
      if (
        !isDragging &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('nav-open');
      }
    });

    // Escape key closes menu
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('nav-open');
      }
    });
  }

  // Insert navigation into DOM
  function insertNav() {
    const navHTML = generateNav();
    const progress = document.getElementById('progress');

    if (progress && progress.nextSibling) {
      progress.insertAdjacentHTML('afterend', navHTML);
    } else {
      document.body.insertAdjacentHTML('afterbegin', navHTML);
    }

    setupHamburger();
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertNav);
  } else {
    insertNav();
  }
})();
