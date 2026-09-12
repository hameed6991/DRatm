/**
 * DR. A. T. AHAMED MOHIDEEN - MAIN JAVASCRIPT
 * Header scroll shadow, mobile menu toggle, active route highlighting, and WhatsApp consultation request
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  highlightActiveNavLink();
  initContactForm();
  preselectClinicFromUrl();
});

/**
 * Handle Sticky Header Shadow on Scroll
 */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Mobile Navigation Menu Toggle
 */
function initMobileNav() {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (!mobileToggle || !mobileNav) return;

  mobileToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('open');
    if (isOpen) {
      mobileNav.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    } else {
      mobileNav.classList.add('open');
      mobileToggle.setAttribute('aria-expanded', 'true');
    }
  });

  // Close menu when clicking any nav link
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileNav.contains(e.target) && !mobileToggle.contains(e.target) && mobileNav.classList.contains('open')) {
      mobileNav.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * Highlight Active Navigation Link based on current page
 */
function highlightActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Pre-select clinic dropdown if URL contains ?clinic=... parameter
 */
function preselectClinicFromUrl() {
  const clinicSelect = document.getElementById('preferredClinic');
  if (!clinicSelect) return;

  const urlParams = new URLSearchParams(window.location.search);
  const paramClinic = urlParams.get('clinic');

  if (paramClinic) {
    const matchingOption = Array.from(clinicSelect.options).find(
      opt => opt.value.toLowerCase().includes(paramClinic.toLowerCase()) || opt.text.toLowerCase().includes(paramClinic.toLowerCase())
    );

    if (matchingOption) {
      clinicSelect.value = matchingOption.value;
    }
  }
}

/**
 * Consultation Request Form Submission via WhatsApp
 */
function initContactForm() {
  const form = document.getElementById('consultation-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const email = document.getElementById('email')?.value.trim() || 'N/A';
    const preferredClinic = document.getElementById('preferredClinic')?.value || 'Adirai';
    const consultationFor = document.getElementById('consultationFor')?.value || 'General Consultation';
    const message = document.getElementById('message')?.value.trim() || 'No message details provided.';

    // Validation
    if (!fullName) {
      alert('Please enter your full name.');
      document.getElementById('fullName')?.focus();
      return;
    }

    if (!phone) {
      alert('Please enter your phone number.');
      document.getElementById('phone')?.focus();
      return;
    }

    // Doctor Phone Number: +91 73580 51252 -> 917358051252
    const doctorWhatsAppNumber = '917358051252';

    // Format WhatsApp message
    const textLines = [
      `*CONSULTATION REQUEST - DR. A. T. AHAMED MOHIDEEN*`,
      `--------------------------------------------------`,
      `*Patient Name:* ${fullName}`,
      `*Phone Number:* ${phone}`,
      `*Email Address:* ${email}`,
      `*Preferred Clinic:* ${preferredClinic}`,
      `*Consultation For:* ${consultationFor}`,
      `--------------------------------------------------`,
      `*Message / Notes:*`,
      `${message}`
    ];

    const encodedMessage = encodeURIComponent(textLines.join('\n'));
    const whatsappUrl = `https://wa.me/${doctorWhatsAppNumber}?text=${encodedMessage}`;

    // Open WhatsApp URL in new window/tab
    window.open(whatsappUrl, '_blank');

    form.reset();
  });
}
