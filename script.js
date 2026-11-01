/* ══════════════════════════════════════════════
   Mayka's Holiday Homes — Professional Scripts
   Clean, refined interactions
   ══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Preloader ──
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hidden'), 500);
  });
  setTimeout(() => preloader.classList.add('hidden'), 2500);

  // ── Navbar scroll effect ──
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  function handleScroll() {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 50);
    backToTop.classList.toggle('visible', y > 500);
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ── Back to top ──
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Mobile nav ──
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ── Active nav link tracking ──
  const sections = document.querySelectorAll('section[id], header[id]');
  const navItems = document.querySelectorAll('[data-nav]');

  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.id;
      }
    });
    navItems.forEach(item => {
      item.classList.toggle('active', item.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ── Scroll reveal ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));



  // ── Gallery Lightbox ──
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const galleryItems = document.querySelectorAll('[data-lightbox]');
  const images = [];
  let currentIdx = 0;

  galleryItems.forEach(item => {
    const img = item.querySelector('img');
    if (img) images.push(img.src);
  });

  function openLightbox(i) {
    currentIdx = i;
    lightboxImg.src = images[i];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  function navLightbox(dir) {
    currentIdx = (currentIdx + dir + images.length) % images.length;
    lightboxImg.src = images[currentIdx];
  }

  galleryItems.forEach((item, i) => item.addEventListener('click', () => openLightbox(i)));
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightboxPrev').addEventListener('click', () => navLightbox(-1));
  document.getElementById('lightboxNext').addEventListener('click', () => navLightbox(1));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navLightbox(-1);
    if (e.key === 'ArrowRight') navLightbox(1);
  });

  // ── Smooth scroll ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── Contact form ──
  const form = document.getElementById('bookingForm');
  const formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = this.querySelector('.form-submit');
      const originalHTML = btn.innerHTML;

      btn.innerHTML = 'Submitting...';
      btn.disabled = true;
      btn.style.opacity = '0.6';

      setTimeout(() => {
        const fields = form.querySelectorAll('.form-group, .form-row, .form-submit, h3');
        fields.forEach(f => f.style.display = 'none');
        btn.style.display = 'none';
        formSuccess.classList.add('show');

        setTimeout(() => {
          fields.forEach(f => f.style.display = '');
          btn.style.display = '';
          btn.innerHTML = originalHTML;
          btn.disabled = false;
          btn.style.opacity = '';
          formSuccess.classList.remove('show');
          form.reset();
        }, 4000);
      }, 1000);
    });
  }

});
