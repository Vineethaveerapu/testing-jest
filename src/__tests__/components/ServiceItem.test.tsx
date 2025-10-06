import { render, screen, fireEvent } from '@testing-library/react';
import ServiceItem from '@/components/ServiceItem';
import '@testing-library/jest-dom';

describe('ServiceItem Component', () => {
  const mockHandleClickService = jest.fn();
  const mockService = {
    id: 1,
    title: 'Test Service',
    description: 'Test description for the service',
  };

  beforeEach(() => {
    mockHandleClickService.mockClear();
  });

  // Test 1: Check if service item renders
  it('renders the service item', () => {
    render(
      <ServiceItem
        {...mockService}
        isSelectedList={false}
        handleClickService={mockHandleClickService}
      />
    );

    const serviceTitle = screen.getByText('Test Service');
    expect(serviceTitle).toBeInTheDocument();
  });

  // Test 2: Check service title using getByRole
  it('renders service title as heading', () => {
    render(
      <ServiceItem
        {...mockService}
        isSelectedList={false}
        handleClickService={mockHandleClickService}
      />
    );

    const title = screen.getByRole('heading', { level: 4 });
    expect(title).toHaveTextContent('Test Service');
  });

  // Test 3: Check service description
  it('renders service description', () => {
    render(
      <ServiceItem
        {...mockService}
        isSelectedList={false}
        handleClickService={mockHandleClickService}
      />
    );

    const description = screen.getByText('Test description for the service');
    expect(description).toBeInTheDocument();
  });

  // Test 4: Check Select button using getByRole
  it('shows Select button when not in selected list', () => {
    render(
      <ServiceItem
        {...mockService}
        isSelectedList={false}
        handleClickService={mockHandleClickService}
      />
    );

    const selectButton = screen.getByRole('button', { name: 'Select' });
    expect(selectButton).toBeInTheDocument();
    expect(selectButton).toHaveClass('bg-green-100', 'text-green-700');
  });

  // Test 5: Check Remove button using getByRole
  it('shows Remove button when in selected list', () => {
    render(
      <ServiceItem
        {...mockService}
        isSelectedList={true}
        handleClickService={mockHandleClickService}
      />
    );

    const removeButton = screen.getByRole('button', { name: 'Remove' });
    expect(removeButton).toBeInTheDocument();
    expect(removeButton).toHaveClass('bg-red-100', 'text-red-700');
  });

  // Test 6: Test click event on Select button
  it('calls handleClickService when Select button is clicked', () => {
    render(
      <ServiceItem
        {...mockService}
        isSelectedList={false}
        handleClickService={mockHandleClickService}
      />
    );

    const selectButton = screen.getByRole('button', { name: 'Select' });
    fireEvent.click(selectButton);

    expect(mockHandleClickService).toHaveBeenCalledTimes(1);
    expect(mockHandleClickService).toHaveBeenCalledWith(mockService);
  });

  // Test 7: Test click event on Remove button
  it('calls handleClickService when Remove button is clicked', () => {
    render(
      <ServiceItem
        {...mockService}
        isSelectedList={true}
        handleClickService={mockHandleClickService}
      />
    );

    const removeButton = screen.getByRole('button', { name: 'Remove' });
    fireEvent.click(removeButton);

    expect(mockHandleClickService).toHaveBeenCalledTimes(1);
    expect(mockHandleClickService).toHaveBeenCalledWith(mockService);
  });

  // Test 8: Test multiple clicks on Select button
  it('calls handleClickService multiple times when Select button is clicked multiple times', () => {
    render(
      <ServiceItem
        {...mockService}
        isSelectedList={false}
        handleClickService={mockHandleClickService}
      />
    );

    const selectButton = screen.getByRole('button', { name: 'Select' });
    fireEvent.click(selectButton);
    fireEvent.click(selectButton);

    expect(mockHandleClickService).toHaveBeenCalledTimes(2);
  });

  // Test 9: Test different service data
  it('renders different service data correctly', () => {
    const differentService = {
      id: 2,
      title: 'Another Service',
      description: 'Different description',
    };

    render(
      <ServiceItem
        {...differentService}
        isSelectedList={false}
        handleClickService={mockHandleClickService}
      />
    );

    expect(screen.getByText('Another Service')).toBeInTheDocument();
    expect(screen.getByText('Different description')).toBeInTheDocument();
  });

  // Test 10: Test button text changes based on isSelectedList prop
  it('changes button text based on isSelectedList prop', () => {
    const { rerender } = render(
      <ServiceItem
        {...mockService}
        isSelectedList={false}
        handleClickService={mockHandleClickService}
      />
    );

    expect(screen.getByRole('button')).toHaveTextContent('Select');

    rerender(
      <ServiceItem
        {...mockService}
        isSelectedList={true}
        handleClickService={mockHandleClickService}
      />
    );

    expect(screen.getByRole('button')).toHaveTextContent('Remove');
  });
});
