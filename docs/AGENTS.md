# Ionbit UI — Agent Rules

## 1. Project Overview

This repository contains an open-source React/TypeScript UI component
library with a distinctive "Digital" visual identity.

The library is intended to provide production-quality UI primitives and
components that feel modern, responsive, and alive.

The visual direction is inspired by:

- modern digital interfaces;
- Linear-like product polish;
- Raycast-like interaction quality;
- futuristic interfaces;
- restrained sci-fi aesthetics.

It must NOT become a generic "neon cyberpunk" component collection.

The primary differentiator is:

> Production-quality UI components + a coherent motion/interaction system.

Motion and visual effects are part of the design system, not random decoration.

---

## 2. Core Product Philosophy

The library must satisfy all of the following:

1. Components must be genuinely useful in production.
2. Components must be composable.
3. Components must be accessible.
4. Components must work without animation when required.
5. Motion must enhance interaction rather than distract from it.
6. Visual effects must be consistent across the library.
7. The library must have a recognizable visual identity.
8. Developers must be able to understand and customize the implementation.
9. Components should not hide important behavior behind magic abstractions.
10. The project must be useful even if all decorative effects are disabled.

The goal is NOT:

> "Make the most animated UI possible."

The goal is:

> "Create a UI system where interaction feels exceptionally polished."

---

## 3. Take Inspiration, Don't Clone

The project may take inspiration from existing ecosystems, including:

- shadcn/ui
- Radix UI
- Sonner
- Base UI
- Headless UI
- Magic UI
- Aceternity UI
- Motion Primitives
- ReUI
- React Aria
- other relevant libraries

Inspiration is welcome; wholesale copying of code, design,
documentation, naming, or visual identity is not.

The project must have its own:

- design language;
- component styling;
- motion language;
- interaction patterns;
- documentation experience;
- branding.

When a component wraps a third-party library (e.g., Toast built on
Sonner), its source JSDoc and registry `about` field must credit the
original author (e.g., "Built on Sonner by Emil Kowalski").

Competitive research is encouraged.

Copying is not.

---

## 4. Source-Code Ownership Philosophy

The project follows the shadcn-inspired source-ownership model:

Developers should be able to add components directly to their application
source tree and own the resulting code.

The goal is not to force users into an opaque runtime dependency.

The preferred workflow is conceptually:

    npx <library-cli> add button

which produces something similar to:

    src/components/ui/button.tsx

The exact implementation should be determined during architecture planning.

A conventional npm package may still be provided for shared utilities,
tokens, primitives, or optional runtime functionality.

Do not implement a registry/CLI prematurely.

First establish the component architecture.

---

## 5. Technology

Primary technologies:

- TypeScript
- React
- Vite
- CSS
- CSS custom properties
- modern browser APIs where appropriate

Potential technologies:

- Motion / motion/react
- Radix UI
- Base UI
- React Aria
- class-variance-authority
- clsx
- tailwind-merge
- Vitest
- Testing Library
- Playwright

Dependencies must be justified.

Do not introduce a dependency merely because it is popular.

Prefer small, stable, well-maintained dependencies.

---

## 6. Framework Independence

The core components should not depend on Next.js.

The component library must work in a normal React + Vite application.

Where practical, components should also work in:

- Next.js
- Remix
- React Router applications
- other standard React environments.

Do not introduce browser-only behavior into components unless required.

If a component requires browser APIs, isolate that behavior.

---

## 7. Accessibility

Accessibility is a first-class requirement.

Components must support:

- keyboard navigation;
- focus management;
- semantic HTML;
- screen readers;
- appropriate ARIA attributes;
- visible focus states;
- reduced motion;
- disabled states;
- loading states;
- error states.

Never remove an accessibility feature purely because it makes an animation
harder to implement.

When using headless primitives, preserve their accessibility behavior.

---

## 8. Reduced Motion

Every animated interaction must respect:

    prefers-reduced-motion

When reduced motion is enabled:

- disable unnecessary movement;
- reduce transitions;
- remove large transforms;
- remove decorative particle effects;
- preserve functional state changes.

A component must remain understandable without motion.

---

## 9. Performance

Performance is a product feature.

Avoid:

- unnecessary React renders;
- expensive layout calculations;
- continuous JavaScript animation loops when CSS can handle the effect;
- unnecessary DOM nodes;
- large animation libraries for trivial effects;
- canvas/WebGL where CSS is sufficient.

Prefer:

- CSS transforms;
- opacity;
- compositor-friendly properties;
- requestAnimationFrame only when genuinely necessary;
- event delegation where useful.

Mouse-following effects must be throttled or otherwise implemented efficiently.

