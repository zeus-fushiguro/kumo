/**
 * KUMO Theme - Scroll Reveal Animation
 * Simple IntersectionObserver-based reveal on scroll
 */

(function() {
  'use strict';

  // Check if reduced motion is preferred
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // If user prefers reduced motion, show all elements immediately
    document.querySelectorAll('.kumo-reveal').forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  // IntersectionObserver options
  const observerOptions = {
    root: null,
    rootMargin: '-50px 0px',
    threshold: 0.1
  };

  // Create observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Stop observing once revealed
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with .kumo-reveal class
  function initReveal() {
    document.querySelectorAll('.kumo-reveal').forEach(el => {
      observer.observe(el);
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
  } else {
    initReveal();
  }

  // Re-initialize on Shopify section load (for theme editor)
  document.addEventListener('shopify:section:load', initReveal);
})();
