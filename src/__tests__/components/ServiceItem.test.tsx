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

  describe('Content Rendering', () => {
    it('renders service title and description', () => {
      render(
        <ServiceItem
          {...mockService}
          isSelectedList={false}
          handleClickService={mockHandleClickService}
        />
      );

      expect(screen.getByText('Test Service')).toBeInTheDocument();
      expect(
        screen.getByText('Test description for the service')
      ).toBeInTheDocument();
    });

    it('renders different service data', () => {
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
  });

  describe('Button States', () => {
    it('shows Select button when not in selected list', () => {
      render(
        <ServiceItem
          {...mockService}
          isSelectedList={false}
          handleClickService={mockHandleClickService}
        />
      );

      const button = screen.getByRole('button', { name: /select/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('bg-green-100', 'text-green-700');
    });

    it('shows Remove button when in selected list', () => {
      render(
        <ServiceItem
          {...mockService}
          isSelectedList={true}
          handleClickService={mockHandleClickService}
        />
      );

      const button = screen.getByRole('button', { name: /remove/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('bg-red-100', 'text-red-700');
    });
  });

  describe('User Interactions', () => {
    it('calls handleClickService when Select button is clicked', () => {
      render(
        <ServiceItem
          {...mockService}
          isSelectedList={false}
          handleClickService={mockHandleClickService}
        />
      );

      const button = screen.getByRole('button', { name: /select/i });
      fireEvent.click(button);

      expect(mockHandleClickService).toHaveBeenCalledTimes(1);
      expect(mockHandleClickService).toHaveBeenCalledWith(mockService);
    });

    it('calls handleClickService when Remove button is clicked', () => {
      render(
        <ServiceItem
          {...mockService}
          isSelectedList={true}
          handleClickService={mockHandleClickService}
        />
      );

      const button = screen.getByRole('button', { name: /remove/i });
      fireEvent.click(button);

      expect(mockHandleClickService).toHaveBeenCalledTimes(1);
      expect(mockHandleClickService).toHaveBeenCalledWith(mockService);
    });
  });

  describe('Component Structure', () => {
    it('renders with proper structure', () => {
      render(
        <ServiceItem
          {...mockService}
          isSelectedList={false}
          handleClickService={mockHandleClickService}
        />
      );

      expect(screen.getByText('Test Service')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});
