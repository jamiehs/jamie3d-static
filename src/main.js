// Granular dev TODOs (data-todo-dev) are for dev/preview only — stripped from
// production builds so real visitors never see in-progress markers.
if (import.meta.env.PROD) {
  document.querySelectorAll('[data-todo-dev]').forEach((el) => el.remove());
}

// Mobile nav toggle. Keeps the closed-state header height constant across
// all viewport widths, which is what keeps scroll-padding-top accurate.
const navToggle = document.getElementById('nav-toggle');
const siteNav = document.getElementById('site-nav');

function closeNav() {
  siteNav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') closeNav();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNav();
  });
}

// Smooth-scroll same-page anchor links instead of the instant native jump.
// scroll-padding-top on <html> is left in place as a fallback for the cases
// this doesn't cover: direct links with a hash, and browser back/forward.
function headerOffset() {
  const header = document.querySelector('.site-header');
  return (header ? header.getBoundingClientRect().height : 0) + 16;
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset();
    window.scrollTo({ top, behavior: 'smooth' });
    history.pushState(null, '', `#${id}`);
  });
});
