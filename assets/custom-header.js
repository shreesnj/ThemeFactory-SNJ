/**
 * Custom Header — Mobile menu toggle, submenu handling
 * Matches shop.enhanced.com behaviour
 */
(function () {
  const DESKTOP_BREAKPOINT = 960;

  const header = document.querySelector('.custom-header');
  if (!header) return;

  const hamburger = header.querySelector('.custom-header__hamburger');
  const submenuParents = header.querySelectorAll('.custom-header-nav__item--has-submenu');

  /* --------------------------------------------------------------------------
     Header height CSS variable
     -------------------------------------------------------------------------- */
  function setHeaderHeight() {
    const isMobile = window.innerWidth < DESKTOP_BREAKPOINT;
    const height = isMobile ? 60 : 92;
    document.documentElement.style.setProperty('--header-height', height + 'px');
  }

  setHeaderHeight();

  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(() => {
      setHeaderHeight();
    });
    ro.observe(header);
  } else {
    window.addEventListener('resize', setHeaderHeight);
  }

  /* --------------------------------------------------------------------------
     Mobile menu toggle
     -------------------------------------------------------------------------- */
  if (hamburger) {
    hamburger.addEventListener('click', function () {
      const isOpen = header.classList.toggle('custom-header--active');
      hamburger.setAttribute('aria-expanded', String(isOpen));

      if (!isOpen) {
        closeAllSubmenus();
      }
    });
  }

  /* --------------------------------------------------------------------------
     Close menu on Escape
     -------------------------------------------------------------------------- */
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && header.classList.contains('custom-header--active')) {
      header.classList.remove('custom-header--active');
      if (hamburger) {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.focus();
      }
      closeAllSubmenus();
    }
  });

  /* --------------------------------------------------------------------------
     Close mobile menu on resize to desktop
     -------------------------------------------------------------------------- */
  window.addEventListener('resize', function () {
    if (window.innerWidth >= DESKTOP_BREAKPOINT && header.classList.contains('custom-header--active')) {
      header.classList.remove('custom-header--active');
      if (hamburger) {
        hamburger.setAttribute('aria-expanded', 'false');
      }
      closeAllSubmenus();
    }
  });

  /* --------------------------------------------------------------------------
     Submenu handling
     -------------------------------------------------------------------------- */
  function closeAllSubmenus() {
    for (const item of submenuParents) {
      item.classList.remove('is-submenu-open');
      const toggle = item.querySelector('.custom-header-nav__submenu-toggle');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
      }
    }
  }

  for (const item of submenuParents) {
    const toggle = item.querySelector('.custom-header-nav__submenu-toggle');

    if (window.innerWidth >= DESKTOP_BREAKPOINT) {
      item.addEventListener('mouseenter', function () {
        item.classList.add('is-submenu-open');
      });

      item.addEventListener('mouseleave', function () {
        item.classList.remove('is-submenu-open');
      });
    }

    if (toggle) {
      toggle.addEventListener('click', function (event) {
        event.preventDefault();
        const isOpen = item.classList.toggle('is-submenu-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
      });
    }

    item.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && item.classList.contains('is-submenu-open')) {
        event.stopPropagation();
        item.classList.remove('is-submenu-open');
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
          toggle.focus();
        }
      }
    });
  }
})();
