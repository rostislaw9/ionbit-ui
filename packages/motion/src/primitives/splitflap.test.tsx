import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SplitFlap } from "./splitflap";

describe("SplitFlap", () => {
  it("renders the wrapper with its marker", () => {
    const { container } = render(<SplitFlap>GATE</SplitFlap>);
    expect(container.querySelector("[data-splitflap]")).toBeTruthy();
  });

  it("flips in before first paint with trigger mount", () => {
    const { container } = render(
      <SplitFlap trigger="mount">BOARDING</SplitFlap>,
    );
    const root = container.querySelector("[data-splitflap]")!;
    // The layout-effect pass already emptied the text and built the
    // flap cells — the finished word never flashed.
    expect(root.getAttribute("aria-hidden")).toBe("true");
    expect(root.querySelector("[data-splitflap-cell]")).toBeTruthy();
  });

  it("renders the final text immediately when disabled", () => {
    const { container } = render(<SplitFlap disabled>DEPARTED</SplitFlap>);
    const root = container.querySelector("[data-splitflap]")!;
    expect(root.textContent).toBe("DEPARTED");
    expect(root.querySelector("[data-splitflap-cell]")).toBeNull();
    expect(root.hasAttribute("aria-hidden")).toBe(false);
  });

  it("cycles forward through the charset, ending on the target", () => {
    const { container } = render(
      <SplitFlap trigger="hover" charset="0123456789">
        {"5"}
      </SplitFlap>,
    );
    const root = container.querySelector("[data-splitflap]")!;
    fireEvent.pointerEnter(root);
    // No previous glyph — the wheel spins up; the hinged leaves
    // already carry the first card's halves.
    const cell = root.querySelector("[data-splitflap-cell]")!;
    expect(cell.querySelector("[data-splitflap-flap-top]")).toBeTruthy();
    expect(cell.querySelector("[data-splitflap-flap-bottom]")).toBeTruthy();
  });

  it("snaps characters outside the charset", () => {
    const { container } = render(
      <SplitFlap trigger="mount" charset="0123456789">
        {"A9"}
      </SplitFlap>,
    );
    const root = container.querySelector("[data-splitflap]")!;
    const cells = root.querySelectorAll("[data-splitflap-cell]");
    expect(cells).toHaveLength(2);
    // "A" is off-charset — a static module, no card.
    expect(cells[0]!.textContent).toBe("A");
    expect(cells[0]!.children).toHaveLength(0);
    // "9" animates — the hinged leaves are present.
    expect(cells[1]!.querySelector("[data-splitflap-flap-top]")).toBeTruthy();
    expect(
      cells[1]!.querySelector("[data-splitflap-flap-bottom]"),
    ).toBeTruthy();
  });

  it("leaves elements marked data-motion-skip untouched", () => {
    const { container } = render(
      <SplitFlap as="div" trigger="hover">
        <span>FLIPS</span>
        <span data-motion-skip className="keep">
          STAYS
        </span>
      </SplitFlap>,
    );
    const root = container.querySelector("[data-splitflap]")!;
    fireEvent.pointerEnter(root);
    expect(root.querySelector(".keep")?.textContent).toBe("STAYS");
  });

  it("restores the text after the pass completes", async () => {
    const { container } = render(
      <SplitFlap trigger="mount" interval={1}>
        DONE
      </SplitFlap>,
    );
    await new Promise((r) => setTimeout(r, 300));
    const root = container.querySelector("[data-splitflap]")!;
    expect(root.textContent).toBe("DONE");
    expect(root.querySelector("[data-splitflap-cell]")).toBeNull();
    expect(root.hasAttribute("aria-hidden")).toBe(false);
  });

  it("outlines the whole module block with cards", async () => {
    const { container } = render(
      <SplitFlap trigger="mount" interval={1} cards>
        ON TIME
      </SplitFlap>,
    );
    const root = container.querySelector("[data-splitflap]")!;
    // One merged outline — the chrome is a root attribute, the text
    // inside stays plain (no per-char boxes to misalign).
    expect(root.hasAttribute("data-splitflap-cards")).toBe(true);
    expect(root.querySelector("[data-splitflap-cell]")).toBeTruthy();
    await new Promise((r) => setTimeout(r, 400));
    // After the pass the text is restored inside the same outline.
    expect(root.textContent).toBe("ON TIME");
    expect(root.querySelector("[data-splitflap-cell]")).toBeNull();
    expect(root.hasAttribute("data-splitflap-cards")).toBe(true);
  });

  it("re-flips only when children change", async () => {
    const { container, rerender } = render(
      <SplitFlap trigger="mount" interval={1}>
        GATE A1
      </SplitFlap>,
    );
    await new Promise((r) => setTimeout(r, 300));
    rerender(
      <SplitFlap trigger="mount" interval={1}>
        GATE B2
      </SplitFlap>,
    );
    const root = container.querySelector("[data-splitflap]")!;
    // The changed text was wrapped into cells again — the drum
    // flips A1 → B2 from the previous glyphs.
    expect(root.querySelector("[data-splitflap-cell]")).toBeTruthy();
  });
});
