import { render, screen, fireEvent } from '@testing-library/react';
import ServiceList from '@/components/ServiceList';
import '@testing-library/jest-dom';

describe('ServiceList Component', () => {
  const mockServices = [
    { id: 1, title: 'Service 1', description: 'Description 1' },
    { id: 2, title: 'Service 2', description: 'Description 2' },
    { id: 3, title: 'Service 3', description: 'Description 3' },
  ];

  const mockAddSelectedService = jest.fn();
  const mockRemoveSelectedService = jest.fn();

  beforeEach(() => {
    mockAddSelectedService.mockClear();
    mockRemoveSelectedService.mockClear();
  });

  // Test 1: Check if service list renders
  it('renders the service list container', () => {
    render(
      <ServiceList
        items={mockServices}
        addSelectedService={mockAddSelectedService}
        removeSelectedService={mockRemoveSelectedService}
        isSelectedList={false}
      />
    );

    expect(screen.getByText('Service 1')).toBeInTheDocument();
  });

  // Test 2: Check all service items using getAllByRole
  it('renders all service items', () => {
    render(
      <ServiceList
        items={mockServices}
        addSelectedService={mockAddSelectedService}
        removeSelectedService={mockRemoveSelectedService}
        isSelectedList={false}
      />
    );

    const serviceHeadings = screen.getAllByRole('heading', { level: 4 });
    expect(serviceHeadings).toHaveLength(3);
    expect(serviceHeadings[0]).toHaveTextContent('Service 1');
    expect(serviceHeadings[1]).toHaveTextContent('Service 2');
    expect(serviceHeadings[2]).toHaveTextContent('Service 3');
  });

  // Test 3: Check all Select buttons using getAllByRole
  it('renders all Select buttons when not in selected list', () => {
    render(
      <ServiceList
        items={mockServices}
        addSelectedService={mockAddSelectedService}
        removeSelectedService={mockRemoveSelectedService}
        isSelectedList={false}
      />
    );

    const selectButtons = screen.getAllByRole('button', { name: 'Select' });
    expect(selectButtons).toHaveLength(3);
  });

  // Test 4: Check all Remove buttons using getAllByRole
  it('renders all Remove buttons when in selected list', () => {
    render(
      <ServiceList
        items={mockServices}
        addSelectedService={mockAddSelectedService}
        removeSelectedService={mockRemoveSelectedService}
        isSelectedList={true}
      />
    );

    const removeButtons = screen.getAllByRole('button', { name: 'Remove' });
    expect(removeButtons).toHaveLength(3);
  });

  // Test 5: Test click event on first Select button
  it('calls addSelectedService when first Select button is clicked', () => {
    render(
      <ServiceList
        items={mockServices}
        addSelectedService={mockAddSelectedService}
        removeSelectedService={mockRemoveSelectedService}
        isSelectedList={false}
      />
    );

    const selectButtons = screen.getAllByRole('button', { name: 'Select' });
    fireEvent.click(selectButtons[0]);

    expect(mockAddSelectedService).toHaveBeenCalledTimes(1);
    expect(mockAddSelectedService).toHaveBeenCalledWith(mockServices[0]);
  });

  // Test 6: Test click event on second Select button
  it('calls addSelectedService when second Select button is clicked', () => {
    render(
      <ServiceList
        items={mockServices}
        addSelectedService={mockAddSelectedService}
        removeSelectedService={mockRemoveSelectedService}
        isSelectedList={false}
      />
    );

    const selectButtons = screen.getAllByRole('button', { name: 'Select' });
    fireEvent.click(selectButtons[1]);

    expect(mockAddSelectedService).toHaveBeenCalledTimes(1);
    expect(mockAddSelectedService).toHaveBeenCalledWith(mockServices[1]);
  });

  // Test 7: Test click event on Remove button
  it('calls removeSelectedService when Remove button is clicked', () => {
    render(
      <ServiceList
        items={mockServices}
        addSelectedService={mockAddSelectedService}
        removeSelectedService={mockRemoveSelectedService}
        isSelectedList={true}
      />
    );

    const removeButtons = screen.getAllByRole('button', { name: 'Remove' });
    fireEvent.click(removeButtons[0]);

    expect(mockRemoveSelectedService).toHaveBeenCalledTimes(1);
    expect(mockRemoveSelectedService).toHaveBeenCalledWith(mockServices[0]);
  });

  // Test 8: Test multiple clicks on Select button
  it('calls addSelectedService multiple times when Select button is clicked multiple times', () => {
    render(
      <ServiceList
        items={mockServices}
        addSelectedService={mockAddSelectedService}
        removeSelectedService={mockRemoveSelectedService}
        isSelectedList={false}
      />
    );

    const selectButtons = screen.getAllByRole('button', { name: 'Select' });
    fireEvent.click(selectButtons[0]);
    fireEvent.click(selectButtons[0]);

    expect(mockAddSelectedService).toHaveBeenCalledTimes(2);
  });

  // Test 9: Test empty list using queryByRole
  it('renders empty list when no services provided', () => {
    render(
      <ServiceList
        items={[]}
        addSelectedService={mockAddSelectedService}
        removeSelectedService={mockRemoveSelectedService}
        isSelectedList={false}
      />
    );

    const buttons = screen.queryByRole('button');
    expect(buttons).not.toBeInTheDocument();
  });

  // Test 10: Test custom className prop
  it('applies custom className when provided', () => {
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
    expect(listContainer).toHaveClass('custom-list-class');
  });
});
