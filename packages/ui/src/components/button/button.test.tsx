import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Button } from "./button";

describe("Button", () => {
  it("renders with the default variant and size classes", () => {
    render(<Button>Confirm</Button>);
    const btn = screen.getByRole("button", { name: "Confirm" });
    expect(btn).toBeInTheDocument();
    expect(btn.className).toContain("bg-accent");
    expect(btn.className).toContain("px-2.5");
  });

  it("applies the destructive variant classes", () => {
    render(<Button variant="destructive">Delete</Button>);
    const btn = screen.getByRole("button", { name: "Delete" });
    expect(btn.className).toContain("bg-error");
  });

  it("forwards a custom className that overrides conflicting defaults", () => {
    render(<Button className="px-10">Custom</Button>);
    const btn = screen.getByRole("button", { name: "Custom" });
    expect(btn.className).toContain("px-10");
    expect(btn.className).not.toContain("px-3");
  });

  it("is keyboard-focusable and fires onClick on Enter", async () => {
    const user = userEvent.setup();
    let clicked = 0;
    render(<Button onClick={() => (clicked += 1)}>Go</Button>);
    const btn = screen.getByRole("button", { name: "Go" });
    btn.focus();
    expect(document.activeElement).toBe(btn);
    await user.keyboard("{Enter}");
    expect(clicked).toBe(1);
  });

  it("does not fire onClick when disabled", async () => {
    const user = userEvent.setup();
    let clicked = 0;
    render(
      <Button disabled onClick={() => (clicked += 1)}>
        Disabled
      </Button>,
    );
    const btn = screen.getByRole("button", { name: "Disabled" });
    expect(btn).toBeDisabled();
    await user.click(btn);
    expect(clicked).toBe(0);
  });

  it("defaults to type='button' to avoid accidental form submits", () => {
    render(<Button>Safe</Button>);
    expect(screen.getByRole("button", { name: "Safe" })).toHaveAttribute(
      "type",
      "button",
    );
  });

  it("renders as the child element when asChild is set", () => {
    render(
      <Button asChild>
        <a href="/x">Link button</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Link button" });
    expect(link).toBeInTheDocument();
    expect(link.className).toContain("bg-accent");
    expect(link).not.toHaveAttribute("type");
  });

  it("renders data-slot, data-variant, and data-size attributes", () => {
    render(
      <Button variant="outline" size="lg">
        Data
      </Button>,
    );
    const btn = screen.getByRole("button", { name: "Data" });
    expect(btn).toHaveAttribute("data-slot", "button");
    expect(btn).toHaveAttribute("data-variant", "outline");
    expect(btn).toHaveAttribute("data-size", "lg");
  });
});
