// Single global <style> tag for all motion primitives.
// Injected once on first use; subsequent calls are no-ops.

const STYLES = `
/* Reveal — toggled via data-revealed attribute by IntersectionObserver. */
[data-digital-reveal][data-revealed="true"] {
  opacity: 1 !important;
  transform: none !important;
}

/* Glow — hover/focus/always-driven box-shadow or text-shadow.
   Triggers are controlled via data-glow-hover, data-glow-focus and
   data-glow-always; the shadow value is set as a CSS custom property
   on the element. */
[data-digital-glow][data-glow-hover="true"][data-glow-variant="halo"]:hover,
[data-digital-glow][data-glow-focus="true"][data-glow-variant="halo"]:focus-within,
[data-digital-glow][data-glow-always="true"][data-glow-variant="halo"] {
  box-shadow: var(--glow-shadow);
}

[data-digital-glow][data-glow-hover="true"][data-glow-variant="text"]:hover,
[data-digital-glow][data-glow-focus="true"][data-glow-variant="text"]:focus-within,
[data-digital-glow][data-glow-always="true"][data-glow-variant="text"] {
  text-shadow: var(--glow-text-shadow);
}

/* When the wrapped control presses down on :active (e.g. Button's
   translate-y-px), move the whole unit — element + halo — together:
   the wrapper takes over the 1px shift and the child's own active
   translate/transform is neutralized so it doesn't apply twice. */
[data-digital-glow]:has(> :active) {
  translate: 0 1px;
}
[data-digital-glow][data-glow-variant] > :active {
  translate: none;
  transform: none;
}

/* Pulse — single shared keyframes; intensity controlled via CSS vars. */
@keyframes ionbit-ui-pulse-halo {
  0%, 100% {
    box-shadow: 0 0 0 0 color-mix(in oklab, var(--pulse-color) 0%, transparent);
  }
  50% {
    box-shadow: 0 0 var(--pulse-blur) var(--pulse-spread)
      color-mix(in oklab, var(--pulse-color) var(--pulse-alpha), transparent);
  }
}

@keyframes ionbit-ui-pulse-text {
  0%, 100% {
    text-shadow: 0 0 0 color-mix(in oklab, var(--pulse-color) 0%, transparent);
  }
  50% {
    text-shadow: 0 0 var(--pulse-blur)
      color-mix(in oklab, var(--pulse-color) var(--pulse-alpha), transparent);
  }
}

/* Ripple — circle expands from the press point to cover the element,
   then fades out. Peak opacity is set per-instance via --ripple-opacity.
   The span is removed on animationend. */
@keyframes ionbit-ui-ripple {
  0% {
    transform: scale(0);
    opacity: var(--ripple-opacity, 0.24);
  }
  60% {
    transform: scale(1);
    opacity: var(--ripple-opacity, 0.24);
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
`;

let injected = false;

export function ensureMotionStyles(): void {
  if (injected || typeof document === "undefined") return;
  const existing = document.getElementById("ionbit-ui-motion-styles");
  if (existing) {
    // Refresh stale content — after HMR the module-level `injected` flag
    // resets but the old <style> tag persists with outdated rules.
    if (existing.textContent !== STYLES) existing.textContent = STYLES;
    injected = true;
    return;
  }
  const el = document.createElement("style");
  el.id = "ionbit-ui-motion-styles";
  el.textContent = STYLES;
  document.head.appendChild(el);
  injected = true;
}