Do not create a permanent animation loop for an idle component.

---

## 10. Animation Principles

Animations should generally be:

- short;
- responsive;
- physically plausible;
- subtle;
- interruptible;
- reversible.

Avoid:

- excessive bounce;
- long delays;
- animations that block interaction;
- visual noise;
- constant movement;
- distracting infinite loops.

Animation should communicate:

- hover;
- focus;
- selection;
- state change;
- progress;
- success;
- error;
- hierarchy.

Decorative animation must be optional where practical.

---

## 11. Signature Visual Effects

The design system may contain the following interaction primitives:

- Glow
- Magnetic
- Spotlight
- Pulse
- Scan
- Tilt
- Reveal
- Ripple
- Morph
- Distortion
- Parallax

These are NOT automatically appropriate for every component.

For each effect, document:

- intended use;
- visual purpose;
- accessibility behavior;
- performance characteristics;
- reduced-motion behavior;
- recommended intensity.

Effects should be composable where technically sensible.

For example:

    <Card spotlight tilt />

or:

    <Button magnetic glow />

But avoid API designs that make components difficult to understand.

---

## 12. Visual Restraint

The project must avoid the following failure mode:

    black background
    + purple gradient
    + neon glow
    + particles
    + grid
    + scanlines
    = "futuristic"

That is not sufficient design.

The Digital aesthetic should rely on:

- hierarchy;
- typography;
- spacing;
- surface depth;
- restrained contrast;
- controlled accent colors;
- precise motion;
- subtle light;
- interaction feedback.

Effects should feel intentional.

---

## 13. Component API

Component APIs should be:

- predictable;
- composable;
- TypeScript-safe;
- discoverable;
- minimally magical.

Prefer:

    <Button variant="primary" size="md">

over:

    <Button mode="digitalPrimaryMediumV2">

Do not create dozens of boolean props without a clear design rationale.

If a feature is a reusable interaction, consider extracting it into a
separate primitive.

---

## 14. Component States

Every interactive component should explicitly consider:

- default;
- hover;
- focus;
- focus-visible;
- active;
- disabled;
- loading;
- selected;
- error;
- success;
- reduced-motion.

Not every component needs every state.

---

## 15. Browser Support

Do not depend on experimental browser APIs unless there is a graceful
fallback.

Progressive enhancement is preferred.

Visual effects may degrade gracefully on older or limited browsers.

Functionality must remain usable.

---

## 16. Documentation

Every component must eventually include:

1. Overview
2. Installation
3. Basic usage
4. API
5. Variants
6. Accessibility notes
7. Motion behavior
8. Examples
9. Source code
10. Copy/add command

The documentation site is part of the product.

It should not look like autogenerated API documentation.

---

## 17. Playground

The documentation site should provide interactive controls for components.

Where meaningful, users should be able to modify:

- variant;
- size;
- color;
- intensity;
- animation;
- interaction strength;
- radius;
- other relevant parameters.

The playground must make the design system easy to explore.

---

## 18. Testing

Use appropriate automated testing.

At minimum:

- unit tests for utilities and complex behavior;
- component tests for important interaction logic;
- accessibility testing;
- visual/regression testing where useful;
- end-to-end testing for critical documentation/registry workflows.

Do not create meaningless snapshot tests for every component.

---

## 19. Code Style

Use:

- strict TypeScript;
- ESLint;
- Prettier;
- clear naming;
- small components;
- explicit public APIs;
- **Component JSDoc:** every exported component and every named
  subcomponent must start with a `/** */` doc block. The block must
  include a one-line purpose, a note that the component is
  Radix/shadcn-inspired where applicable, and a dedicated
  **Accessibility** section. Third-party dependencies used directly
  (e.g., Sonner) must be credited.

Avoid:

- `any` unless unavoidable;
- unnecessary type assertions;
- huge components;
- deeply nested conditional rendering;
- premature abstractions;
- duplicated animation logic.

---

## 20. Documentation vs Implementation

Do not claim that a feature is supported until it has actually been tested.

Do not document hypothetical APIs.

Do not write marketing claims about performance or accessibility without
verification.

---

## 21. Development Process

Always follow:

1. Research
2. Design
3. Architecture
4. Prototype
5. Implementation
6. Testing
7. Documentation
8. Polish

Do not skip research because implementation appears obvious.

Do not implement multiple phases simultaneously unless explicitly requested.

---

## 22. Quality Gate

A component is not considered complete merely because it renders.

Before considering it complete, verify:

- API quality;
- visual quality;
- accessibility;
- keyboard behavior;
- reduced motion;
- responsive behavior;
- performance;
- dark/light behavior where applicable;
- documentation;
- tests.

