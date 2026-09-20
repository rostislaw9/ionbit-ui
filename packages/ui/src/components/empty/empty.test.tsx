import { render, screen } from "@testing-library/react";
import { Folder } from "lucide-react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyFooter,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./index";

describe("Empty", () => {
  it("renders children", () => {
    render(<Empty data-testid="empty">Content</Empty>);
    expect(screen.getByTestId("empty")).toHaveTextContent("Content");
  });

  it("does not force a border — styling is left to the consumer", () => {
    const { container } = render(<Empty />);
    const el = container.firstChild as HTMLElement;
    expect(el).not.toHaveClass("border");
    expect(el).not.toHaveClass("border-dashed");
  });

  it("sets data-slot", () => {
    const { container } = render(<Empty />);
    expect(container.firstChild).toHaveAttribute("data-slot", "empty");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Empty ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe("EmptyHeader", () => {
  it("renders children", () => {
    render(<EmptyHeader data-testid="header">Header</EmptyHeader>);
    expect(screen.getByTestId("header")).toHaveTextContent("Header");
  });

  it("sets data-slot", () => {
    const { container } = render(<EmptyHeader />);
    expect(container.firstChild).toHaveAttribute("data-slot", "empty-header");
  });
});

describe("EmptyMedia", () => {
  it("renders default variant by default", () => {
    const { container } = render(
      <EmptyMedia>
        <Folder />
      </EmptyMedia>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveAttribute("data-variant", "default");
    expect(el).toHaveClass("bg-transparent");
  });

  it("renders icon variant with icon styling", () => {
    const { container } = render(
      <EmptyMedia variant="icon">
        <Folder />
      </EmptyMedia>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveAttribute("data-variant", "icon");
    expect(el).toHaveClass("rounded-lg");
    expect(el).toHaveClass("bg-surface-elevated");
  });

  it("sets data-slot", () => {
    const { container } = render(<EmptyMedia />);
    expect(container.firstChild).toHaveAttribute("data-slot", "empty-media");
  });
});

describe("EmptyTitle", () => {
  it("renders as h3", () => {
    render(<EmptyTitle>No items</EmptyTitle>);
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveTextContent("No items");
  });

  it("applies font-medium class", () => {
    render(<EmptyTitle>Title</EmptyTitle>);
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveClass("font-medium");
  });

  it("sets data-slot", () => {
    render(<EmptyTitle>Title</EmptyTitle>);
    expect(screen.getByRole("heading")).toHaveAttribute(
      "data-slot",
      "empty-title",
    );
  });
});

describe("EmptyDescription", () => {
  it("renders as paragraph", () => {
    render(<EmptyDescription>Description text</EmptyDescription>);
    expect(screen.getByText("Description text").tagName).toBe("P");
  });

  it("applies muted text class", () => {
    render(<EmptyDescription>Text</EmptyDescription>);
    expect(screen.getByText("Text")).toHaveClass("text-foreground-muted");
  });
});

describe("EmptyContent", () => {
  it("renders children", () => {
    render(<EmptyContent data-testid="content">Action</EmptyContent>);
    expect(screen.getByTestId("content")).toHaveTextContent("Action");
  });

  it("sets data-slot", () => {
    const { container } = render(<EmptyContent />);
    expect(container.firstChild).toHaveAttribute("data-slot", "empty-content");
  });
});

describe("EmptyFooter", () => {
  it("renders children", () => {
    render(<EmptyFooter data-testid="footer">Footer</EmptyFooter>);
    expect(screen.getByTestId("footer")).toHaveTextContent("Footer");
  });

  it("sets data-slot", () => {
    const { container } = render(<EmptyFooter />);
    expect(container.firstChild).toHaveAttribute("data-slot", "empty-footer");
  });
});

describe("Empty composition", () => {
  it("renders a full empty state", () => {
    render(
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Folder />
          </EmptyMedia>
          <EmptyTitle>No projects yet</EmptyTitle>
          <EmptyDescription>Get started by creating one.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <button>Create Project</button>
        </EmptyContent>
        <EmptyFooter>
          <a href="/docs">Learn more</a>
        </EmptyFooter>
      </Empty>,
    );
    expect(screen.getByText("No projects yet")).toBeInTheDocument();
    expect(
      screen.getByText("Get started by creating one."),
    ).toBeInTheDocument();
    expect(screen.getByText("Create Project")).toBeInTheDocument();
    expect(screen.getByText("Learn more")).toBeInTheDocument();
  });
});
