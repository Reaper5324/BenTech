document.documentElement.classList.add('js');

// Ensure the shared enhancement layer is loaded after the base stylesheet on
// every page, including the compact one-line Academy/Talent documents.
if (!document.querySelector('link[href="enhancements.css"]')) {
  const enhancementLink = document.createElement('link');
  enhancementLink.rel = 'stylesheet';
  enhancementLink.href = 'enhancements.css';
  document.head.appendChild(enhancementLink);
}

// Academy and Talent are intentionally compact documents, but they still need
// the same mobile navigation contract as the full pages.
if (!document.getElementById('mobilePanel') && document.body.classList.contains('hub-home')) {
  const panel = document.createElement('nav');
  panel.id = 'mobilePanel';
  panel.className = 'mobile-panel';
  panel.setAttribute('aria-label', 'Mobile navigation');
  panel.innerHTML = '<a href="index.html">Home</a><a href="services.html">Solutions</a><a href="academy.html">Academy</a><a href="talent.html">Talent</a><a href="about.html">About</a><a href="contact.html">Contact</a><a href="contact.html" class="btn btn-primary">Request assessment</a>';
  document.body.insertBefore(panel, document.body.firstElementChild?.nextSibling || null);
}

// Use the supplied master mark consistently in headers, footers and browser tabs.
const suppliedLogo = '33472.png';
document.querySelectorAll('.brand').forEach((brand) => {
  const image = brand.querySelector('.hub-logo');
  if (image) image.src = suppliedLogo;
  else {
    brand.querySelector('.brand-mark')?.remove();
    const mark = document.createElement('img');
    mark.className = 'hub-logo'; mark.src = suppliedLogo; mark.alt = '';
    brand.insertBefore(mark, brand.firstChild);
  }
  brand.classList.add('logo-replaced');
});
if (!document.querySelector('link[rel="icon"]')) {
  const favicon = document.createElement('link');
  favicon.rel = 'icon'; favicon.type = 'image/svg+xml'; favicon.href = suppliedLogo;
  document.head.appendChild(favicon);
}

// Continuous, ambient network animation for the hero of every page.
// It is decorative only and never captures pointer or keyboard input.
const motionStage = document.querySelector('.hub-hero, .page-hero');
if (motionStage && !motionStage.querySelector('.motion-field')) {
  const field = document.createElement('div');
  field.className = 'motion-field';
  field.setAttribute('aria-hidden', 'true');
  field.innerHTML = '<div class="field-grid"></div><div class="field-orbit orbit-a"></div><div class="field-orbit orbit-b"></div><div class="field-line line-a"></div><div class="field-line line-b"></div><div class="field-line line-c"></div><i class="field-node node-a"></i><i class="field-node node-b"></i><i class="field-node node-c"></i><i class="field-node node-d"></i><i class="field-node node-e"></i><span class="field-beam beam-a"></span><span class="field-beam beam-b"></span>';
  motionStage.appendChild(field);
}

// Load TikTok's official creator embed only when the home-page showcase is near view.
const tiktokShowcase = document.querySelector('.hub-social');
if (tiktokShowcase) {
  const embed = tiktokShowcase.querySelector('.tiktok-embed');
  const fallback = tiktokShowcase.querySelector('.hub-social-fallback');
  const showTikTokFallback = () => {
    tiktokShowcase.classList.add('embed-failed');
    fallback?.removeAttribute('hidden');
  };
  const loadTikTokEmbed = () => {
    if (window.tiktokEmbedRequested) return;
    window.tiktokEmbedRequested = true;
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    script.onload = () => window.setTimeout(() => {
      if (!embed?.querySelector('iframe')) showTikTokFallback();
    }, 3000);
    script.onerror = showTikTokFallback;
    document.body.appendChild(script);
  };
  if (fallback) fallback.setAttribute('hidden', '');
  const startWhenIdle = window.requestIdleCallback || ((callback) => window.setTimeout(callback, 1200));
  startWhenIdle(loadTikTokEmbed, { timeout: 1800 });
  new IntersectionObserver((entries, observer) => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    loadTikTokEmbed();
    observer.disconnect();
  }, { rootMargin: '300px' }).observe(tiktokShowcase);
}

// Bring the compact Academy footer up to the same useful contact standard.
if (document.body.classList.contains('academy-page')) {
  const footerContainer = document.querySelector('footer .container');
  if (footerContainer && !footerContainer.querySelector('.footer-detail-grid')) {
    const details = document.createElement('div');
    details.className = 'footer-detail-grid';
    details.innerHTML = '<div><b>BenTechHub Academy</b><p>Practical networking, cybersecurity and cloud training with mentor support.</p></div><div><b>Contact</b><a href="mailto:info@bentechhub.co.za">info@bentechhub.co.za</a><a href="https://wa.me/27672033731">WhatsApp support</a></div><div><b>Explore</b><a href="services.html">Solutions</a><a href="talent.html">Talent network</a></div>';
    footerContainer.insertBefore(details, footerContainer.firstElementChild);
  }

}

