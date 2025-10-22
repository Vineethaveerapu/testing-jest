import { render, screen } from "@testing-library/react";
import TextCard from "@/components/TextCard";
import "@testing-library/jest-dom";

describe("TextCard Component", () => {
  it("renders TextCard with title", () => {
    render(<TextCard title="Test Title" />);
    const title = screen.getByRole("heading", { level: 4 });
    expect(title).toHaveTextContent("Test Title");
  });

  it("renders title as heading element", () => {
    render(<TextCard title="Another Title" />);
    const title = screen.getByRole("heading", { level: 4 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Another Title");
  });

  it("does not render children when not provided", () => {
    render(<TextCard title="Test Title" />);
    const title = screen.getByRole("heading", { level: 4 });
    expect(title).toBeInTheDocument();
    const contentDiv = screen.queryByText("Test content");
    expect(contentDiv).not.toBeInTheDocument();
  });

  it("applies custom className when provided", () => {
    render(<TextCard className="custom-class" title="Test" />);
    const title = screen.getByRole("heading", { level: 4 });
    const cardContainer = title.closest("div");
    expect(cardContainer).toHaveClass("custom-class");
  });

  it("works without className prop", () => {
    render(<TextCard title="Test" />);
    const title = screen.getByRole("heading", { level: 4 });
    expect(title).toBeInTheDocument();
  });

  it("renders multiple children content", () => {
    render(
      <TextCard title="Test Title">
        <div>First child</div>
        <div>Second child</div>
      </TextCard>
    );
    expect(screen.getByText("First child")).toBeInTheDocument();
    expect(screen.getByText("Second child")).toBeInTheDocument();
  });
});