---

## 23. Scope Control

The first version should contain a relatively small number of excellent
components.

Prefer:

    12 excellent components

over:

    50 mediocre components.

Do not add components simply to increase the component count.

---

## 24. Communication

When reporting progress:

- explain what was implemented;
- explain what was tested;
- identify limitations;
- identify decisions that require user approval;
- do not hide technical compromises.

If an important architectural decision is uncertain, stop and ask before
building a large amount of code around it.

---

## 25. Editor Workflow Rules

These rules exist because of how the editor's auto-format-on-save and
organize-imports plugins interact with in-progress edits.

### 25.1 Add code before imports

When importing a component into the current file, always add the
**consuming code first** and only then add the import statement.

If the import is added first, the editor's organize-imports-on-save
plugin will remove it as "unused" the next time the file is saved,
because no code references it yet. This is a recurring source of
lost imports and broken builds.

Order of operations for adding a component to a file:

1. Write the JSX/usage that references the component.
2. Add the `import` statement.
3. Save.

### 25.2 Keep changelog and docs up to date on every commit

When generating a commit message, always:

1. Update `CHANGELOG.md` under the appropriate `[Unreleased]` or
   release section with the change being committed.
2. Keep all docs (`README.md`, `docs/AGENTS.md`,
   `docs/ARCHITECTURE.md`, `docs/DESIGN_SYSTEM.md`,
   `docs/PRODUCT_SPEC.md`, `CONTRIBUTING.md`) consistent with the
   current state of the codebase.

A commit that changes behavior, components, structure, or public API
without updating the changelog and related docs is incomplete. Do not
rely on "I'll document it later" — later commits pile up and the
changelog drifts from reality.

### 25.3 Rebuild the registry after component changes

When modifying any component source under `packages/ui/src/`
or `packages/motion/src/`, always run `yarn registry:build` before
committing. The registry JSON files in `registry/items/` are generated
from the component source and must stay in sync. A component change
without a registry rebuild leaves the CLI shipping stale source code.

---

## 26. Commit Message Conventions

All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/)
specification. This keeps the history readable, enables automated
changelog generation, and is a prerequisite for the automated npm
publish workflow (which is triggered by GitHub Release tags).

### 26.1 Format

    <type>: <subject>

    <optional body>

- The **subject** is lowercase, imperative mood, no trailing period.
- The **body** (when present) is separated by a blank line and explains
  _why_ the change was made, not just _what_ changed.

### 26.2 Types

| Type       | When to use                                                               |
| ---------- | ------------------------------------------------------------------------- |
| `feat`     | A new feature or capability (new component, new CLI command, new option)  |
| `fix`      | A bug fix (something that was broken now works correctly)                 |
| `refactor` | Code restructuring without behavior change (renames, extraction, cleanup) |
| `perf`     | A change that improves performance                                        |
| `docs`     | Documentation-only changes (docs pages, JSDoc, README, CHANGELOG)         |
| `test`     | Adding or fixing tests                                                    |
| `chore`    | Tooling, config, version bumps, dependency updates                        |
| `ci`       | CI/CD pipeline changes (workflows, build scripts)                         |
| `style`    | Formatting, whitespace, semicolons — no code logic change                 |
| `build`    | Build system or external dependencies changes                             |

### 26.3 Examples

    feat: add Copy Page button to component detail page
    fix: sidebar auto-scroll, extract showcase grid, optimize docs chunks
    refactor: remove .js extensions from relative imports
    docs: update component demos with real-world examples and wording
    chore: bump version to 0.1.1 for first npm publish
    ci: add OIDC publish workflow and version sync script
    perf: move Shiki highlighting to build time for instant page loads

### 26.4 Automated commits

The publish workflow (`tooling/sync-versions.mjs` + `.github/workflows/publish.yml`)
generates commits automatically with the `chore:` prefix:

    chore: sync version to 0.1.2

This is the only exception to the "agent writes the commit message"
rule — the sync script owns these commits.

### 26.5 Scope (optional)

A scope may be added in parentheses for clarity when the change is
narrowly focused:

    fix(cli): auto-install deps when adding a component
    feat(docs): add manual install tab with step markers

Scopes are optional but encouraged for changes that touch a single
package or subsystem.

### 26.6 Creating GitHub releases

When asked to create a release, **just create the release** using
`gh release create` with a proper message based on the `[Unreleased]`
changelog entries. Do NOT run the version sync script — it runs
automatically inside the release workflow. Do NOT inspect the sync
script, bump versions manually, or do any prep work beyond reading
the changelog and creating the release.
