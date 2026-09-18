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
follow-up task. The MVP contains 31 UI components and 5 motion
primitives:

### Foundation

- Button
- Input
- Textarea
- Select
- Checkbox
- Switch
- Slider
- Label
- RadioGroup
- ScrollArea
- Separator

### Surfaces

- Card
- Dialog
- AlertDialog
- Sheet
- Popover
- Tooltip
- HoverCard

### Feedback

- Toast
- Progress
- Skeleton
- Badge
- Alert
- Avatar

### Navigation

- Tabs
- Accordion
- Pagination
- Breadcrumb
- ContextMenu
- DropdownMenu
- Command

### Motion

- Glow
- Spotlight
- Magnetic
- Pulse
- Reveal
- Ripple

---

## Motion MVP

Initial motion primitives:

- Glow
- Spotlight
- Magnetic
- Pulse
- Reveal

Additional effects should come later.

---

## Showcase Components

At least several components should demonstrate the unique visual identity
particularly strongly.

Examples:

- Magnetic Button
- Spotlight Card
- Digital Command Palette
- Animated Tabs
- Energy Progress
- Status Indicator
- Glow Input

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
