import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Trace } from "./trace";

function setReducedMotion(enabled: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches: enabled && query.includes("reduce"),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Trace", () => {
  it("renders children", () => {
    render(
      <Trace>
        <button type="button">Syncing</button>
      </Trace>,
    );
    expect(screen.getByRole("button", { name: "Syncing" })).toBeTruthy();
  });

  it("renders a decorative beam layer", () => {
    const { container } = render(
      <Trace>
        <button type="button">Syncing</button>
      </Trace>,
    );
    const layer = container.querySelector("[data-ionbit-trace]");
    expect(layer).toBeTruthy();
    expect(layer?.getAttribute("aria-hidden")).toBe("true");
    expect((layer as HTMLElement).style.animation).toContain("ionbit-ui-trace");
  });

  it("keeps the wrapper mounted but hides the beam when inactive", () => {
    const { container } = render(
      <Trace active={false} data-testid="trace">
        <button type="button">Syncing</button>
      </Trace>,
    );
    expect(screen.getByRole("button", { name: "Syncing" })).toBeTruthy();
    expect(container.querySelector("[data-ionbit-trace]")).toBeNull();
    expect(screen.getByTestId("trace").style.position).toBe("relative");
  });

  it("renders children only when disabled", () => {
    const { container } = render(
      <Trace disabled>
        <button type="button">Syncing</button>
      </Trace>,
    );
    expect(screen.getByRole("button", { name: "Syncing" })).toBeTruthy();
    expect(container.querySelector("[data-ionbit-trace]")).toBeNull();
  });

  it("supports the as prop for block children", () => {
    const { container } = render(
      <Trace as="div" data-testid="trace">
        <div>Card</div>
      </Trace>,
    );
    expect(container.querySelector("[data-testid='trace']")?.tagName).toBe(
      "DIV",
    );
  });

  it("forwards className, style and other props to the wrapper", () => {
    render(
      <Trace className="custom" data-testid="trace" style={{ margin: 4 }}>
        <span>x</span>
      </Trace>,
    );
    const el = screen.getByTestId("trace");
    expect(el.className).toContain("custom");
    expect(el.style.margin).toBe("4px");
  });

  it("renders a static accent ring under reduced motion", () => {
    setReducedMotion(true);
    const { container } = render(
      <Trace>
        <button type="button">Syncing</button>
      </Trace>,
    );
    const layer = container.querySelector("[data-ionbit-trace]") as HTMLElement;
    expect(layer.style.animation).toBe("");
    expect(layer.style.boxShadow).toContain("inset");
  });
});
