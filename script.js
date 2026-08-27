document.documentElement.classList.add('js');

// header shrink on scroll
const header = document.getElementById('siteHeader');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 12);
  });
}

// mobile nav
const burger = document.getElementById('burger');
const mobilePanel = document.getElementById('mobilePanel');
if (burger && mobilePanel) {
  // Set up ARIA attributes
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-controls', 'mobilePanel');
  mobilePanel.setAttribute('aria-hidden', 'true');
  
  const togglePanel = () => {
    const isOpen = mobilePanel.classList.contains('open');
    mobilePanel.classList.toggle('open');
    burger.setAttribute('aria-expanded', !isOpen);
    burger.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    mobilePanel.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
    
    // Scroll lock: prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
    
    // Focus management: focus first link when opening
    if (!isOpen) {
      setTimeout(() => mobilePanel.querySelector('a')?.focus(), 100);
    } else {
      burger.focus();
    }
  };
  
  burger.addEventListener('click', togglePanel);
  
  // Close on link click
  mobilePanel.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobilePanel.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Open navigation menu');
      mobilePanel.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = 'auto';
      burger.focus();
    });
  });
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobilePanel.classList.contains('open')) {
      mobilePanel.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Open navigation menu');
      mobilePanel.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = 'auto';
      burger.focus();
    }
  });
  
  // Focus trap: keep focus within panel when open
  const focusableElements = 'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
  mobilePanel.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || !mobilePanel.classList.contains('open')) return;
    
    const focusables = Array.from(mobilePanel.querySelectorAll(focusableElements));
    const firstFocusable = focusables[0];
    const lastFocusable = focusables[focusables.length - 1];
    
    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable?.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable?.focus();
      }
    }
  });
}

// scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// contact form handling with validation
const form = document.getElementById('quoteForm');
if (form) {
  const status = document.getElementById('formStatus');
  const submitBtn = form.querySelector('button[type="submit"]');
  
  // Validation rules
  const validators = {
    name: (val) => val.trim().length > 0 ? null : 'Full name is required',
    email: (val) => {
      if (!val.trim()) return 'Email is required';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(val) ? null : 'Enter a valid email address';
    },
    phone: (val) => {
      if (!val.trim()) return 'Phone number is required';
      // South Africa phone format: various acceptable formats
      const phoneRegex = /^(\+27|0)[1-9]\d{8}$|^(\+27|0)\d{1}[\s\-]?\d{3}[\s\-]?\d{4}$/;
      const normalized = val.replace(/[\s\-]/g, '');
      return phoneRegex.test(normalized) ? null : 'Enter a valid SA phone number (e.g., 082 000 0000 or +27 82 000 0000)';
    },
    message: (val) => val.trim().length > 0 ? null : 'Please tell us about your setup'
  };

  // Clear error message when user starts typing
  ['name', 'email', 'phone', 'message'].forEach(fieldName => {
    const field = form.querySelector(`[name="${fieldName}"]`);
    if (field) {
      field.addEventListener('input', () => {
        const error = form.querySelector(`[data-error-for="${fieldName}"]`);
        if (error) error.remove();
        field.setAttribute('aria-invalid', 'false');
        field.removeAttribute('aria-describedby');
      });
    }
  });

  // Validate and show errors
  const validateForm = () => {
    let isValid = true;
    const errors = {};

    ['name', 'email', 'phone', 'message'].forEach(fieldName => {
      const field = form.querySelector(`[name="${fieldName}"]`);
      if (field) {
        const error = validators[fieldName](field.value);
        if (error) {
          errors[fieldName] = error;
          isValid = false;
          
          // Mark field as invalid
          field.setAttribute('aria-invalid', 'true');
          
          // Remove old error if exists
          const oldError = form.querySelector(`[data-error-for="${fieldName}"]`);
          if (oldError) oldError.remove();
          
          // Create and show error message
          const errorEl = document.createElement('p');
          errorEl.className = 'field-error';
          errorEl.setAttribute('data-error-for', fieldName);
          errorEl.setAttribute('role', 'alert');
          errorEl.textContent = error;
          field.parentElement.appendChild(errorEl);
          
          // Set aria-describedby
          field.setAttribute('aria-describedby', `error-${fieldName}`);
          errorEl.id = `error-${fieldName}`;
        } else {
          field.setAttribute('aria-invalid', 'false');
        }
      }
    });

    return isValid;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      status.textContent = 'Please fix the errors above before submitting.';
      status.className = 'show error';
      status.setAttribute('role', 'alert');
      return;
    }

    // Disable submit button and show sending state
    submitBtn.disabled = true;
    status.textContent = 'Sending...';
    status.className = 'show';
    status.removeAttribute('role');

    try {
      // Send form data to Formspree endpoint
      // Replace YOUR_FORM_ID with your actual Formspree form ID
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        status.textContent = "Thanks — your request has been sent. We'll be in touch within one business day.";
        status.className = 'show ok';
        status.setAttribute('role', 'status');
        form.reset();
        
        // Clear any error messages
        form.querySelectorAll('[data-error-for]').forEach(el => el.remove());
        form.querySelectorAll('[aria-invalid]').forEach(el => el.setAttribute('aria-invalid', 'false'));
      } else {
        throw new Error('Server error: ' + response.status);
      }
    } catch (error) {
      status.textContent = 'Unable to send your request. Please try again or call +27 67 203 3731 directly.';
      status.className = 'show error';
      status.setAttribute('role', 'alert');
      console.error('Form submission error:', error);
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
    }
  });
}

// FAQ accordion (pricing.html)
document.querySelectorAll('.faq-q').forEach(btn => {
  // Set initial aria-expanded state
  btn.setAttribute('aria-expanded', btn.closest('.faq-item')?.classList.contains('open') ? 'true' : 'false');
  
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item?.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
});

// footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();