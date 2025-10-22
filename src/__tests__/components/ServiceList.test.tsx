import { render, screen, fireEvent } from "@testing-library/react";
import ServiceList from "@/components/ServiceList";
import "@testing-library/jest-dom";

describe("ServiceList Component", () => {
  const mockServices = [
    { id: 1, title: "Service 1", description: "Description 1" },
    { id: 2, title: "Service 2", description: "Description 2" },
    { id: 3, title: "Service 3", description: "Description 3" }
  ];

  const mockAddSelectedService = jest.fn();
  const mockRemoveSelectedService = jest.fn();

  beforeEach(() => {
    mockAddSelectedService.mockClear();
    mockRemoveSelectedService.mockClear();
  });

  it("renders the service list container", () => {
    render(
      <ServiceList
        items={mockServices}
        addSelectedService={mockAddSelectedService}
        removeSelectedService={mockRemoveSelectedService}
        isSelectedList={false}
      />
    );

    expect(screen.getByText("Service 1")).toBeInTheDocument();
  });

  it("renders all service items", () => {
    render(
      <ServiceList
        items={mockServices}
        addSelectedService={mockAddSelectedService}
        removeSelectedService={mockRemoveSelectedService}
        isSelectedList={false}
      />
    );

    const serviceHeadings = screen.getAllByRole("heading", { level: 4 });
    expect(serviceHeadings).toHaveLength(3);
    expect(serviceHeadings[0]).toHaveTextContent("Service 1");
    expect(serviceHeadings[1]).toHaveTextContent("Service 2");
    expect(serviceHeadings[2]).toHaveTextContent("Service 3");
  });

  it("renders all Select buttons when not in selected list", () => {
    render(
      <ServiceList
        items={mockServices}
        addSelectedService={mockAddSelectedService}
        removeSelectedService={mockRemoveSelectedService}
        isSelectedList={false}
      />
    );

    const selectButtons = screen.getAllByRole("button", { name: "Select" });
    expect(selectButtons).toHaveLength(3);
  });

  it("renders all Remove buttons when in selected list", () => {
    render(
      <ServiceList
        items={mockServices}
        addSelectedService={mockAddSelectedService}
        removeSelectedService={mockRemoveSelectedService}
        isSelectedList={true}
      />
    );

    const removeButtons = screen.getAllByRole("button", { name: "Remove" });
    expect(removeButtons).toHaveLength(3);
  });

  it("calls addSelectedService when first Select button is clicked", () => {
    render(
      <ServiceList
        items={mockServices}
        addSelectedService={mockAddSelectedService}
        removeSelectedService={mockRemoveSelectedService}
        isSelectedList={false}
      />
    );

    const selectButtons = screen.getAllByRole("button", { name: "Select" });
    fireEvent.click(selectButtons[0]);

    expect(mockAddSelectedService).toHaveBeenCalledTimes(1);
    expect(mockAddSelectedService).toHaveBeenCalledWith(mockServices[0]);
  });

  it("calls addSelectedService when second Select button is clicked", () => {
    render(
      <ServiceList
        items={mockServices}
        addSelectedService={mockAddSelectedService}
        removeSelectedService={mockRemoveSelectedService}
        isSelectedList={false}
      />
    );

    const selectButtons = screen.getAllByRole("button", { name: "Select" });
    fireEvent.click(selectButtons[1]);

    expect(mockAddSelectedService).toHaveBeenCalledTimes(1);
    expect(mockAddSelectedService).toHaveBeenCalledWith(mockServices[1]);
  });

  it("calls removeSelectedService when Remove button is clicked", () => {
    render(
      <ServiceList
        items={mockServices}
        addSelectedService={mockAddSelectedService}
        removeSelectedService={mockRemoveSelectedService}
        isSelectedList={true}
      />
    );

    const removeButtons = screen.getAllByRole("button", { name: "Remove" });
    fireEvent.click(removeButtons[0]);

    expect(mockRemoveSelectedService).toHaveBeenCalledTimes(1);
    expect(mockRemoveSelectedService).toHaveBeenCalledWith(mockServices[0]);
  });

  it("calls addSelectedService multiple times when Select button is clicked multiple times", () => {
    render(
      <ServiceList
        items={mockServices}
        addSelectedService={mockAddSelectedService}
        removeSelectedService={mockRemoveSelectedService}
        isSelectedList={false}
      />
    );

    const selectButtons = screen.getAllByRole("button", { name: "Select" });
    fireEvent.click(selectButtons[0]);
    fireEvent.click(selectButtons[0]);

    expect(mockAddSelectedService).toHaveBeenCalledTimes(2);
  });

  it("renders empty list when no services provided", () => {
    render(
      <ServiceList
        items={[]}
        addSelectedService={mockAddSelectedService}
        removeSelectedService={mockRemoveSelectedService}
        isSelectedList={false}
      />
    );

    const buttons = screen.queryByRole("button");
    expect(buttons).not.toBeInTheDocument();
  });

  it("applies custom className when provided", () => {
    const { container } = render(
      <ServiceList
        items={mockServices}
        addSelectedService={mockAddSelectedService}
        removeSelectedService={mockRemoveSelectedService}
        isSelectedList={false}
        className="custom-list-class"
      />
    );

    const listContainer = container.firstChild as HTMLElement;
    expect(listContainer).toHaveClass("custom-list-class");
  });
});
