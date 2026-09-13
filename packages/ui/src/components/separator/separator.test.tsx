import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Separator } from "./index";

describe("Separator", () => {
  it("renders a horizontal separator by default", () => {
    const { container } = render(<Separator />);
    const sep = container.firstChild as HTMLElement;
    expect(sep).toBeTruthy();
    expect(sep.className).toContain("h-px");
    expect(sep.className).toContain("w-full");
  });

  it("renders a vertical separator", () => {
    const { container } = render(<Separator orientation="vertical" />);
    const sep = container.firstChild as HTMLElement;
    expect(sep.className).toContain("self-stretch");
    expect(sep.className).toContain("w-px");
  });

  it("sets role=separator with aria-orientation", () => {
    render(<Separator orientation="vertical" />);
    const sep = screen.getByRole("separator");
    expect(sep).toHaveAttribute("aria-orientation", "vertical");
  });

  it("applies bg-border class", () => {
    const { container } = render(<Separator />);
    const sep = container.firstChild as HTMLElement;
    expect(sep.className).toContain("bg-border");
  });

  it("accepts className override", () => {
    const { container } = render(<Separator className="my-4" />);
    const sep = container.firstChild as HTMLElement;
    expect(sep.className).toContain("my-4");
  });
});
