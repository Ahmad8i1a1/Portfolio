/**
 * Ahmad Bilal - Game Developer & AI Systems Engineer Portfolio
 * Interactive Flow, Swiper Slider, Tabbed Experience, Services Accordion, Custom Cursor
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* 1. Mobile Menu Toggle */
  const navToggle = document.getElementById('nav-toggle'),
    navMenu = document.getElementById('nav-menu'),
    navClose = document.getElementById('nav-close'),
    navLinks = document.querySelectorAll('.nav__link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu');
    });
  }

  if (navClose && navMenu) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu) navMenu.classList.remove('show-menu');
    });
  });

  /* 2. Scroll Section Active Link (ScrollSpy) */
  const sections = document.querySelectorAll('section[id]');
  const scrollActive = () => {
    const scrollY = window.scrollY;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 120,
        sectionId = current.getAttribute('id'),
        sectionLink = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);

      if (sectionLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          sectionLink.classList.add('active-link');
        } else {
          sectionLink.classList.remove('active-link');
        }
      }
    });
  };
  window.addEventListener('scroll', scrollActive, { passive: true });

  /* 3. Swiper Projects Carousel */
  if (typeof Swiper !== 'undefined') {
    new Swiper('.projects__swiper', {
      loop: true,
      spaceBetween: 24,
      slidesPerView: 1,
      grabCursor: true,
      speed: 600,
      breakpoints: {
        700: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1100: {
          slidesPerView: 2.5,
          spaceBetween: 32,
        },
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
    });
  }

  /* 4. Projects Category Filter (for Full Catalog Grid) */
  const filterBtns = document.querySelectorAll('.projects__filter-btn');
  const projectCards = document.querySelectorAll('.projects__grid-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = (btn.dataset.category || 'all').toLowerCase().trim();

        projectCards.forEach(card => {
          if (category === 'all') {
            card.classList.remove('hidden');
          } else {
            const cardCats = (card.dataset.category || '')
              .toLowerCase()
              .split(',')
              .map(c => c.trim());

            if (cardCats.includes(category)) {
              card.classList.remove('hidden');
            } else {
              card.classList.add('hidden');
            }
          }
        });
      });
    });
  }

  /* 5. Work Experience & Education Tabs */
  const workTabs = document.querySelectorAll('.work__button');
  const workContents = document.querySelectorAll('.work__content');

  workTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetSelector = tab.dataset.target;
      const targetContent = document.querySelector(targetSelector);

      if (targetContent) {
        workTabs.forEach(t => t.classList.remove('work-active'));
        workContents.forEach(c => c.classList.remove('work-active'));

        tab.classList.add('work-active');
        targetContent.classList.add('work-active');
      }
    });
  });

  /* 6. Services / Capabilities Accordion */
  const serviceButtons = document.querySelectorAll('.services__button');

  serviceButtons.forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.services__card');
      const allCards = document.querySelectorAll('.services__card');
      const info = card.querySelector('.services__info');
      const isOpen = card.classList.contains('services__open');

      // Close all cards
      allCards.forEach(c => {
        c.classList.remove('services__open');
        const i = c.querySelector('.services__info');
        if (i) i.style.height = '0px';
      });

      // Open current if it was closed
      if (!isOpen && info) {
        card.classList.add('services__open');
        info.style.height = `${info.scrollHeight}px`;
      }
    });
  });

  /* 7. Testimonials Infinite Duplication */
  const testimonialTracks = document.querySelectorAll('.testimonials__content');
  testimonialTracks.forEach(track => {
    const cards = Array.from(track.children);
    cards.forEach(card => {
      track.appendChild(card.cloneNode(true));
    });
  });

  /* 8. One-Click Copy Email to Clipboard */
  const copyBtn = document.getElementById('contact-btn');
  const copyEmailEl = document.getElementById('contact-email');

  if (copyBtn && copyEmailEl) {
    const rawEmail = copyEmailEl.textContent.trim();
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(rawEmail).then(() => {
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = `Email Copied! <i class="ri-check-line"></i>`;
        copyBtn.style.borderColor = 'hsl(160, 80%, 45%)';
        copyBtn.style.color = '#fff';

        setTimeout(() => {
          copyBtn.innerHTML = originalHTML;
          copyBtn.style.borderColor = '';
          copyBtn.style.color = '';
        }, 2500);
      });
    });
  }

  /* 9. Live Year in Footer */
  const footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  /* 10. Custom Smooth Cursor */
  const cursor = document.querySelector('.cursor');
  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const updateCursor = () => {
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
      cursor.style.transform = 'translate(-50%, -50%)';
      requestAnimationFrame(updateCursor);
    };
    updateCursor();

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .projects__filter-btn');
    interactiveElements.forEach(item => {
      item.addEventListener('mouseenter', () => cursor.classList.add('hide-cursor'));
      item.addEventListener('mouseleave', () => cursor.classList.remove('hide-cursor'));
    });
  }

  /* 11. ScrollReveal Animations */
  if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
      origin: 'top',
      distance: '40px',
      duration: 1200,
      delay: 200,
      reset: false,
    });

    sr.reveal('.home__data', { origin: 'left' });
    sr.reveal('.home__image', { origin: 'right', delay: 400 });
    sr.reveal('.home__stats', { origin: 'bottom', delay: 500 });
    sr.reveal('.about__image', { origin: 'left' });
    sr.reveal('.about__data', { origin: 'right' });
    sr.reveal('.projects__filters', { origin: 'bottom' });
    sr.reveal('.work__tabs, .work__area', { origin: 'bottom' });
    sr.reveal('.services__card', { interval: 150 });
    sr.reveal('.testimonials__container', { origin: 'bottom' });
    sr.reveal('.contact__box', { interval: 150 });
    sr.reveal('.contact__form-wrapper', { origin: 'bottom', delay: 300 });
  }

  /* 12. Direct Google Form Submission & Drive Sync */
  const contactForm = document.getElementById('portfolio-contact-form');
  const formSubmitBtn = document.getElementById('form-submit-btn');
  const formStatusAlert = document.getElementById('form-status-alert');
  const formSubject = document.getElementById('form-subject');
  const formMessage = document.getElementById('form-message');

  window.handleGoogleFormSuccess = () => {
    if (formSubmitBtn) {
      formSubmitBtn.disabled = false;
      formSubmitBtn.innerHTML = `<span>Sent to Google Drive!</span> <i class="ri-checkbox-circle-fill"></i>`;
      formSubmitBtn.style.background = 'linear-gradient(60deg, #10b981 0%, #059669 100%)';
    }
    if (formStatusAlert) {
      formStatusAlert.className = 'form__status success';
      formStatusAlert.innerHTML = `<i class="ri-checkbox-circle-fill"></i> Thank you! Your message was submitted directly and recorded in my Google Drive Sheet.`;
      formStatusAlert.style.display = 'block';
    }
    if (contactForm) {
      contactForm.reset();
    }
    setTimeout(() => {
      if (formSubmitBtn) {
        formSubmitBtn.innerHTML = `<span>Send Message to Drive</span> <i class="ri-send-plane-fill"></i>`;
        formSubmitBtn.style.background = '';
      }
    }, 4500);
  };

  if (contactForm) {
    contactForm.addEventListener('submit', () => {
      // Prepend selected category to message for clear recording in Google Sheets
      if (formSubject && formMessage) {
        const subjectVal = formSubject.value;
        const currentMsg = formMessage.value.trim();
        if (subjectVal && !currentMsg.startsWith('[Category:')) {
          formMessage.value = `[Category: ${subjectVal}]\n\n${currentMsg}`;
        }
      }

      window.googleFormSubmitted = true;
      if (formSubmitBtn) {
        formSubmitBtn.disabled = true;
        formSubmitBtn.innerHTML = `<span>Sending to Google Drive...</span> <i class="ri-loader-4-line ri-spin"></i>`;
      }
      if (formStatusAlert) {
        formStatusAlert.className = 'form__status';
        formStatusAlert.style.display = 'none';
      }

      // Trigger background no-cors fetch alongside iframe post for redundancy
      try {
        const formData = new FormData(contactForm);
        fetch(contactForm.action, {
          method: 'POST',
          mode: 'no-cors',
          body: formData
        }).then(() => {
          setTimeout(() => {
            if (window.googleFormSubmitted) {
              window.handleGoogleFormSuccess();
              window.googleFormSubmitted = false;
            }
          }, 500);
        }).catch(() => {});
      } catch (e) {}

      // Safety fallback timer if iframe onload or network takes longer
      setTimeout(() => {
        if (window.googleFormSubmitted) {
          window.handleGoogleFormSuccess();
          window.googleFormSubmitted = false;
        }
      }, 1500);
    });
  }

});