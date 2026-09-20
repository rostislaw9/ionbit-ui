import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ModeSwitcher } from "./mode-switcher";

describe("ModeSwitcher", () => {
  it("labels the button with the next action", () => {
    render(<ModeSwitcher mode="dark" onModeChange={() => {}} />);
    expect(
      screen.getByRole("button", { name: "Turn on the light" }),
    ).toBeInTheDocument();
  });

  it("calls onModeChange with the opposite mode on click", () => {
    const onModeChange = vi.fn();
    render(<ModeSwitcher mode="dark" onModeChange={onModeChange} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onModeChange).toHaveBeenCalledWith("light");
  });

  it("passes button variant and size through to the Button", () => {
    render(
      <ModeSwitcher
        mode="light"
        onModeChange={() => {}}
        variant="outline"
        size="icon-lg"
      />,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-variant", "outline");
    expect(button).toHaveAttribute("data-size", "icon-lg");
  });

  it("defaults to ghost icon", () => {
    render(<ModeSwitcher mode="dark" onModeChange={() => {}} />);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-variant", "ghost");
    expect(button).toHaveAttribute("data-size", "icon");
  });
});