// Keep the complete navigation architecture consistent across every page.
const current = location.pathname.split('/').pop() || 'index.html';
const items = [['index.html','Home'],['services.html','Solutions'],['managed-It.html','Managed IT'],['pricing.html','Pricing'],['academy.html','Academy'],['talent.html','Talent'],['about.html','About'],['contact.html','Contact']];
const desktop = document.querySelector('nav.links');
if (desktop) desktop.innerHTML = items.map(([href,label]) => `<a href="${href}" class="${current === href ? 'active' : ''}">${label}</a>`).join('');
const mobile = document.getElementById('mobilePanel');
if (mobile) mobile.innerHTML = items.map(([href,label]) => `<a href="${href}">${label}</a>`).join('') + '<a href="contact.html" class="btn btn-primary">Request assessment</a>';

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
    // Validate form
    if (!validateForm()) {
      e.preventDefault();
      status.textContent = 'Please fix the errors above before submitting.';
      status.className = 'show error';
      status.setAttribute('role', 'alert');
      return;
    }

    if (form.hasAttribute('data-netlify')) {
      status.textContent = "Thanks - sending your request securely.";
      status.className = 'show ok';
      status.setAttribute('role', 'status');
      return;
    }

    e.preventDefault();

    // Disable submit button and show sending state
    submitBtn.disabled = true;
    status.textContent = 'Sending...';
    status.className = 'show';
    status.removeAttribute('role');

    try {
      // The repository intentionally does not contain a live Formspree form ID.
      // Keep the contact flow useful in static hosting by handing the validated
      // request to the visitor's email client instead of making a doomed API call.
      const endpoint = '';
      if (!endpoint) {
        const values = Object.fromEntries(new FormData(form).entries());
        const subject = encodeURIComponent(`BenTechHub assessment request — ${values.name || 'Website enquiry'}`);
        const body = encodeURIComponent([
          `Name: ${values.name || ''}`,
          `Company: ${values.company || ''}`,
          `Email: ${values.email || ''}`,
          `Phone: ${values.phone || ''}`,
          `Service: ${values.service || ''}`,
          '', values.message || ''
        ].join('\n'));
        status.textContent = 'Opening your email app with the request ready to send.';
        status.className = 'show ok';
        status.setAttribute('role', 'status');
        window.location.href = `mailto:info@bentechhub.co.za?subject=${subject}&body=${body}`;
        submitBtn.disabled = false;
        return;
      }
      // Send form data to a configured Formspree endpoint when one is supplied.
      const response = await fetch(endpoint, {
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

// Small, pointer-based depth cue for the hero image. It is intentionally
// disabled on touch devices and when reduced motion is requested.
if (document.body.classList.contains('hub-home') && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.matchMedia('(pointer: fine)').matches) {
  document.body.classList.add('motion-enabled');
  const heroArt = document.querySelector('.hub-hero-art');
  heroArt?.addEventListener('pointermove', (event) => {
    const box = heroArt.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - .5;
    const y = (event.clientY - box.top) / box.height - .5;
    heroArt.style.setProperty('--hero-rx', `${(x * 2).toFixed(2)}deg`);
    heroArt.style.setProperty('--hero-ry', `${(-y * 2).toFixed(2)}deg`);
    heroArt.style.setProperty('--hero-x', `${(x * 4).toFixed(1)}px`);
    heroArt.style.setProperty('--hero-y', `${(y * 4).toFixed(1)}px`);
  });
  heroArt?.addEventListener('pointerleave', () => {
    heroArt.style.setProperty('--hero-rx', '0deg'); heroArt.style.setProperty('--hero-ry', '0deg');
    heroArt.style.setProperty('--hero-x', '0px'); heroArt.style.setProperty('--hero-y', '0px');
  });
}

// Add a consistent WhatsApp action to every footer without forcing every
// static page to duplicate the same markup.
document.querySelectorAll('footer .footer-col').forEach((col) => {
  const heading = col.querySelector('b');
  if (!heading || heading.textContent.trim().toLowerCase() !== 'contact') return;
  const list = col.querySelector('ul');
  if (!list || list.querySelector('a[href*="wa.me/27672033731"]')) return;
  const item = document.createElement('li');
  item.innerHTML = '<a class="whatsapp-footer-link" href="https://wa.me/27672033731?text=Hi%20BenTechHub%2C%20I%20would%20like%20to%20speak%20to%20your%20team.">Contact us on whatsapp</a>';
  list.appendChild(item);
});

document.querySelectorAll('footer .footer-bottom').forEach((bottom) => {
  if (bottom.querySelector('a[href*="wa.me/27672033731"]')) return;
  const link = document.createElement('a');
  link.className = 'btn btn-primary whatsapp-footer-button';
  link.href = 'https://wa.me/27672033731?text=Hi%20BenTechHub%2C%20I%20would%20like%20to%20speak%20to%20your%20team.';
  link.textContent = 'Contact us on whatsapp';
  bottom.appendChild(link);
});
