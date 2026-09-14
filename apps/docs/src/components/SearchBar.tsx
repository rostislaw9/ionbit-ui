import {
  BoxesIcon,
  HomeIcon,
  PackageIcon,
  Search,
  SettingsIcon,
  SparklesIcon,
  WrenchIcon,
  XIcon,
} from "lucide-react";
import {
  type ComponentType,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@ionbit-ui/ui";

import { componentManifest } from "../registry/components/manifest";
import { utilManifest } from "../registry/utils/manifest";
import { navItems } from "./navItems";

interface SearchEntry {
  label: string;
  path: string;
  group: string;
  icon: ComponentType<{ className?: string }>;
  keywords?: string;
}

const PAGE_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  "/": HomeIcon,
  "/docs/installation": SettingsIcon,
  "/docs/components": BoxesIcon,
  "/docs/utils": WrenchIcon,
  "/tokens": SparklesIcon,
};

/** Build the full search index from nav items, components, and utils. */
function useSearchIndex(): SearchEntry[] {
  return useMemo(() => {
    const pages: SearchEntry[] = navItems.map((item) => ({
      label: item.label,
      path: item.to,
      group: "Pages",
      icon: PAGE_ICONS[item.to] ?? HomeIcon,
    }));

    const components: SearchEntry[] = componentManifest.map((comp) => ({
      label: comp.label,
      path: `/docs/components/${comp.name}`,
      group: "Components",
      icon: PackageIcon,
      keywords: comp.description,
    }));

    const utils: SearchEntry[] = utilManifest.map((util) => ({
      label: util.label,
      path: `/docs/utils/${util.name}`,
      group: "Utils",
      icon: WrenchIcon,
      keywords: util.description,
    }));

    return [...pages, ...components, ...utils];
  }, []);
}

/** SearchBar — inline command palette on desktop, dialog on mobile.
 *
 * On desktop (sm+): an input in the top bar with a dropdown of grouped
 * results. Arrow keys navigate, Enter selects, Escape closes.
 * On mobile: a search icon button that opens a full-screen command dialog.
 * Supports ⌘K / Ctrl+K to activate.
 */
export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const index = useSearchIndex();
  const containerRef = useRef<HTMLDivElement>(null);

  // ⌘K / Ctrl+K to focus the search input (desktop) or open dialog (mobile).
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const input = containerRef.current?.querySelector("input");
        if (input) {
          input.focus();
        } else {
          setMobileOpen(true);
        }
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Close on outside click (desktop dropdown).
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const handleSelect = useCallback(
    (path: string) => {
      navigate(path);
      setOpen(false);
      setMobileOpen(false);
      setQuery("");
      containerRef.current?.querySelector("input")?.blur();
    },
    [navigate],
  );

  // Group results for display.
  const grouped = useMemo(() => {
    const filtered = query
      ? index.filter((entry) => {
          const q = query.toLowerCase();
          return (
            entry.label.toLowerCase().includes(q) ||
            entry.path.toLowerCase().includes(q) ||
            (entry.keywords?.toLowerCase().includes(q) ?? false)
          );
        })
      : index;

    const groups = new Map<string, SearchEntry[]>();
    for (const entry of filtered) {
      const list = groups.get(entry.group) ?? [];
      list.push(entry);
      groups.set(entry.group, list);
    }
    return groups;
  }, [index, query]);

  const resultGroups = [...grouped.entries()];

  const renderGroups = () => (
    <>
      <CommandEmpty>No results found.</CommandEmpty>
      {resultGroups.map(([group, entries], i) => (
        <div key={group}>
          {i > 0 && <CommandSeparator />}
          <CommandGroup heading={group}>
            {entries.map((entry) => {
              const Icon = entry.icon;
              return (
                <CommandItem
                  key={entry.path}
                  value={entry.path}
                  onSelect={() => handleSelect(entry.path)}
                >
                  <Icon />
                  <span>{entry.label}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </div>
      ))}
    </>
  );

  return (
    <>
      {/* Mobile: icon button + full-screen dialog */}
      <div className="sm:hidden">
        <Button
          variant="ghost"
          // size="icon"
          onClick={() => setMobileOpen(true)}
          aria-label="Search documentation"
        >
          <Search />
          Search
        </Button>
        <CommandDialog open={mobileOpen} onOpenChange={setMobileOpen}>
          <Command shouldFilter={false} className="rounded-md">
            <CommandInput
              placeholder="Search documentation..."
              value={query}
              onValueChange={setQuery}
            />
            <CommandList>{renderGroups()}</CommandList>
          </Command>
        </CommandDialog>
      </div>

      {/* Desktop: inline input with dropdown */}
      <div ref={containerRef} className="relative hidden sm:block">
        <Command
          shouldFilter={false}
          className="overflow-visible rounded-md bg-transparent"
        >
          <div className="relative">
            <CommandInput
              placeholder="Search documentation..."
              value={query}
              onValueChange={setQuery}
              onFocus={() => setOpen(true)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setOpen(false);
                  (e.target as HTMLInputElement).blur();
                }
              }}
              wrapperClassName="h-8 rounded-md border border-border bg-surface pe-9 ps-2.5 transition-[border-color,box-shadow] duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-border-strong [&:has(input:focus-visible)]:border-border-strong [&:has(input:focus-visible)]:shadow-focus"
            />
            {open ? (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setQuery("");
                  containerRef.current?.querySelector("input")?.blur();
                }}
                className="absolute end-0.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded text-foreground-subtle transition-colors hover:text-foreground"
                aria-label="Close search"
              >
                <XIcon className="h-3.5 w-3.5" />
              </button>
            ) : (
              <kbd className="pointer-events-none absolute end-2 top-1/2 hidden -translate-y-1/2 rounded border border-border px-1.5 text-[10px] font-medium text-foreground-subtle sm:inline-block">
                ⌘K
              </kbd>
            )}
          </div>
          {open && (
            <div className="absolute top-full mt-1 w-full overflow-hidden rounded-md border border-border bg-surface-elevated shadow-md">
              <CommandList>{renderGroups()}</CommandList>
            </div>
          )}
        </Command>
      </div>
    </>
  );
}
