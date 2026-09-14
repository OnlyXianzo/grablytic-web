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
 * Hero entrance timeline with spring bounce and staggered beats.
 */
export function initHeroAnimation(container: HTMLElement | null = null): (() => void) | void {
  if (typeof window === 'undefined' || isReducedMotion()) return;

  const scope = container || document;
  let ctx: gsap.Context | null = null;
  try {
    ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('[data-hero="badges"]',
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', clearProps: 'opacity,transform' }
      )
      .fromTo('[data-hero="logo"]',
        { scale: 0.7, opacity: 0, rotation: -6 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.8)', clearProps: 'opacity,transform' },
        '-=0.3'
      )
      .fromTo('[data-hero="title"]',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', clearProps: 'opacity,transform' },
        '-=0.45'
      )
      .fromTo('[data-hero="sub"]',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, clearProps: 'opacity,transform' },
        '-=0.55'
      )
      .fromTo('[data-hero="cta"] a, [data-hero="cta"] button',
        { y: 22, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.6, ease: 'back.out(1.5)', clearProps: 'opacity,transform' },
        '-=0.4'
      );

      // Pre-filter cta2 elements to eliminate display:none elements (e.g. Obtainium on desktop).
      // Eliminates the CSSPlugin reparenting forced reflow and phantom stagger gaps.
      const cta2Elements = Array.from(
        scope.querySelectorAll<HTMLElement>('[data-hero="cta2"] a, [data-hero="cta2"] button')
      ).filter((el) => el.style.display !== 'none' && el.offsetParent !== null);

      if (cta2Elements.length > 0) {
        tl.fromTo(cta2Elements,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, clearProps: 'opacity,transform' },
          '-=0.3'
        );
      }

      tl.fromTo('[data-hero="stats"] > div',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power2.out', clearProps: 'opacity,transform' },
        '-=0.3'
      );
    }, scope);

    return () => ctx?.revert();
  } catch (err) {
    console.error('[GSAP] Hero animation init failed, restoring static visibility:', err);
    ctx?.revert();
  }
}

/**
 * Scroll-triggered element reveals powered by native IntersectionObserver with rhythmic staggering.
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

  // Handle grouped reveals (e.g. grids of cards) for coordinated liquid stagger
  const groups = document.querySelectorAll<HTMLElement>('[data-reveal-group]');
  const handledElements = new Set<HTMLElement>();

  groups.forEach((group) => {
    const groupItems = group.querySelectorAll<HTMLElement>(rootSelector);
    if (groupItems.length === 0) return;

    groupItems.forEach((el) => {
      handledElements.add(el);
      el.style.opacity = '0';
      el.style.transform = 'translate3d(0, 30px, 0) scale(0.97)';
    });

    const groupObserver = new IntersectionObserver(
      (entries, obs) => {
        if (entries[0].isIntersecting) {
          obs.unobserve(group);
          gsap.to(Array.from(groupItems), {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            clearProps: 'willChange',
          });
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.1 }
    );

    groupObserver.observe(group);
  });

  // Handle standalone reveals
  const standaloneElements: HTMLElement[] = [];
  elements.forEach((el) => {
    if (!handledElements.has(el)) {
      standaloneElements.push(el);
      el.style.opacity = '0';
      el.style.transform = 'translate3d(0, 24px, 0)';
    }
  });

  if (standaloneElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            obs.unobserve(el);

            el.style.willChange = 'transform, opacity';
            gsap.to(el, {
              y: 0,
              opacity: 1,
              duration: 0.65,
              ease: 'power3.out',
              onComplete: () => {
                el.style.willChange = 'auto';
              },
            });
          }
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.1 }
    );

    standaloneElements.forEach((el) => observer.observe(el));
  }
}

/**
 * Animated number counter using native IntersectionObserver.
 * Features a celebratory spring bounce on completion for tactile delight.
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
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = Math.round(state.val).toString();
            },
            onComplete: () => {
              // Celebratory spring bounce when number completes
              gsap.fromTo(el, 
                { scale: 1.25, color: '#FFDAD2' }, 
                { scale: 1, color: '', duration: 0.45, ease: 'back.out(2)' }
              );
            }
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
