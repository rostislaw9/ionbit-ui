# Ionbit UI Design System

## 1. Design Concept

Ionbit UI represents a modern digital interface system where UI elements
respond to user interaction with controlled energy, light, depth, and motion.

The system should feel like:

> A high-quality instrument from the near future.

Not:

> A generic cyberpunk website.

---

## 2. Color

The base palette should be dark and neutral.

Conceptual tokens:

--background
--surface
--surface-elevated
--surface-hover
--border
--border-strong
--foreground
--foreground-muted
--accent
--accent-muted
--success
--warning
--error

The accent color should be configurable.

The initial theme should use an electric cyan/blue family.

Avoid using multiple bright accent colors simultaneously unless there is a
specific semantic reason.

---

## 3. Surfaces

Surfaces should use subtle differences in:

- brightness;
- border;
- shadow;
- blur;
- accent lighting.

Avoid excessive glassmorphism.

Glass effects should only be used when they communicate depth.

---

## 4. Typography

Typography should prioritize readability.

Suggested direction:

- modern sans-serif;
- strong hierarchy;
- compact UI labels;
- generous heading spacing;
- restrained use of monospace typography.

Monospace may be used for:

- code;
- technical values;
- status information;
- command interfaces.

Do not make the entire UI monospace.

---

## 5. Borders

Borders should generally be subtle.

Possible treatment:

    1px solid rgba(...)

Some components may use accent borders on interaction.

Avoid permanently glowing borders everywhere.

---

## 6. Glow

Glow should be:

- localized;
- subtle;
- state-driven.

Use glow to communicate:

- focus;
- active state;
- hover;
- selected state;
- status.

Do not apply glow permanently to every component.

---

## 7. Motion

Motion should generally follow:

### Fast interaction

~100–180ms

For:

- hover;
- focus;
- button feedback.

### Medium transition

~180–350ms

For:

- dialogs;
- dropdowns;
- cards;
- tabs.

### Large transition

~350–600ms

Only for:

- page-level transitions;
- major state changes;
- showcase effects.

Avoid unnecessary animations longer than this.

These are starting guidelines, not absolute requirements.

---

## 8. Easing

Prefer modern easing curves.

Spring-based motion may be used for:

- magnetic interaction;
- draggable elements;
- buttons;
- spatial UI.

Avoid exaggerated bounce.

---

## 9. Magnetic Interaction

Magnetic interaction should subtly move an element toward the cursor.

It should:

- have configurable strength;
- have a limited radius;
- return smoothly;
- not interfere with clicking;
- disable/reduce itself for reduced motion.

It should never move an element so far that it becomes confusing.

---

## 10. Spotlight

Spotlight follows pointer position within a surface.

Use it primarily for:

- cards;
- panels;
- navigation items;
- feature blocks.

The effect should be subtle enough that users notice it only after interacting.

---

## 11. Pulse

Pulse communicates:

- activity;
- status;
- completion;
- attention.

Infinite pulse animations must be used sparingly.

---

## 12. Scan

Scan is a decorative effect resembling a light passing through a digital
surface.

Use only for:

- loading;
- active technical interfaces;
- showcase components;
- explicitly selected visual variants.

It should never become the default animation for all cards.

---

## 13. Distortion

Distortion is an advanced effect.

Use it very sparingly.

Potential uses:

- hover transitions;
- error states;
- experimental showcase components.

It must always have a fallback.

---

## 14. Interaction Hierarchy

Visual intensity should roughly follow:

    idle
      ↓
    hover
      ↓
    focus
      ↓
    active
      ↓
    success/error

The strongest effects should communicate the strongest states.

---

## 15. Accessibility

Visual effects must never be the only indication of state.

For example:

Bad:

    selected = glow only

Good:

    selected = semantic state + contrast + optional glow

---

## 16. Component Consistency

Components should share:

- radius scale;
- spacing scale;
- typography;
- color tokens;
- shadow language;
- animation timing;
- focus treatment.

Do not design each component independently.

---

## 17. Design Tokens

Use centralized tokens.

At minimum:

### Color

- background
- surface
- foreground
- muted
- accent
- destructive
- success
- warning

### Spacing

- xs
- sm
- md
- lg
- xl

### Radius

- sm
- md
- lg
- xl
- full

### Motion

- fast
- normal
- slow
- spring

### Effects

- glow intensity
- shadow intensity
- blur intensity

---

## 18. Dark and Light Themes

Both dark and light modes are first-class. The tokens package ships
`.dark` and `.light` variable sets with adjusted foreground, border,
accent, and semantic colors for optimal contrast in each mode.

The docs app includes a Mode Switcher component that toggles the
`.dark`/`.light` class on `<html>` with a radial View Transition
reveal animation. Theme state is persisted to `localStorage` with a
system-preference fallback and a no-FOUC inline bootstrap script.

Do not hardcode colors directly into individual components.

---

## 19. Design Review Rule

Before adding a visual effect, ask:

1. What does this effect communicate?
2. Does it improve usability?
3. Is it consistent with the design system?
4. Does it work without motion?
5. Is it performant?
6. Is it accessible?

If the answer is mostly "it looks cool", do not add it.
