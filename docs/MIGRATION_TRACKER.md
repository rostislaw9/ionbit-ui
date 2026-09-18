# Radix UI → Base UI Migration Tracker

Last updated: 2026-09-18

## Status

- **Migrated to Base UI:** 18 components
- **Still on Radix:** 12 components
- **No Base UI equivalent:** 3 components

## Migrated to Base UI

| Component     | Package                       | Notes                                                                                                    |
| ------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------- |
| accordion     | `@base-ui/react/accordion`    | `type`/`collapsible` → `multiple`; `value` is now an array                                               |
| avatar        | `@base-ui/react/avatar`       |                                                                                                          |
| button        | `@base-ui/react/button`       | `asChild` → `render` prop                                                                                |
| button-group  | `@base-ui/react/use-render`   | `ButtonGroupText` uses `useRender` for `render` prop                                                     |
| checkbox      | `@base-ui/react/checkbox`     |                                                                                                          |
| collapsible   | `@base-ui/react/collapsible`  |                                                                                                          |
| combobox      | `@base-ui/react/combobox`     |                                                                                                          |
| context-menu  | `@base-ui/react/context-menu` | Migrated from `@radix-ui/react-context-menu`                                                             |
| dropdown-menu | `@base-ui/react/menu`         | `asChild` → `render`; added Sub, CheckboxItem, RadioGroup/Item, Shortcut, `inset`, `destructive` variant |
| progress      | `@base-ui/react/progress`     |                                                                                                          |
| radio-group   | `@base-ui/react/radio-group`  |                                                                                                          |
| separator     | `@base-ui/react/separator`    |                                                                                                          |
| switch        | `@base-ui/react/switch`       |                                                                                                          |
| toast         | `@base-ui/react/toast`        | Migrated from Sonner                                                                                     |
| toggle        | `@base-ui/react/toggle`       | Migrated from `@radix-ui/react-toggle`                                                                   |
| toggle-group  | `@base-ui/react/toggle-group` | Migrated from `@radix-ui/react-toggle-group`                                                             |
| tooltip       | `@base-ui/react/tooltip`      |                                                                                                          |

## Still on Radix — Base UI equivalent available

| Component    | Radix package                  | Base UI package               | Priority | Notes                    |
| ------------ | ------------------------------ | ----------------------------- | -------- | ------------------------ |
| alert-dialog | `@radix-ui/react-alert-dialog` | `@base-ui/react/alert-dialog` | Medium   | Used widely              |
| dialog       | `@radix-ui/react-dialog`       | `@base-ui/react/dialog`       | Medium   | Used widely              |
| popover      | `@radix-ui/react-popover`      | `@base-ui/react/popover`      | Medium   | Used by other components |
| scroll-area  | `@radix-ui/react-scroll-area`  | `@base-ui/react/scroll-area`  | Low      | Works fine on Radix      |
| select       | `@radix-ui/react-select`       | `@base-ui/react/select`       | High     | Higher complexity        |
| slider       | `@radix-ui/react-slider`       | `@base-ui/react/slider`       | Medium   | Medium complexity        |
| tabs         | `@radix-ui/react-tabs`         | `@base-ui/react/tabs`         | Medium   | Self-contained           |

## Still on Radix — uses `@radix-ui/react-slot` only

These components only use `@radix-ui/react-slot` for the `asChild` pattern.
Base UI uses a `render` prop instead (see Button / ButtonGroupText for the
established pattern: `useRender` hook for non-primitive elements).

| Component  | Notes                            |
| ---------- | -------------------------------- |
| badge      | `Slot` for polymorphic rendering |
| breadcrumb | `Slot` for polymorphic rendering |

## Still on Radix — no direct Base UI equivalent

| Component  | Radix package                | Base UI alternative     | Notes                                                                                                 |
| ---------- | ---------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------- |
| hover-card | `@radix-ui/react-hover-card` | None                    | No Base UI equivalent. Would need a custom implementation or keep on Radix.                           |
| label      | `@radix-ui/react-label`      | None                    | No Base UI equivalent. Could use native `<label>`. Low value to migrate.                              |
| sheet      | `@radix-ui/react-dialog`     | `@base-ui/react/drawer` | Base UI has `drawer` (slide-in) instead of `dialog` (overlay). Different API — needs larger refactor. |

## Suggested migration order

1. **tabs** — self-contained, low risk
2. **slider** — medium complexity
3. **dialog / alert-dialog** — used widely, higher impact
4. **select** — higher complexity
5. **popover** — used by other components
6. **scroll-area** — low priority, works fine on Radix
7. **badge / breadcrumb** — only uses `Slot`, follow the `useRender` pattern from `ButtonGroupText`
8. **sheet** — needs `dialog` → `drawer` refactor
9. **hover-card** — no Base UI equivalent, keep on Radix
10. **label** — no Base UI equivalent, keep on Radix or use native `<label>`

## Notes

- Base UI uses a `render` prop instead of Radix's `asChild` prop for
  polymorphic rendering. `Button` uses `render` on the Base UI Button
  primitive; `ButtonGroupText` uses the `useRender` hook — the pattern to
  follow for badge and breadcrumb. When `render` produces a non-`<button>`
  element (e.g. a link), pass `nativeButton={false}`.
- Base UI's `menu` primitives are shared between context-menu, dropdown-menu,
  and menubar. Migrating context-menu first established the patterns that
  dropdown-menu (done) reused.
- Accordion: Radix's `type="single"`/`collapsible` and string `value` became
  Base UI's array `value`/`defaultValue` plus `multiple`. Base UI has no
  `collapsible` prop — an open item can always be closed. Height animation
  uses `--accordion-panel-height` (was `--radix-accordion-content-height`).
  Roving focus was removed upstream per the APG guidance update — triggers
  are individual tab stops; Arrow/Home/End no longer move focus.
- Base UI's `drawer` is a slide-in panel, not a direct replacement for
  Radix's `dialog`-based sheet. The sheet component needs a larger refactor.
