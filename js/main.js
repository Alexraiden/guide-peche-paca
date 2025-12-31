/* ============================================
   GUIDE DE PÊCHE PACA - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ---------- Mobile Navigation ----------
    const menuToggle = document.querySelector('.menu-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    const body = document.body;

    if (menuToggle && navMobile) {
        menuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            navMobile.classList.toggle('active');
            body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        const mobileLinks = navMobile.querySelectorAll('.nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function () {
                menuToggle.classList.remove('active');
                navMobile.classList.remove('active');
                body.style.overflow = '';
            });
        });
    }

    // ---------- Header scroll effect ----------
    const header = document.querySelector('.header');

    if (header) {
        let lastScroll = 0;

        window.addEventListener('scroll', function () {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.08)';
            }

            lastScroll = currentScroll;
        });
    }

    // ---------- Scroll animations ----------
    const fadeElements = document.querySelectorAll('.fade-in');

    if (fadeElements.length > 0) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        fadeElements.forEach(element => {
            fadeObserver.observe(element);
        });
    }

    // ---------- Smooth scroll for anchor links ----------
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ---------- Form validation : Handled natively by generic browser validation + FormSubmit ----------
    const contactForm = document.querySelector('#contact-form');
    // Note: custom JS validation removed to allow FormSubmit to work naturally

    // ---------- Gallery lightbox (simple version) ----------
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (galleryItems.length > 0) {
        // Create lightbox element
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.innerHTML = `
      <div class="lightbox-overlay"></div>
      <div class="lightbox-content">
        <button class="lightbox-close">&times;</button>
        <img src="" alt="">
      </div>
    `;
        lightbox.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: none;
      align-items: center;
      justify-content: center;
    `;

        const lightboxStyle = document.createElement('style');
        lightboxStyle.textContent = `
      #lightbox .lightbox-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.9);
      }
      #lightbox .lightbox-content {
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
      }
      #lightbox .lightbox-content img {
        max-width: 100%;
        max-height: 90vh;
        border-radius: 8px;
      }
      #lightbox .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        transition: color 0.3s;
      }
      #lightbox .lightbox-close:hover {
        color: #D4842F;
      }
    `;

        document.head.appendChild(lightboxStyle);
        document.body.appendChild(lightbox);

        const lightboxImg = lightbox.querySelector('img');
        const lightboxOverlay = lightbox.querySelector('.lightbox-overlay');
        const lightboxClose = lightbox.querySelector('.lightbox-close');

        galleryItems.forEach(item => {
            item.addEventListener('click', function () {
                const img = this.querySelector('img');
                if (img) {
                    lightboxImg.src = img.src;
                    lightboxImg.alt = img.alt;
                    lightbox.style.display = 'flex';
                    body.style.overflow = 'hidden';
                }
            });
        });

        function closeLightbox() {
            lightbox.style.display = 'none';
            body.style.overflow = '';
        }

        lightboxOverlay.addEventListener('click', closeLightbox);
        lightboxClose.addEventListener('click', closeLightbox);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                closeLightbox();
            }
        });
    }

    // ---------- Active nav link ----------
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

});
