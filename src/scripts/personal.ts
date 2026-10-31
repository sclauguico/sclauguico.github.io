const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const elements = document.querySelectorAll<HTMLElement>('[data-personal-reveal]');
const observer = 'IntersectionObserver' in window
  ? new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        target.classList.add('is-visible');
        observer?.unobserve(target);
      });
    }, { threshold: .08 })
  : null;

const reveal = () => {
  if (!observer || motion.matches) {
    document.body.classList.remove('personal-motion');
    return;
  }
  document.body.classList.add('personal-motion');
  elements.forEach(element => {
    element.style.transition = 'none';
    element.classList.remove('is-visible');
    element.getBoundingClientRect();
    element.style.removeProperty('transition');
    observer.observe(element);
  });
};
reveal();
motion.addEventListener('change', reveal);

const toggle = document.querySelector<HTMLButtonElement>('[data-personal-theme]');
const labelTheme = () => toggle?.setAttribute('aria-label', document.documentElement.classList.contains('dark') ? 'Switch to light mode' : 'Switch to dark mode');
labelTheme();
toggle?.addEventListener('click', () => {
  const dark = document.documentElement.classList.toggle('dark');
  const theme = dark ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('theme', theme); } catch {}
  labelTheme();
  reveal();
});
