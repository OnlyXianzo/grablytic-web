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

      // Pre-filter hidden elements to eliminate display:none stagger gaps.
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

/**
 * Smooth hardware-accelerated accordion disclosure for <details class="faq-item">.
 * Eliminates abrupt binary snap with 60/120fps height interpolation and opacity fade.
 */
export function initAccordions(selector: string = 'details.faq-item'): void {
  if (typeof window === 'undefined' || isReducedMotion()) return;
  if (!('animate' in HTMLElement.prototype)) return;

  const accordions = document.querySelectorAll<HTMLDetailsElement>(selector);
  accordions.forEach((details) => {
    const summary = details.querySelector('summary');
    if (!summary) return;

    let isAnimating = false;

    // offsetHeight is border-box but style.height sets content-box
    // (.faq-item has padding + border). Assigning one to the other adds
    // ~34px instantly — the visible open/close jump. Subtract the box
    // extras so pinned heights match the natural box exactly.
    const boxExtras = (): number => {
      const cs = getComputedStyle(details);
      return (
        parseFloat(cs.paddingTop) +
        parseFloat(cs.paddingBottom) +
        parseFloat(cs.borderTopWidth) +
        parseFloat(cs.borderBottomWidth)
      );
    };

    summary.addEventListener('click', (e) => {
      e.preventDefault();
      if (isAnimating) return;

      const isOpen = details.hasAttribute('open');

      if (isOpen) {
        // Smooth closing — pin layout height first so the WAAPI shrink tracks
        // a fixed box (no auto-layout fighting / jump), then detach `open`
        // and scrub inline styles on finish AND cancel (no stuck height/
        // overflow, no 0.92-opacity snap on re-open).
        isAnimating = true;
        const extra = boxExtras();
        const startHeight = details.offsetHeight - extra;
        // Closed box = summary + the details' own padding/border.
        const endHeight = summary.offsetHeight;

        details.style.height = `${startHeight}px`;
        details.style.overflow = 'hidden';
        const anim = details.animate({
          height: [`${startHeight}px`, `${endHeight}px`],
          opacity: [1, 0.92]
        }, {
          duration: 260,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
        });

        const scrubCloseStyles = () => {
          details.style.height = '';
          details.style.overflow = '';
        };

        anim.onfinish = () => {
          details.removeAttribute('open');
          scrubCloseStyles();
          isAnimating = false;
        };
        anim.oncancel = () => {
          scrubCloseStyles();
          isAnimating = false;
        };
      } else {
        // Smooth opening
        isAnimating = true;
        const extra = boxExtras();
        const startHeight = summary.offsetHeight;
        details.setAttribute('open', '');
        const endHeight = details.offsetHeight - extra;

        details.style.overflow = 'hidden';
        const anim = details.animate({
          height: [`${startHeight}px`, `${endHeight}px`],
          opacity: [0.92, 1]
        }, {
          duration: 300,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
        });

        anim.onfinish = () => {
          details.style.overflow = '';
          isAnimating = false;
        };
        anim.oncancel = () => {
          details.style.overflow = '';
          isAnimating = false;
        };
      }
    });
  });
}

declare global {
  interface Window {
    __closeDonateDialog?: () => void;
  }
}

/**
 * Glitch-free close path for #donate-dialog.
 * Open stays native instant showModal(); close fades the dialog out (~170ms)
 * before .close() so the blurred backdrop doesn't vanish in a single frame.
 * Escape (`cancel`) and backdrop clicks route through the same fade; repeat
 * close requests while fading are idempotent; reduced-motion closes instantly.
 * Focus lite: moves focus into the dialog on open, traps Tab inside while
 * open, and restores focus to the opener on close (a11y half-done fix).
 */
export function initDonateDialogClose(dialogId: string = 'donate-dialog'): void {
  if (typeof window === 'undefined') return;
  const dialog = document.getElementById(dialogId) as HTMLDialogElement | null;
  if (!dialog) return;

  let closing = false;
  let opener: HTMLElement | null = null;

  const focusables = (): HTMLElement[] =>
    Array.from(
      dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => el.offsetParent !== null);

  const focusFirst = () => {
    const els = focusables();
    (els[0] ?? dialog).focus({ preventScroll: true });
  };

  const scrubDialogStyles = () => {
    dialog.style.opacity = '';
    dialog.style.transform = '';
  };

  const requestClose = () => {
    if (!dialog.open || closing) return;
    if (isReducedMotion() || !('animate' in dialog)) {
      dialog.close();
      return;
    }
    closing = true;
    const anim = dialog.animate(
      [
        { opacity: '1', transform: 'translateY(0) scale(1)' },
        { opacity: '0', transform: 'translateY(6px) scale(0.985)' },
      ],
      { duration: 170, easing: 'ease-out' }
    );
    anim.onfinish = () => {
      scrubDialogStyles();
      closing = false;
      if (dialog.open) dialog.close();
    };
    anim.oncancel = () => {
      // Interrupted mid-fade: leave the dialog open, scrub inline styles.
      scrubDialogStyles();
      closing = false;
    };
  };

  window.__closeDonateDialog = requestClose;

  // Capture the opener for every showModal() trigger (inline onclick in
  // Hero/sections), then move focus inside once the dialog is open.
  document.querySelectorAll<HTMLElement>("[onclick*='donate-dialog']").forEach((btn) => {
    btn.addEventListener('click', () => {
      opener = document.activeElement as HTMLElement | null;
      requestAnimationFrame(() => {
        if (dialog.open) focusFirst();
      });
    });
  });

  // Tab trap-lite: cycle focus within the dialog while open.
  dialog.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const els = focusables();
    if (els.length === 0) {
      e.preventDefault();
      return;
    }
    const first = els[0];
    const last = els[els.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // Escape key: native `cancel` would close instantly (flash) — fade instead.
  dialog.addEventListener('cancel', (e) => {
    e.preventDefault();
    requestClose();
  });

  // Backdrop click: native <dialog> ignores it — route through the same fade.
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) requestClose();
  });

  // Safety reset: however the dialog actually closes, drop pending close state
  // so a rapid re-open starts from clean flags and scrubbed inline styles.
  // Restore focus to the opener for keyboard / screen-reader continuity.
  dialog.addEventListener('close', () => {
    closing = false;
    scrubDialogStyles();
    if (opener && document.contains(opener)) {
      opener.focus({ preventScroll: true });
    }
    opener = null;
  });
}
