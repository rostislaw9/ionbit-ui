import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Counter } from "./counter";

describe("Counter", () => {
  it("renders the wrapper with its marker", () => {
    const { container } = render(<Counter value={42} />);
    expect(container.querySelector("[data-counter]")).toBeTruthy();
  });

  it("renders the final value when disabled", () => {
    const { container } = render(<Counter disabled value={1248} />);
    expect(container.querySelector("[data-counter]")?.textContent).toBe(
      "1,248",
    );
  });

  it("honours decimals", () => {
    const { container } = render(
      <Counter disabled value={99.5} decimals={1} />,
    );
    expect(container.querySelector("[data-counter]")?.textContent).toBe("99.5");
  });

  it("uses a custom format when provided", () => {
    const { container } = render(
      <Counter
        disabled
        value={0.983}
        format={(v) => `${(v * 100).toFixed(0)}%`}
      />,
    );
    expect(container.querySelector("[data-counter]")?.textContent).toBe("98%");
  });

  it("starts from `from` before the first play", () => {
    const { container } = render(<Counter value={100} from={25} />);
    expect(container.querySelector("[data-counter]")?.textContent).toBe("25");
  });

  it("exposes the final value to assistive technology while counting", () => {
    const { container } = render(<Counter trigger="hover" value={77} />);
    const root = container.querySelector("[data-counter]")!;
    fireEvent.pointerEnter(root);
    expect(root.getAttribute("aria-hidden")).toBe("true");
    const srOnly = container.querySelector("[data-counter] + span");
    expect(srOnly?.textContent).toBe("77");
  });

  it("renders as a different element", () => {
    const { container } = render(<Counter as="div" value={3} />);
    expect(container.querySelector("div[data-counter]")).toBeTruthy();
  });
});
