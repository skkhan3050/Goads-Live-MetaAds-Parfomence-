// Digital Academy 360 - Interactive Logic

document.addEventListener('DOMContentLoaded', () => {
  // 1. Announcement Bar Close
  const closeBtn = document.querySelector('.style_close__JBXWG');
  const topbar = document.querySelector('.style_topbar__3UyhD');
  if (closeBtn && topbar) {
    closeBtn.addEventListener('click', () => {
      topbar.style.display = 'none';
    });
  }

  // 2. Courses Mega Menu Dropdown
  const courseDropdown = document.querySelector('.style_courseDropdown__k2ZrP');
  const courseMenu = document.querySelector('.style_dropdownContainer__lEdKO');
  const courseOverlay = document.querySelector('.style_navbarDropdownOverlay__1Z0um');
  const courseToggle = document.querySelectorAll('.style_dropdownToggle__BmzqH');

  if (courseDropdown && courseMenu) {
    const toggleMenu = (open) => {
      if (open === undefined) {
        courseMenu.classList.toggle('dropdown-active');
        if (courseOverlay) courseOverlay.classList.toggle('dropdown-active');
      } else if (open) {
        courseMenu.classList.add('dropdown-active');
        if (courseOverlay) courseOverlay.classList.add('dropdown-active');
      } else {
        courseMenu.classList.remove('dropdown-active');
        if (courseOverlay) courseOverlay.classList.remove('dropdown-active');
      }
    };

    courseToggle.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
      });
    });

    if (courseOverlay) {
      courseOverlay.addEventListener('click', () => toggleMenu(false));
    }

    // Mega menu tabs switching
    const tabs = document.querySelectorAll('.style_megaMenuTab__34r6T li');
    tabs.forEach((tab, index) => {
      tab.addEventListener('mouseenter', () => {
        tabs.forEach(t => t.classList.remove('style_active__P3crq'));
        tab.classList.add('style_active__P3crq');
      });
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('style_active__P3crq'));
        tab.classList.add('style_active__P3crq');
      });
    });
  }

  // 3. Hamburger Quick Menu
  const hamburgerBtns = document.querySelectorAll('.style_hamburgerMenu__eZyEy');
  const quickMenu = document.querySelector('.style_dropdownMenu__zxBCs');
  const quickOverlay = document.querySelector('.style_navbarQuickOverlay__HX_kH');

  if (quickMenu) {
    const toggleQuickMenu = () => {
      const isOpen = quickMenu.classList.contains('dropdown-active');
      if (isOpen) {
        quickMenu.classList.remove('dropdown-active');
        if (quickOverlay) quickOverlay.classList.remove('dropdown-active');
      } else {
        quickMenu.classList.add('dropdown-active');
        if (quickOverlay) quickOverlay.classList.add('dropdown-active');
      }
    };

    hamburgerBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleQuickMenu();
      });
    });

    if (quickOverlay) {
      quickOverlay.addEventListener('click', () => {
        quickMenu.classList.remove('dropdown-active');
        quickOverlay.classList.remove('dropdown-active');
      });
    }
  }

  // Close menus on outside click
  document.addEventListener('click', (e) => {
    if (courseMenu && !courseDropdown.contains(e.target)) {
      courseMenu.classList.remove('dropdown-active');
      if (courseOverlay) courseOverlay.classList.remove('dropdown-active');
    }
    if (quickMenu && !quickMenu.contains(e.target) && !e.target.closest('.style_hamburgerMenu__eZyEy')) {
      quickMenu.classList.remove('dropdown-active');
      if (quickOverlay) quickOverlay.classList.remove('dropdown-active');
    }
  });





  // 6. Brand Logos Auto-Marquee
  const brandTrack = document.querySelector('.style_brandRow__m0R_Q');
  if (brandTrack) {
    brandTrack.classList.add('marquee-track');
    // Clone children to ensure seamless looping
    const children = Array.from(brandTrack.children);
    children.forEach(child => {
      const clone = child.cloneNode(true);
      brandTrack.appendChild(clone);
    });
  }

  // 7. Parallax Student Pins in Hero Banner (if present)
  const cards = document.querySelectorAll('[data-parallax-strength]');
  if (cards.length > 0) {
    window.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (clientX - centerX) / centerX;
      const deltaY = (clientY - centerY) / centerY;

      cards.forEach(card => {
        const strength = parseFloat(card.getAttribute('data-parallax-strength') || 0.1);
        const moveX = deltaX * strength * 25;
        const moveY = deltaY * strength * 25;
        card.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px)';
      });
    });
  }

  // 8. Service Selection Dropdown Toggle
  const serviceToggle = document.getElementById('serviceDropdownToggle');
  const serviceContent = document.getElementById('serviceDropdownContent');
  const serviceLabel = document.querySelector('.service-dropdown-label');
  const serviceCheckboxes = document.querySelectorAll('.service-checkbox-item input[type="checkbox"]');

  if (serviceToggle && serviceContent) {
    serviceToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = serviceContent.classList.contains('show');
      if (isOpen) {
        serviceContent.classList.remove('show');
        serviceToggle.classList.remove('active');
      } else {
        serviceContent.classList.add('show');
        serviceToggle.classList.add('active');
      }
    });

    // Support keyboard navigation (Enter / Space)
    serviceToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        serviceToggle.click();
      }
    });

    // Prevent clicks inside content from closing dropdown
    serviceContent.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Close when clicking outside
    document.addEventListener('click', () => {
      serviceContent.classList.remove('show');
      serviceToggle.classList.remove('active');
    });

    // Update label when checkboxes change
    const updateServiceLabel = () => {
      const selected = [];
      serviceCheckboxes.forEach(cb => {
        if (cb.checked) {
          selected.push(cb.value === 'Google Ads' ? 'Google Ads' : 'Meta Ads');
        }
      });
      if (serviceLabel) {
        serviceLabel.textContent = selected.length > 0 ? selected.join(', ') : '--Select Services--';
      }
    };

    serviceCheckboxes.forEach(cb => {
      cb.addEventListener('change', updateServiceLabel);
    });

    updateServiceLabel();
  }

  // 9. Mouse-Track Parallax for Digivirus Partner Cards
  const partnerSection = document.querySelector('.digivirus-partners-section');
  const partnerCards = document.querySelectorAll('.elementor-element-6188106 .e-child');
  if (partnerSection && partnerCards.length > 0) {
    partnerSection.addEventListener('mousemove', (e) => {
      const rect = partnerSection.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      
      partnerCards.forEach((card, index) => {
        const factor = 1 + (index % 3) * 0.25;
        const moveX = -relX * 18 * factor;
        const moveY = -relY * 10 * factor;
        card.style.setProperty('--translateX', `${moveX.toFixed(2)}px`);
        card.style.setProperty('--translateY', `${moveY.toFixed(2)}px`);
        card.style.transform = `translateX(${moveX.toFixed(2)}px) translateY(${moveY.toFixed(2)}px)`;
      });
    });

    partnerSection.addEventListener('mouseleave', () => {
      partnerCards.forEach(card => {
        card.style.transform = '';
      });
    });
  }

  // 10. digiVirus FAQ Interactive Modal
  const faqRoot = document.getElementById('dvFaqWidget');
  if (faqRoot) {
    const items = Array.from(faqRoot.querySelectorAll('.dv-q'));
    const modal = faqRoot.querySelector('[data-modal]');
    const dialog = faqRoot.querySelector('.dv-dialog');
    const titleEl = faqRoot.querySelector('#dvFaqTitle');
    const bodyEl = faqRoot.querySelector('#dvFaqBody');
    const closeBtn = faqRoot.querySelector('[data-close]');

    let lastActive = null;
    let index = 0;
    let escHandler = null;

    function renderFaq(i, withSwitchAnim = false) {
      index = (i + items.length) % items.length;
      const btn = items[index];

      if (withSwitchAnim) {
        dialog.classList.add('is-switching');
        setTimeout(() => {
          titleEl.textContent = btn.dataset.q;
          bodyEl.textContent = btn.dataset.a;
          dialog.classList.remove('is-switching');
        }, 120);
      } else {
        titleEl.textContent = btn.dataset.q;
        bodyEl.textContent = btn.dataset.a;
      }
    }

    function openFaqAt(i, triggerBtn) {
      if (modal.classList.contains('is-open')) {
        renderFaq(i, true);
        return;
      }

      lastActive = triggerBtn || null;
      renderFaq(i, false);

      modal.hidden = false;
      requestAnimationFrame(() => modal.classList.add('is-open'));
      if (closeBtn) closeBtn.focus();

      escHandler = (e) => {
        if (e.key === 'Escape') closeFaq();
      };
      document.addEventListener('keydown', escHandler);
    }

    function closeFaq() {
      modal.classList.remove('is-open');
      setTimeout(() => {
        modal.hidden = true;
        if (lastActive) lastActive.focus();
      }, 180);

      if (escHandler) {
        document.removeEventListener('keydown', escHandler);
        escHandler = null;
      }
    }

    faqRoot.addEventListener('click', (e) => {
      const qBtn = e.target.closest('.dv-q');
      if (qBtn) {
        return openFaqAt(items.indexOf(qBtn), qBtn);
      }

      if (e.target === modal) return closeFaq();
      if (e.target.closest('[data-close]')) return closeFaq();

      if (e.target.closest('[data-prev]')) return renderFaq(index - 1, true);
      if (e.target.closest('[data-next]')) return renderFaq(index + 1, true);
    });
  }

  // 12. "We Helping You In" Horizontal Scroll Parallax Animation
  const serviceCards = document.querySelectorAll('#services .scroll-animation');
  if (serviceCards.length > 0) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const servicesSection = document.getElementById('services');
          if (servicesSection && window.innerWidth > 991) {
            const rect = servicesSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
              const factor = (progress - 0.5) * 36; // smooth subtle shift
              serviceCards.forEach((card, idx) => {
                const isEven = idx % 2 === 0;
                const shift = isEven ? -factor : factor;
                card.style.transform = `translateX(${shift.toFixed(1)}px)`;
              });
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
});


