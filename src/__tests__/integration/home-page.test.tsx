import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import HomePage from "@/app/page";

const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockPrefetch = jest.fn();

jest.mocked(useRouter).mockReturnValue({
  push: mockPush,
  replace: mockReplace,
  prefetch: mockPrefetch,
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn()
});

describe("Home Page Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("allows user to select a service and see state changes", () => {
    render(<HomePage />);

    expect(
      screen.getByText("Choose services from the left panel to get started")
    ).toBeInTheDocument();

    const availableServices = screen.getAllByRole("heading", { level: 4 });
    expect(availableServices).toHaveLength(3);
    expect(availableServices[0]).toHaveTextContent("Weeding");
    expect(availableServices[1]).toHaveTextContent("Watering");
    expect(availableServices[2]).toHaveTextContent("Pruning and Trimming");

    const selectButtons = screen.getAllByRole("button", { name: "Select" });
    expect(selectButtons).toHaveLength(3);

    fireEvent.click(selectButtons[0]);

    const selectedServices = screen.getAllByText("Weeding");
    expect(selectedServices).toHaveLength(2); // One in available, one in selected

    const removeButtons = screen.getAllByRole("button", { name: "Remove" });
    expect(removeButtons).toHaveLength(1);
  });

  it("allows user to remove services and see state changes", () => {
    render(<HomePage />);

    const selectButtons = screen.getAllByRole("button", { name: "Select" });
    fireEvent.click(selectButtons[0]); // Select Weeding
    fireEvent.click(selectButtons[1]); // Select Watering

    expect(screen.getAllByText("Weeding")).toHaveLength(2);
    expect(screen.getAllByText("Watering")).toHaveLength(2);

    const removeButtons = screen.getAllByRole("button", { name: "Remove" });
    fireEvent.click(removeButtons[0]); // Remove Weeding

    expect(screen.getAllByText("Weeding")).toHaveLength(1); // Only in available now
    expect(screen.getAllByText("Watering")).toHaveLength(2); // Still selected

    const remainingRemoveButtons = screen.getAllByRole("button", {
      name: "Remove"
    });
    expect(remainingRemoveButtons).toHaveLength(1);

    const selectButtonsAfterRemoval = screen.getAllByRole("button", {
      name: "Select"
    });
    expect(selectButtonsAfterRemoval).toHaveLength(3); // All services available again
  });

  it("allows user to remove a selected service", () => {
    render(<HomePage />);

    const selectButtons = screen.getAllByRole("button", { name: "Select" });
    fireEvent.click(selectButtons[0]); // Select Weeding

    expect(screen.getAllByText("Weeding")).toHaveLength(2);

    const removeButtons = screen.getAllByRole("button", { name: "Remove" });
    fireEvent.click(removeButtons[0]); // Remove Weeding

    expect(screen.getAllByText("Weeding")).toHaveLength(1); // Only in available now

    const noRemoveButtons = screen.queryByRole("button", { name: "Remove" });
    expect(noRemoveButtons).not.toBeInTheDocument();
  });
});
