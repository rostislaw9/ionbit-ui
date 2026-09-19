import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Scramble } from "./scramble";

describe("Scramble", () => {
  it("renders the final text", () => {
    render(<Scramble>ACCESS GRANTED</Scramble>);
    expect(screen.getAllByText("ACCESS GRANTED").length).toBeGreaterThan(0);
  });

  it("exposes the real text to assistive technology while decoding", () => {
    const { container } = render(<Scramble>v2.4.1</Scramble>);
    // During the decode the root is aria-hidden and a visually-hidden
    // sibling holds the real text.
    const root = container.querySelector("[data-scramble]");
    expect(root?.getAttribute("aria-hidden")).toBe("true");
    const srOnly = container.querySelector("[data-scramble] + span");
    expect(srOnly?.textContent).toBe("v2.4.1");
  });

  it("renders the final text immediately when disabled", () => {
    const { container } = render(<Scramble disabled>DEPLOY COMPLETE</Scramble>);
    const root = container.querySelector("[data-scramble]");
    expect(root?.textContent).toBe("DEPLOY COMPLETE");
    expect(root?.hasAttribute("aria-hidden")).toBe(false);
  });

  it("settles instantly at intensity 0", () => {
    const { container } = render(
      <Scramble intensity={0} trigger="hover">
        SYNCED
      </Scramble>,
    );
    const root = container.querySelector("[data-scramble]")!;
    fireEvent.pointerEnter(root);
    expect(root.textContent).toBe("SYNCED");
  });

  it("renders as a different element", () => {
    const { container } = render(<Scramble as="p">STATUS</Scramble>);
    const root = container.querySelector("p[data-scramble]");
    expect(root).toBeTruthy();
    const srOnly = container.querySelector("p[data-scramble] + span");
    expect(srOnly?.textContent).toBe("STATUS");
  });

  it("keeps nested markup intact", () => {
    const { container } = render(
      <Scramble as="div" disabled>
        <button type="button">DEPLOY</button>
        <span className="meta">v3 running</span>
      </Scramble>,
    );
    const root = container.querySelector("[data-scramble]")!;
    expect(root.querySelector("button")?.textContent).toBe("DEPLOY");
    expect(root.querySelector(".meta")?.textContent).toBe("v3 running");
  });

  it("collects every descendant text node for the decode", () => {
    const { container } = render(
      <Scramble as="div">
        <button type="button">DEPLOY</button>
        <span>READY</span>
      </Scramble>,
    );
    // Decode starts on the IO fallback — all text joins the
    // screen-reader copy, structure stays in place.
    const root = container.querySelector("[data-scramble]")!;
    const srOnly = container.querySelector("[data-scramble] + span");
    expect(srOnly?.textContent).toBe("DEPLOYREADY");
    expect(root.querySelector("button")).toBeTruthy();
  });

  it("keeps the exact layout with a hidden clone plus glyph layer", () => {
    const { container } = render(
      <Scramble as="div">
        <button type="button">DEPLOY NOW</button>
      </Scramble>,
    );
    const button = container.querySelector("button")!;
    // The original text node stays a direct child (React owns it) —
    // emptied while the pass runs.
    expect(button.firstChild?.nodeType).toBe(Node.TEXT_NODE);
    expect(button.firstChild?.textContent).toBe("");
    // Holder: hidden clone of the original text (identical box +
    // wrap points) plus an absolutely positioned, clipped glyph layer.
    const holder = button.querySelector(":scope > span")! as HTMLElement;
    // Sole child of a non-inline parent: the holder is a full-width
    // atomic box so the absolute layer gets a proper rectangular
    // containing block (inline holders fragment across wrapped lines).
    expect(holder.style.display).toBe("inline-block");
    expect(holder.style.width).toBe("100%");
    const sizer = holder.firstElementChild as HTMLElement;
    expect(sizer.style.visibility).toBe("hidden");
    expect(sizer.textContent).toBe("DEPLOY NOW");
    const layer = holder.lastElementChild as HTMLElement;
    expect(layer.style.position).toBe("absolute");
    expect(layer.style.overflow).toBe("hidden");
  });

  it("keeps a contiguous text run as a single decode box", () => {
    const { container } = render(
      <Scramble as="div">
        <span className="badge">{60}%</span>
      </Scramble>,
    );
    const badge = container.querySelector(".badge")!;
    // React renders {x}% as two text nodes — one contiguous run, i.e.
    // one anonymous flex item inside a flex parent. It must decode as
    // ONE holder: separate holders become separate flex items and pick
    // up the parent's `gap` ("60 %" instead of "60%").
    expect(badge.querySelectorAll(":scope > span").length).toBe(1);
    const sizer = badge.querySelector(":scope > span > span")!;
    expect(sizer.textContent).toBe("60%");
  });

  it("does not wrap whitespace-only text runs", () => {
    const { container } = render(
      <Scramble as="div">
        <div>
          {"a"}
          <span>x</span> <span>y</span>
        </div>
      </Scramble>,
    );
    const div = container.querySelector("[data-scramble] > div")!;
    // The " " between the two spans is a whitespace-only run — it
    // renders nothing in a flex row, so wrapping it would turn an
    // invisible text run into a real ~1ch-wide flex item.
    const ws = [...div.childNodes].find(
      (n) => n.nodeType === Node.TEXT_NODE && n.textContent === " ",
    );
    expect(ws).toBeTruthy();
    // No holder inserted — the whitespace node stays a plain text node.
    expect(ws?.nextSibling?.nodeType).toBe(Node.ELEMENT_NODE);
    expect((ws?.nextSibling as HTMLElement).tagName).toBe("SPAN");
  });

  it("does not alter the DOM when disabled", () => {
    const { container } = render(
      <Scramble as="div" disabled>
        <button type="button">DEPLOY</button>
      </Scramble>,
    );
    const button = container.querySelector("button")!;
    expect(button.firstChild?.textContent).toBe("DEPLOY");
    expect(button.querySelector("span")).toBeNull();
  });

  it("decodes on focusin and never aria-hides the focused element", () => {
    const { container } = render(
      <Scramble as="div" trigger="focus">
        <button type="button">DEPLOY</button>
      </Scramble>,
    );
    const root = container.querySelector("[data-scramble]")!;
    const button = root.querySelector("button")!;
    button.focus();
    // Decode started — per-char spans built inside the button.
    expect(button.querySelector("span")).toBeTruthy();
    // Focus is inside — no aria-hidden, no sr-only copy.
    expect(root.hasAttribute("aria-hidden")).toBe(false);
    expect(container.querySelector("[data-scramble] + span")).toBeNull();
  });

  it("shows updated text when children change while disabled", () => {
    const { container, rerender } = render(<Scramble disabled>IDLE</Scramble>);
    rerender(<Scramble disabled>RUNNING</Scramble>);
    const root = container.querySelector("[data-scramble]");
    expect(root?.textContent).toBe("RUNNING");
  });

  it("forwards HTML attributes", () => {
    const { container } = render(
      <Scramble className="mono" data-testid="sc">
        OK
      </Scramble>,
    );
    const el = container.querySelector('[data-testid="sc"]');
    expect(el?.className).toContain("mono");
  });
});
