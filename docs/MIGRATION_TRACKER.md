# Radix UI → Base UI Migration Tracker

Last updated: 2026-09-15

## Status

- **Migrated to Base UI:** 17 components
- **Still on Radix:** 12 components
- **No Base UI equivalent:** 4 components

## Migrated to Base UI

| Component    | Package                       | Notes                                                      |
| ------------ | ----------------------------- | ---------------------------------------------------------- |
| accordion    | `@base-ui/react/accordion`    | `type`/`collapsible` → `multiple`; `value` is now an array |
| avatar       | `@base-ui/react/avatar`       |                                                            |
| button       | `@base-ui/react/button`       | `asChild` → `render` prop                                  |
| button-group | `@base-ui/react/use-render`   | `ButtonGroupText` uses `useRender` for `render` prop       |
| checkbox     | `@base-ui/react/checkbox`     |                                                            |
| collapsible  | `@base-ui/react/collapsible`  |                                                            |
| combobox     | `@base-ui/react/combobox`     |                                                            |
| context-menu | `@base-ui/react/context-menu` | Migrated from `@radix-ui/react-context-menu`               |
| progress     | `@base-ui/react/progress`     |                                                            |
| radio-group  | `@base-ui/react/radio-group`  |                                                            |
| separator    | `@base-ui/react/separator`    |                                                            |
| switch       | `@base-ui/react/switch`       |                                                            |
| toast        | `@base-ui/react/toast`        | Migrated from Sonner                                       |
| toggle       | `@base-ui/react/toggle`       | Migrated from `@radix-ui/react-toggle`                     |
| toggle-group | `@base-ui/react/toggle-group` | Migrated from `@radix-ui/react-toggle-group`               |
| tooltip      | `@base-ui/react/tooltip`      |                                                            |

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

| Component     | Radix package                   | Base UI alternative     | Notes                                                                                                          |
| ------------- | ------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------- |
| dropdown-menu | `@radix-ui/react-dropdown-menu` | `@base-ui/react/menu`   | Base UI has no separate `dropdown-menu` — use `Menu` with a trigger. Shares menu primitives with context-menu. |
| hover-card    | `@radix-ui/react-hover-card`    | None                    | No Base UI equivalent. Would need a custom implementation or keep on Radix.                                    |
| label         | `@radix-ui/react-label`         | None                    | No Base UI equivalent. Could use native `<label>`. Low value to migrate.                                       |
| sheet         | `@radix-ui/react-dialog`        | `@base-ui/react/drawer` | Base UI has `drawer` (slide-in) instead of `dialog` (overlay). Different API — needs larger refactor.          |

## Suggested migration order

1. **dropdown-menu** — reuses `@base-ui/react/menu` primitives (same patterns as context-menu migration)
2. **tabs** — self-contained, low risk
3. **slider** — medium complexity
4. **dialog / alert-dialog** — used widely, higher impact
5. **select** — higher complexity
6. **popover** — used by other components
7. **scroll-area** — low priority, works fine on Radix
8. **badge / breadcrumb** — only uses `Slot`, follow the `useRender` pattern from `ButtonGroupText`
9. **sheet** — needs `dialog` → `drawer` refactor
10. **hover-card** — no Base UI equivalent, keep on Radix
11. **label** — no Base UI equivalent, keep on Radix or use native `<label>`

## Notes

- Base UI uses a `render` prop instead of Radix's `asChild` prop for
  polymorphic rendering. `Button` uses `render` on the Base UI Button
  primitive; `ButtonGroupText` uses the `useRender` hook — the pattern to
  follow for badge and breadcrumb. When `render` produces a non-`<button>`
  element (e.g. a link), pass `nativeButton={false}`.
- Base UI's `menu` primitives are shared between context-menu, dropdown-menu,
  and menubar. Migrating context-menu first (done) established the patterns.
- Accordion: Radix's `type="single"`/`collapsible` and string `value` became
  Base UI's array `value`/`defaultValue` plus `multiple`. Base UI has no
  `collapsible` prop — an open item can always be closed. Height animation
  uses `--accordion-panel-height` (was `--radix-accordion-content-height`).
  Roving focus was removed upstream per the APG guidance update — triggers
  are individual tab stops; Arrow/Home/End no longer move focus.
- Base UI's `drawer` is a slide-in panel, not a direct replacement for
  Radix's `dialog`-based sheet. The sheet component needs a larger refactor.
