const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const excluded = '#stack, [data-ai-fab], [data-ai-card]';
const eligible = (element: Element) =>
  !element.closest(excluded) && !element.querySelector(excluded);

// Re-arm scroll reveals so sections below the viewport replay when reached.
const reveals = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        target.classList.add('in');
        reveals?.unobserve(target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
  : null;

new MutationObserver(() => {
  if (reducedMotion.matches) return;
  document.querySelectorAll('.fade-up').forEach((element) => {
    if (!eligible(element) || !reveals) return;
    const node = element as HTMLElement;
    const transition = node.style.transition;
    node.style.transition = 'none';
    element.classList.remove('in');
    // Commit the hidden state before the next intersection notification.
    element.getBoundingClientRect();
    node.style.transition = transition;
    reveals.observe(element);
  });
  document.getAnimations().forEach((animation) => {
    if (!(animation instanceof CSSAnimation)) return;
    const target = (animation.effect as KeyframeEffect | null)?.target;
    if (!(target instanceof Element) || !eligible(target)) return;
    animation.currentTime = 0;
    animation.play();
  });
  // Finished entrance animations without forwards fill leave getAnimations().
  document.querySelectorAll<HTMLElement>('[data-nomad-plane] .plane').forEach((plane) => {
    plane.style.animation = 'none';
    plane.getBoundingClientRect();
    plane.style.removeProperty('animation');
  });
}).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
