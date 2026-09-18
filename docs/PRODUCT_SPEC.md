# Ionbit UI

## Working Description

A production-quality React UI component system with a distinctive digital
visual language and integrated motion/interaction primitives.

The library combines:

- accessible UI primitives;
- polished visual components;
- interaction effects;
- motion;
- a highly interactive documentation/playground experience.

---

## Target Users

Primary:

- frontend developers;
- React developers;
- indie hackers;
- startup developers;
- product designers who can code;
- developers building polished marketing/product interfaces.

Secondary:

- developers building experimental interfaces;
- developers who want better default motion;
- developers who want source-owned components.

---

## Problem

Existing React component ecosystems generally fall into several categories:

### Traditional component libraries

Strong functionality and accessibility, but often visually generic.

### shadcn-style libraries

Excellent source ownership and customization, but the ecosystem is increasingly
crowded.

### Animation libraries

Excellent visual effects but often focus heavily on impressive demos rather
than production-ready application primitives.

### Design systems

Production-ready but frequently visually conservative.

Ionbit UI should combine these strengths.

---

## Product Promise

> Build production interfaces that feel alive without having to design every
> interaction from scratch.

---

## Design Position

Ionbit UI should feel:

- precise;
- responsive;
- futuristic;
- sophisticated;
- dark;
- technical;
- alive;
- restrained.

It should NOT feel:

- childish;
- overly playful;
- crypto-themed;
- hacker-themed;
- generic cyberpunk;
- overloaded with gradients;
- overloaded with particles.

---

## MVP

The first MVP iteration is complete (source, registry, CLI, and docs
app). No package has been published to npm yet — publishing is a
follow-up task. The library contains 43 UI components and 7 motion
primitives:

### Foundation

- Button
- ButtonGroup
- Checkbox
- Combobox
- Field
- Input
- InputGroup
- Label
- ModeSwitcher
- NativeSelect
- RadioGroup
- ScrollArea
- Select
- Separator
- Slider
- Switch
- Textarea
- Toggle
- ToggleGroup

### Surfaces

- AlertDialog
- Card
- Dialog
- HoverCard
- Popover
- Sheet
- Table
- Tooltip

### Feedback

- Alert
- Avatar
- Badge
- Empty
- Progress
- Skeleton
- Spinner
- Toast

### Navigation

- Accordion
- Breadcrumb
- Collapsible
- Command
- ContextMenu
- DropdownMenu
- Pagination
- Tabs

### Motion

- Glow
- Magnetic
- Pulse
- Reveal
- Ripple
- Spotlight
- Tilt

---

## Motion MVP

Initial motion primitives:

- Glow
- Magnetic
- Pulse
- Reveal
- Spotlight

Additional effects should come later.

## Motion Roadmap

Next motion primitives, in planned implementation order. All follow the
shared primitive contract: `intensity`/`disabled` props, composable
wrappers, `prefers-reduced-motion` self-disable, compositor-only
properties.

1. **Scramble** — text "decodes" into place: characters cycle random
   glyphs then settle, on state change or first reveal. For stat
   values, version strings, status transitions. Reduced motion: final
   text renders instantly.
2. **Trace** — a single accent point traveling along an element's
   border, for processing/focus/active states on cards and inputs.
   Conic-gradient mask or `offset-path`, CSS-only. Reduced motion:
   static border highlight.
3. **Morph** — element morphs between states (button → spinner →
   check; chip → expanded panel) via FLIP or the View Transitions API.
   Reduced motion: instant swap.
4. **Scan** — a light sweep crossing a surface once, on trigger only
   (success, verified, copy confirmation). Never loops. Reduced
   motion: skipped entirely.

Deliberately not planned: Parallax (scroll-jacking risk, low product
value) and Distortion (too close to generic cyberpunk decoration).

---

## Showcase Components

At least several components should demonstrate the unique visual identity
particularly strongly.

Examples:

- Animated Tabs
- Digital Command Palette
- Energy Progress
- Glow Input
- Magnetic Button
- Spotlight Card
- Status Indicator

---

## Documentation Website

The website should contain:

- landing page;
- component catalog;
- component documentation;
- interactive playground;
- installation instructions;
- source code;
- copy/add commands;
- design tokens;
- motion documentation.

---

## Registry / CLI

The registry and CLI are built (first MVP iteration). The CLI is not
yet published to npm — publishing is a follow-up task.

Conceptual experience:

    npx ionbit-ui add button

The CLI:

1. identifies the component;
2. resolves dependencies;
3. copies source code;
4. copies required styles/tokens;
5. updates configuration if necessary.

---

## Success Criteria

The MVP is successful if:

1. Developers can install/use components easily.
2. Components have a distinctive visual identity inspired by, but not
   cloning, shadcn-style UI.
3. Components remain practical for real applications.
4. Animations feel polished rather than gimmicky.
5. Accessibility is not sacrificed for visual effects.
6. The documentation website itself is impressive.
7. The library is technically maintainable.
8. The project can be demonstrated effectively in a portfolio or interview.
