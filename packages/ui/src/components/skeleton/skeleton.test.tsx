import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  it("renders with default classes", () => {
    const { container } = render(<Skeleton />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass("animate-pulse");
    expect(el).toHaveClass("rounded-md");
    expect(el).toHaveClass("bg-foreground/10");
  });

  it("accepts custom className", () => {
    const { container } = render(<Skeleton className="h-4 w-full" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass("h-4");
    expect(el).toHaveClass("w-full");
  });

  it("renders children", () => {
    render(<Skeleton data-testid="skel">content</Skeleton>);
    expect(screen.getByTestId("skel")).toHaveTextContent("content");
  });

  it("forwards the ref", () => {
    let ref: HTMLDivElement | null = null;
    render(
      <Skeleton
        ref={(node) => {
          ref = node;
        }}
      />,
    );
    expect(ref).toBeInstanceOf(HTMLDivElement);
  });
});
