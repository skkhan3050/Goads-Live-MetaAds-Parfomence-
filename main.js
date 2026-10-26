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

  // 4. Horizontal Sliders Helper (Success stories, Guest mentors, Student life)
  function setupHorizontalSlider(containerSelector, prevBtnSelector, nextBtnSelector, step = 380) {
    const container = document.querySelector(containerSelector);
    const prevBtn = document.querySelector(prevBtnSelector);
    const nextBtn = document.querySelector(nextBtnSelector);

    if (!container) return;

    // Enable smooth horizontal scrolling
    container.style.overflowX = 'auto';
    container.style.scrollBehavior = 'smooth';
    container.style.scrollbarWidth = 'none'; // Firefox
    container.style.msOverflowStyle = 'none'; // IE/Edge

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        container.scrollBy({ left: -step, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        container.scrollBy({ left: step, behavior: 'smooth' });
      });
    }
  }

  // Alumni achievements slider
  setupHorizontalSlider(
    '.style_sliderWrapper__lufFM .swiper-wrapper',
    '.style_sliderWrapper__lufFM .prevBtn',
    '.style_sliderWrapper__lufFM .nextBtn',
    390
  );

  // Guest faculty / mentors slider
  setupHorizontalSlider(
    '.styles_guestFaculty__26Ewq .swiper-wrapper',
    '.styles_guestFaculty__26Ewq .prevBtn',
    '.styles_guestFaculty__26Ewq .nextBtn',
    320
  );

  // Inside DA360 meetup cards slider
  setupHorizontalSlider(
    '.style_communityMeetupSection__IHxYT .swiper-wrapper',
    '.style_communityMeetupSection__IHxYT .prevBtn',
    '.style_communityMeetupSection__IHxYT .nextBtn',
    360
  );

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
});
