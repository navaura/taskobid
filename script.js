// ============================================
// INTERACTIVE FEATURES - POLISHED VERSION
// ============================================

// ------------------------------
// Progress Bar
// ------------------------------
const progressBar = document.getElementById('progress');
if (progressBar) {
  const updateProgressBar = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (window.pageYOffset / totalHeight) * 100;
    progressBar.style.width = `${scrollPercentage}%`;
  };
  
  window.addEventListener('scroll', updateProgressBar);
}



// ------------------------------
// Carousel Slider
// ------------------------------
const carouselTrack = document.getElementById('track');
if (carouselTrack && carouselTrack.parentElement) {
  let position = 0;
  let isPaused = false;
  const scrollSpeed = 0.5;
  
  const animateCarousel = () => {
    if (!isPaused && carouselTrack && carouselTrack.scrollWidth) {
      position += scrollSpeed;
      const trackHalfWidth = carouselTrack.scrollWidth / 2;
      
      // Reset position for infinite loop
      if (position >= trackHalfWidth) {
        position = 0;
      }
      
      carouselTrack.style.transform = `translateX(-${position}px)`;
    }
    requestAnimationFrame(animateCarousel);
  };
  
  // Pause on hover
  const carouselContainer = carouselTrack.parentElement;
  carouselContainer.addEventListener('mouseenter', () => {
    isPaused = true;
  });
  
  carouselContainer.addEventListener('mouseleave', () => {
    isPaused = false;
  });
  
  // Start animation
  animateCarousel();
}

// ------------------------------
// Smooth Scroll for Anchor Links
// ------------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ------------------------------
// Coming Soon Notification - NUCLEAR OPTION
// ------------------------------
function showComingSoonNotification(event) {
  // STOP EVERYTHING
  if (event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  }
  
  const notification = document.createElement('div');
  notification.textContent = '🚀 Coming Soon';
  
  // Notification styles
  Object.assign(notification.style, {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#111',
    color: '#fff',
    padding: '14px 24px',
    fontSize: '16px',
    fontWeight: '500',
    borderRadius: '10px',
    opacity: '0',
    transition: 'opacity 0.3s ease',
    zIndex: '999999',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
    pointerEvents: 'none'
  });
  
  document.body.appendChild(notification);
  
  // Fade in
  requestAnimationFrame(() => {
    notification.style.opacity = '1';
  });
  
  // Fade out and remove
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  }, 1200);
  
  return false;
}

// Attach to all elements with "soon" class - NUCLEAR APPROACH
const attachComingSoon = () => {
  document.querySelectorAll('.soon').forEach(element => {
    // KILL the href completely
    if (element.tagName === 'A') {
      element.href = 'javascript:void(0);';
      element.style.cursor = 'pointer';
    }
    
    // Remove ALL existing listeners by cloning
    const newElement = element.cloneNode(true);
    element.parentNode.replaceChild(newElement, element);
    
    // Add our listener to the fresh element
    newElement.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      showComingSoonNotification(e);
      return false;
    }, true);
    
    newElement.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      showComingSoonNotification(e);
      return false;
    }, false);
  });
};

// Run on load
window.addEventListener('load', () => {
  attachComingSoon();
  // Re-attach after a delay to catch late-loading elements
  setTimeout(attachComingSoon, 500);
  setTimeout(attachComingSoon, 1000);
});

// Also run immediately
if (document.readyState !== 'loading') {
  attachComingSoon();
} else {
  document.addEventListener('DOMContentLoaded', attachComingSoon);
}