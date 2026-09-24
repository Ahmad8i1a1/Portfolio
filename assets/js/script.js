/**
 * Ahmad Bilal - Futuristic Portfolio Script
 * Interactive HUD, Category Filters, Mobile Drawer & Scrollspy
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // 1. Header Scrolled State
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2. Mobile Drawer Navigation
  const navToggleBtn = document.querySelector('.nav-toggle-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const mobileCloseBtn = document.querySelector('.mobile-close-btn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openMobileNav = () => {
    mobileNav.classList.add('active');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileNav = () => {
    mobileNav.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (navToggleBtn) navToggleBtn.addEventListener('click', openMobileNav);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileNav);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileNav);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // 3. Scrollspy (Active Section Highlight)
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');

  const updateActiveNavLink = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
        mobileNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // 4. Multi-Category Project Filter
  const filterChips = document.querySelectorAll('.filter-chip');
  const projectCards = document.querySelectorAll('.project-card');

  const filterProjects = (selectedCategory) => {
    const target = selectedCategory.trim().toLowerCase();

    projectCards.forEach(card => {
      if (target === 'all') {
        card.classList.remove('hidden');
      } else {
        const cardCategories = (card.dataset.category || '')
          .toLowerCase()
          .split(',')
          .map(cat => cat.trim());

        if (cardCategories.includes(target)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      }
    });
  };

  filterChips.forEach(chip => {
    chip.addEventListener('click', function () {
      filterChips.forEach(c => c.classList.remove('active'));
      this.classList.add('active');

      const category = this.dataset.filterCategory || 'all';
      filterProjects(category);
    });
  });

  // 5. HUD Stats Counter Animation
  const statValues = document.querySelectorAll('.hud-value[data-count]');
  let hasAnimatedStats = false;

  const animateStats = () => {
    statValues.forEach(el => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const isFloat = el.dataset.float === 'true';
      let current = 0;
      const step = target / 40;

      const updateCounter = () => {
        current += step;
        if (current < target) {
          el.innerHTML = `${prefix}${isFloat ? current.toFixed(1) : Math.ceil(current)}<span class="accent">${suffix}</span>`;
          requestAnimationFrame(updateCounter);
        } else {
          el.innerHTML = `${prefix}${target}<span class="accent">${suffix}</span>`;
        }
      };
      updateCounter();
    });
  };

  const statsSection = document.querySelector('.hud-grid');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimatedStats) {
        hasAnimatedStats = true;
        animateStats();
      }
    }, { threshold: 0.2 });

    observer.observe(statsSection);
  }

  // 6. Contact Form Submission Feedback
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('.form-submit-btn');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<ion-icon name="checkmark-circle"></ion-icon> <span>Message Sent!</span>';
      submitBtn.style.background = 'linear-gradient(135deg, #00b67d 0%, #02d18f 100%)';

      setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
      }, 4000);
    });
  }

});