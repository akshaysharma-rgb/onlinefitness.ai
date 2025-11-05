// Basic shared JS for mobile menu + contact form fake submit + year injection

document.addEventListener('DOMContentLoaded', function () {
  // Add year to all year spans if present
  const year = new Date().getFullYear();
  ['year','yearServices','yearFeatures','yearContact'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = year;
  });

  // Generic mobile toggles (there are multiple header instances on pages)
  const toggles = document.querySelectorAll('.mobile-toggle');
  toggles.forEach(btn => {
    btn.addEventListener('click', function () {
      // find the nearest nav
      const parent = btn.closest('.header-inner') || document;
      const nav = parent.querySelector('.main-nav');
      if (!nav) return;

      if (nav.style.display === 'flex' || nav.classList.contains('open')) {
        nav.style.display = '';
        nav.classList.remove('open');
      } else {
        nav.style.display = 'flex';
        nav.classList.add('open');
      }
    });
  });

  // Simple contact form behaviour (fake)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const formMsg = document.getElementById('formMsg');
    const submitBtn = document.getElementById('submitBtn');

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // Basic validation
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      if (!name || !email) {
        formMsg.style.color = 'crimson';
        formMsg.textContent = 'Please fill name and email.';
        return;
      }
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      // fake send (no networking)
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        formMsg.style.color = 'green';
        formMsg.textContent = 'Thanks! This is a demo form — message received (fake).';
        contactForm.reset();
      }, 900);
    });

    // also handle button click in our demo pages which include onsubmit="return false;"
    if (!contactForm.hasAttribute('onsubmit')) {
      // do nothing; else if onsubmit present the browser won't send; we still intercept
    }
  }
});
