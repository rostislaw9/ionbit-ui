import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Alert, AlertDescription, AlertTitle } from "./index";

describe("Alert", () => {
  it("renders children", () => {
    render(<Alert>Message</Alert>);
    expect(screen.getByText("Message")).toBeInTheDocument();
  });

  it("applies default variant classes", () => {
    const { container } = render(<Alert>Test</Alert>);
    const alert = container.firstChild as HTMLElement;
    expect(alert.className).toContain("bg-surface");
  });

  it("applies error variant classes", () => {
    const { container } = render(<Alert variant="error">Test</Alert>);
    const alert = container.firstChild as HTMLElement;
    expect(alert.className).toContain("bg-error");
  });

  it("applies info variant classes", () => {
    const { container } = render(<Alert variant="info">Test</Alert>);
    const alert = container.firstChild as HTMLElement;
    expect(alert.className).toContain("bg-info");
    expect(alert.className).toContain("text-info");
  });

  it("applies info-soft variant classes", () => {
    const { container } = render(<Alert variant="info-soft">Test</Alert>);
    const alert = container.firstChild as HTMLElement;
    expect(alert.className).toContain("bg-surface");
    expect(alert.className).toContain("text-info");
  });

  it("applies soft variant classes", () => {
    const { container } = render(<Alert variant="success-soft">Test</Alert>);
    const alert = container.firstChild as HTMLElement;
    expect(alert.className).toContain("bg-surface");
    expect(alert.className).toContain("text-success");
  });

  it("sets role=alert for error variant", () => {
    render(<Alert variant="error">Danger</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("sets role=alert for warning variant", () => {
    render(<Alert variant="warning">Caution</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("sets role=status for default variant", () => {
    render(<Alert>Info</Alert>);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("allows overriding role", () => {
    render(<Alert role="alert">Custom</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders AlertTitle and AlertDescription", () => {
    render(
      <Alert>
        <AlertTitle>Title</AlertTitle>
        <AlertDescription>Description</AlertDescription>
      </Alert>,
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });
});
