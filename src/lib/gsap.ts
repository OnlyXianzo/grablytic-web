import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins with mobile performance tuning
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
  });
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
      .from('[data-hero="badges"] span, [data-hero="badges"] a', { y: 12, opacity: 0, stagger: 0.06, duration: 0.4 }, '-=0.25')
      .from('[data-hero="stats"]', { opacity: 0, duration: 0.5 }, '-=0.2');
  }, scope);

  return () => ctx.revert();
}

/**
 * Scroll-triggered element reveals powered by native IntersectionObserver.
 * Runs off-thread, eliminates main-thread JS bounds loops, and cleans up will-change.
 */
export function initScrollReveals(rootSelector: string = '[data-reveal]'): void {
  if (typeof window === 'undefined') return;

  const elements = document.querySelectorAll<HTMLElement>(rootSelector);
  if (elements.length === 0) return;

  if (isReducedMotion() || !('IntersectionObserver' in window)) {
    elements.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // Initialize elements to hidden rest state
  elements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translate3d(0, 24px, 0)';
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          obs.unobserve(el);

          // Ephemeral layer promotion
          el.style.willChange = 'transform, opacity';
          gsap.to(el, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            onComplete: () => {
              el.style.willChange = 'auto'; // Release GPU backing store immediately
            },
          });
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
  );

  elements.forEach((el) => observer.observe(el));
}

/**
 * Animated number counter using native IntersectionObserver.
 * Avoids per-counter ScrollTrigger instances on low-end CPUs.
 */
export function initCountUps(): void {
  if (typeof window === 'undefined') return;

  const counters = document.querySelectorAll<HTMLElement>('[data-count]');
  if (counters.length === 0) return;

  if (isReducedMotion() || !('IntersectionObserver' in window)) {
    counters.forEach((el) => {
      el.textContent = el.dataset.count || '0';
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          obs.unobserve(el);
          const end = parseFloat(el.dataset.count || '0');
          if (isNaN(end) || end <= 0) return;

          const state = { val: 0 };
          gsap.to(state, {
            val: end,
            duration: 1.4,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = Math.round(state.val).toString();
            },
          });
        }
      });
    },
    { threshold: 0.1 }
  );

  counters.forEach((el) => observer.observe(el));
}

/**
 * Magnetic button hover effect.
 * Strictly gated to fine pointer hardware (mouse/trackpad), never touch devices.
 * Caches bounding rect to avoid layout thrashing in mousemove.
 */
export function initMagneticButtons(selector: string = '.btn-magnetic'): void {
  if (typeof window === 'undefined' || isReducedMotion()) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const buttons = document.querySelectorAll<HTMLElement>(selector);
  buttons.forEach((btn) => {
    let rect: DOMRect | null = null;

    btn.addEventListener('mouseenter', () => {
      rect = btn.getBoundingClientRect();
    }, { passive: true });

    btn.addEventListener('mousemove', (e: MouseEvent) => {
      if (!rect) rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.28;
      gsap.to(btn, { x, y, duration: 0.3, ease: 'power1.out' });
    });

    btn.addEventListener('mouseleave', () => {
      rect = null;
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });
  });
}


