import * as TabsPrimitive from "@radix-ui/react-tabs";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

type Direction = "left" | "right" | null;

interface TabsContextValue {
  indicator: { x: number; w: number } | null;
  listRef: React.MutableRefObject<HTMLDivElement | null>;
  direction: Direction;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs subcomponents must be used within <Tabs>");
  return ctx;
}

export interface TabsProps {
  children: ReactNode;
  /** The value of the tab to select by default (uncontrolled). */
  defaultValue?: string;
  /** Controlled selected value. */
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

/**
 * Tabs — Radix-based tabs with a sliding active indicator.
 *
 * Built on `@radix-ui/react-tabs`, shadcn-inspired. The indicator measures
 * the active trigger's position within the list and animates `transform`
 * + `width` to slide between tabs. Content panels slide in horizontally —
 * right-to-left when switching to a tab on the right, left-to-right when
 * switching to a tab on the left.
 *
 * Accessibility: Radix sets `role="tablist"`, `role="tab"`, and
 * `role="tabpanel"` with appropriate `aria-selected` and `aria-controls`
 * attributes. Keyboard navigation (Arrow keys, Home, End) is handled by
 * Radix.
 *
 * Reduced motion: the base CSS layer collapses all transition/animation
 * durations to ~0ms under `prefers-reduced-motion: reduce`, so both the
 * sliding indicator and content entrance are disabled automatically.
 */
export function Tabs({
  children,
  defaultValue,
  value,
  onValueChange,
  className,
}: TabsProps) {
  const [activeValue, setActiveValue] = useState(value ?? defaultValue);
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(
    null,
  );
  const [direction, setDirection] = useState<Direction>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const prevValueRef = useRef<string | undefined>(value ?? defaultValue);

  const handleValueChange = useCallback(
    (next: string) => {
      const list = listRef.current;
      if (list) {
        const triggers = Array.from(
          list.querySelectorAll<HTMLElement>(`[role="tab"]`),
        );
        const prevIdx = triggers.findIndex(
          (t) => t.getAttribute("data-value") === prevValueRef.current,
        );
        const nextIdx = triggers.findIndex(
          (t) => t.getAttribute("data-value") === next,
        );
        if (prevIdx !== -1 && nextIdx !== -1) {
          setDirection(nextIdx > prevIdx ? "right" : "left");
        }
      }
      prevValueRef.current = next;
      setActiveValue(next);
      onValueChange?.(next);
    },
    [onValueChange],
  );

  // Sync controlled value
  useEffect(() => {
    if (value !== undefined) {
      const list = listRef.current;
      if (list) {
        const triggers = Array.from(
          list.querySelectorAll<HTMLElement>(`[role="tab"]`),
        );
        const prevIdx = triggers.findIndex(
          (t) => t.getAttribute("data-value") === prevValueRef.current,
        );
        const nextIdx = triggers.findIndex(
          (t) => t.getAttribute("data-value") === value,
        );
        if (prevIdx !== -1 && nextIdx !== -1) {
          setDirection(nextIdx > prevIdx ? "right" : "left");
        }
      }
      prevValueRef.current = value;
      setActiveValue(value);
    }
  }, [value]);

  // Measure and position the sliding indicator
  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list || activeValue === undefined) return;
    const trigger = list.querySelector<HTMLElement>(
      `[data-state="active"][role="tab"]`,
    );
    if (!trigger) return;
    setIndicator({ x: trigger.offsetLeft, w: trigger.offsetWidth });
  }, [activeValue]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  const contextValue = useMemo<TabsContextValue>(
    () => ({ indicator, listRef, direction }),
    [indicator, direction],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <TabsPrimitive.Root
        defaultValue={defaultValue}
        value={value}
        onValueChange={handleValueChange}
        className={cn("flex flex-col gap-4", className)}
      >
        {children}
      </TabsPrimitive.Root>
    </TabsContext.Provider>
  );
}

export type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List>;
/**
 * TabsList — the container row of tab triggers.
 *
 * Renders a Radix Tabs List with a sliding accent indicator that animates
 * between the active tab. The indicator is an absolutely-positioned span
 * whose `transform` and `width` are driven by the Tabs context.
 */
export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  function TabsList({ className, children, ...props }, ref) {
    const { indicator, listRef } = useTabsContext();
    return (
      <TabsPrimitive.List
        ref={(node) => {
          listRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(
          "relative inline-flex items-center gap-1 rounded-md border border-border bg-surface p-1",
          className,
        )}
        {...props}
      >
        {children}
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute start-0 top-1 bottom-1 rounded bg-accent-muted transition-[transform,width,opacity] duration-[var(--duration-normal)] ease-[var(--ease-standard)] will-change-transform",
          )}
          style={{
            width: indicator ? `${indicator.w}px` : "0px",
            transform: indicator
              ? `translateX(${indicator.x}px)`
              : "translateX(0)",
            opacity: indicator ? "1" : "0",
          }}
        />
      </TabsPrimitive.List>
    );
  },
);

export type TabsTriggerProps = React.ComponentProps<
  typeof TabsPrimitive.Trigger
>;
/**
 * TabsTrigger — an individual tab button within `TabsList`.
 *
 * Sets `data-value` so the parent Tabs can track direction for content
 * slide animation. Active and hover states use accent and foreground
 * tokens respectively.
 */
export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  function TabsTrigger({ className, value, ...props }, ref) {
    return (
      <TabsPrimitive.Trigger
        ref={ref}
        value={value}
        data-value={value}
        className={cn(
          "relative z-[1] inline-flex items-center justify-center rounded px-3 py-1 text-sm font-medium whitespace-nowrap text-foreground-muted transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] select-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 data-[state=active]:text-accent",
          className,
        )}
        {...props}
      />
    );
  },
);

export type TabsContentProps = React.ComponentProps<
  typeof TabsPrimitive.Content
>;
/**
 * TabsContent — the panel body for a single tab.
 *
 * Slides in horizontally based on the navigation direction tracked by the
 * Tabs context: right-to-left when moving to a tab on the right, and
 * left-to-right when moving to a tab on the left. Inactive panels are
 * hidden via `data-[state=inactive]:hidden`.
 */
export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  function TabsContent({ className, children, ...props }, ref) {
    const { direction } = useTabsContext();
    // Moving right → new content enters from the right (slides left)
    // Moving left  → new content enters from the left  (slides right)
    const slideIn =
      direction === "right"
        ? "data-[state=active]:slide-in-from-right-4"
        : "data-[state=active]:slide-in-from-left-4";
    return (
      <TabsPrimitive.Content
        ref={ref}
        className={cn(
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none data-[state=active]:animate-in data-[state=active]:duration-[var(--duration-normal)] data-[state=active]:ease-[var(--ease-standard)] data-[state=active]:fade-in-50 data-[state=inactive]:hidden",
          slideIn,
          className,
        )}
        {...props}
      >
        {children}
      </TabsPrimitive.Content>
    );
  },
);
