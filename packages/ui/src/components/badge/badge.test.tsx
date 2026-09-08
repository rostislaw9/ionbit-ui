import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge } from "./index";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("applies default variant classes", () => {
    const { container } = render(<Badge>Default</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("bg-surface-hover");
  });

  it("applies outline variant classes", () => {
    const { container } = render(<Badge variant="outline">Outline</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("bg-transparent");
    expect(badge.className).toContain("border-border-strong");
  });

  it("applies ghost variant classes", () => {
    const { container } = render(<Badge variant="ghost">Ghost</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("hover:bg-surface-hover");
  });

  it("applies accent variant classes (muted bg with border)", () => {
    const { container } = render(<Badge variant="accent">Accent</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("bg-accent-muted");
    expect(badge.className).toContain("text-accent");
    expect(badge.className).toContain("border-border-accent");
  });

  it("applies soft accent variant classes (muted bg, no border)", () => {
    const { container } = render(
      <Badge variant="accent-soft">Accent Soft</Badge>,
    );
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("bg-accent-muted");
    expect(badge.className).toContain("border-transparent");
  });

  it("applies default success variant classes (muted bg with border)", () => {
    const { container } = render(<Badge variant="success">Success</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("bg-success-muted");
    expect(badge.className).toContain("border-border-success");
  });

  it("applies text-only error variant classes", () => {
    const { container } = render(<Badge variant="error-text">Error</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain("text-error");
    expect(badge.className).toContain("bg-transparent");
    expect(badge.className).toContain("border-transparent");
  });

  it("renders as child when asChild is set", () => {
    const { container } = render(
      <Badge asChild>
        <a href="#test">Link Badge</a>
      </Badge>,
    );
    const link = container.querySelector("a");
    expect(link).not.toBeNull();
    expect(link?.className).toContain("bg-surface-hover");
  });
});
