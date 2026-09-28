import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Typewriter } from "./typewriter";

describe("Typewriter", () => {
  it("renders the wrapper with its marker", () => {
    const { container } = render(<Typewriter>HELLO</Typewriter>);
    expect(container.querySelector("[data-typewriter]")).toBeTruthy();
  });

  it("exposes the full text to assistive technology while typing", () => {
    const { container } = render(<Typewriter>CONNECTED</Typewriter>);
    const root = container.querySelector("[data-typewriter]");
    expect(root?.getAttribute("aria-hidden")).toBe("true");
    const srOnly = container.querySelector("[data-typewriter] + span");
    expect(srOnly?.textContent).toBe("CONNECTED");
  });

  it("renders the final text immediately when disabled", () => {
    const { container } = render(
      <Typewriter disabled>DEPLOY COMPLETE</Typewriter>,
    );
    const root = container.querySelector("[data-typewriter]");
    expect(root?.textContent).toBe("DEPLOY COMPLETE");
    expect(root?.hasAttribute("aria-hidden")).toBe(false);
    expect(root?.querySelector("[data-typewriter-caret]")).toBeNull();
  });

  it("shows a trailing caret while typing", () => {
    const { container } = render(<Typewriter>BOOT</Typewriter>);
    expect(container.querySelector("[data-typewriter-caret]")).toBeTruthy();
  });

  it("omits the caret when caret is false", () => {
    const { container } = render(<Typewriter caret={false}>QUIET</Typewriter>);
    expect(container.querySelector("[data-typewriter-caret]")).toBeNull();
  });

  it("renders as a different element", () => {
    const { container } = render(<Typewriter as="p">STATUS</Typewriter>);
    expect(container.querySelector("p[data-typewriter]")).toBeTruthy();
  });

  it("keeps nested markup intact", () => {
    const { container } = render(
      <Typewriter as="div" disabled>
        <span className="meta">v3 running</span>
        <button type="button">DEPLOY</button>
      </Typewriter>,
    );
    const root = container.querySelector("[data-typewriter]")!;
    expect(root.querySelector("button")?.textContent).toBe("DEPLOY");
    expect(root.querySelector(".meta")?.textContent).toBe("v3 running");
  });

  it("starts typing before first paint with trigger mount", () => {
    const { container } = render(
      <Typewriter trigger="mount">DEPLOYING</Typewriter>,
    );
    const root = container.querySelector("[data-typewriter]")!;
    // The layout-effect pass already emptied the nodes and put up the
    // sr copy + caret — the full text never flashed.
    expect(root.getAttribute("aria-hidden")).toBe("true");
    expect(root.textContent).not.toBe("DEPLOYING");
    expect(root.querySelector("[data-typewriter-caret]")).toBeTruthy();
  });

  it("leaves elements marked data-motion-skip untouched", () => {
    const { container } = render(
      <Typewriter as="div" trigger="hover">
        <span>TYPES</span>
        <span data-motion-skip className="keep">
          STAYS
        </span>
      </Typewriter>,
    );
    const root = container.querySelector("[data-typewriter]")!;
    fireEvent.pointerEnter(root);
    // The skipped subtree was never emptied or wrapped.
    expect(root.querySelector(".keep")?.textContent).toBe("STAYS");
  });

  it("does not stack carets across replays", async () => {
    const { container } = render(
      <Typewriter trigger="hover" speed={1}>
        HI
      </Typewriter>,
    );
    const root = container.querySelector("[data-typewriter]")!;
    fireEvent.pointerEnter(root);
    // Let the first pass settle — its caret persists at rest.
    await new Promise((r) => setTimeout(r, 300));
    fireEvent.pointerEnter(root);
    await new Promise((r) => setTimeout(r, 300));
    expect(container.querySelectorAll("[data-typewriter-caret]")).toHaveLength(
      1,
    );
  });

  it("replays the typing on pointerenter with trigger hover", () => {
    const { container } = render(
      <Typewriter trigger="hover" caret={false}>
        REPLAY
      </Typewriter>,
    );
    const root = container.querySelector("[data-typewriter]")!;
    fireEvent.pointerEnter(root);
    expect(root.getAttribute("aria-hidden")).toBe("true");
  });
});
