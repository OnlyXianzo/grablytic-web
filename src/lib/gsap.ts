import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins in browser context
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

export function isReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Hero entrance timeline (title rise, badge pop, button entrance).
 */
export function initHeroAnimation(container: HTMLElement | null = null): void {
  if (typeof window === 'undefined' || isReducedMotion()) return;

  const scope = container || document;
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('[data-hero="logo"]', { scale: 0.5, opacity: 0, duration: 0.7, ease: 'back.out(1.6)' })
      .from('[data-hero="title"]', { y: 40, opacity: 0, duration: 0.8 }, '-=0.35')
      .from('[data-hero="sub"]', { y: 24, opacity: 0, duration: 0.6 }, '-=0.45')
      .from('[data-hero="cta"] a, [data-hero="cta"] button', { y: 20, opacity: 0, stagger: 0.08, duration: 0.5 }, '-=0.3')
      .from('[data-hero="badges"] span', { y: 12, opacity: 0, stagger: 0.06, duration: 0.4 }, '-=0.25')
      .from('[data-hero="stats"]', { opacity: 0, duration: 0.5 }, '-=0.2');
  }, scope);

  return () => ctx.revert();
}

/**
 * Scroll-triggered element reveals with stagger and reduced-motion fallback.
 */
export function initScrollReveals(rootSelector: string = '[data-reveal]'): void {
  if (typeof window === 'undefined' || isReducedMotion()) return;

  const elements = gsap.utils.toArray<HTMLElement>(rootSelector);
  elements.forEach((el) => {
    gsap.from(el, {
      y: 32,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    });
  });
}

/**
 * Animated number counter using ScrollTrigger.
 */
export function initCountUps(): void {
  if (typeof window === 'undefined' || isReducedMotion()) return;

  const counters = document.querySelectorAll<HTMLElement>('[data-count]');
  counters.forEach((el) => {
    const end = parseFloat(el.dataset.count || '0');
    if (isNaN(end) || end <= 0) return;

    const state = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      once: true,
      onEnter: () => {
        gsap.to(state, {
          val: end,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(state.val).toString();
          },
        });
      },
    });
  });
}

/**
 * Magnetic button hover effect.
 */
export function initMagneticButtons(selector: string = '.btn-magnetic'): void {
  if (typeof window === 'undefined' || isReducedMotion()) return;

  const buttons = document.querySelectorAll<HTMLElement>(selector);
  buttons.forEach((btn) => {
    btn.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.28;
      gsap.to(btn, { x, y, duration: 0.3, ease: 'power1.out' });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });
  });
}


