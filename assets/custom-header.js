/**
 * Custom Header — Mobile menu toggle, header height CSS variable, submenu handling
 */
(function () {
  const MOBILE_BREAKPOINT = 750;

  const header = document.querySelector('.custom-header');
  if (!header) return;

  const hamburger = header.querySelector('.custom-header__hamburger');
  const nav = header.querySelector('.custom-header-nav');
  const submenuParents = header.querySelectorAll('.custom-header-nav__item--has-submenu');

  /* --------------------------------------------------------------------------
     Header height CSS variable
     -------------------------------------------------------------------------- */
  function setHeaderHeight() {
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
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
      const isOpen = header.classList.toggle('is-open');
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
    if (event.key === 'Escape' && header.classList.contains('is-open')) {
      header.classList.remove('is-open');
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
    if (window.innerWidth >= MOBILE_BREAKPOINT && header.classList.contains('is-open')) {
      header.classList.remove('is-open');
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

    if (window.innerWidth >= MOBILE_BREAKPOINT) {
      /* Desktop: hover */
      item.addEventListener('mouseenter', function () {
        item.classList.add('is-submenu-open');
      });

      item.addEventListener('mouseleave', function () {
        item.classList.remove('is-submenu-open');
      });
    }

    /* Keyboard / click toggle for submenu */
    if (toggle) {
      toggle.addEventListener('click', function (event) {
        event.preventDefault();
        const isOpen = item.classList.toggle('is-submenu-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
      });
    }

    /* Escape closes submenu and returns focus */
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
