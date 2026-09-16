// src/lib/copy.ts — shared clipboard ladder for copy buttons.
//
// Modern path first (Async Clipboard, called directly in the click call
// stack so transient activation is intact), then a synchronous iOS-safe
// textarea fallback. Resolves true ONLY on a confirmed write — callers
// must not show success UI otherwise (silent-success class on iOS).

export async function copyText(text: string): Promise<boolean> {
  if (
    typeof window !== 'undefined' &&
    window.isSecureContext &&
    typeof navigator !== 'undefined' &&
    navigator.clipboard?.writeText
  ) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Denied / unfocused / iframe policy — fall through to legacy path.
    }
  }
  return legacyCopy(text);
}

function legacyCopy(text: string): boolean {
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    // readonly suppresses the iOS keyboard; focus + explicit range is what
    // makes the copy land (select() alone is insufficient on Mobile Safari).
    ta.setAttribute('readonly', '');
    ta.setAttribute('aria-hidden', 'true');
    ta.tabIndex = -1;
    // Viewport-anchored and invisible: no scroll jump, no auto-zoom (12pt).
    ta.style.position = 'fixed';
    ta.style.top = `${window.scrollY}px`;
    ta.style.left = '0';
    ta.style.width = '1px';
    ta.style.height = '1px';
    ta.style.opacity = '0';
    ta.style.fontSize = '12pt';
    document.body.appendChild(ta);
    ta.focus({ preventScroll: true });
    ta.setSelectionRange(0, ta.value.length);
    const ok = document.execCommand('copy');
    ta.remove();
    return ok === true;
  } catch {
    return false;
  }
}
