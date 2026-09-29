import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Caret } from "./caret";

describe("Caret", () => {
  it("renders the default block glyph", () => {
    const { container } = render(<Caret />);
    const el = container.querySelector("[data-caret]")!;
    expect(el.textContent).toBe("▌");
    expect(el.getAttribute("aria-hidden")).toBe("true");
  });

  it("renders a custom glyph", () => {
    const { container } = render(<Caret>_</Caret>);
    expect(container.querySelector("[data-caret]")!.textContent).toBe("_");
  });

  it("blinks by default", () => {
    const { container } = render(<Caret />);
    const el = container.querySelector("[data-caret]") as HTMLElement;
    expect(el.style.animation).toContain("ionbit-ui-caret-blink");
    expect(el.style.animation).toContain("1100ms");
  });

  it("honors a custom blink interval", () => {
    const { container } = render(<Caret interval={400} />);
    const el = container.querySelector("[data-caret]") as HTMLElement;
    expect(el.style.animation).toContain("400ms");
  });

  it("renders static when blink is false", () => {
    const { container } = render(<Caret blink={false} />);
    const el = container.querySelector("[data-caret]") as HTMLElement;
    expect(el.style.animation).toBe("");
  });
});
