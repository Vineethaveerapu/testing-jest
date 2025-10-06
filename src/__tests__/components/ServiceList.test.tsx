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

  describe('Service Rendering', () => {
    it('renders all service items', () => {
      render(
        <ServiceList
          items={mockServices}
          addSelectedService={mockAddSelectedService}
          removeSelectedService={mockRemoveSelectedService}
          isSelectedList={false}
        />
      );

      expect(screen.getByText('Service 1')).toBeInTheDocument();
      expect(screen.getByText('Service 2')).toBeInTheDocument();
      expect(screen.getByText('Service 3')).toBeInTheDocument();
    });

    it('renders empty list when no services provided', () => {
      render(
        <ServiceList
          items={[]}
          addSelectedService={mockAddSelectedService}
          removeSelectedService={mockRemoveSelectedService}
          isSelectedList={false}
        />
      );

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  describe('Button States', () => {
    it('shows Select buttons when not in selected list', () => {
      render(
        <ServiceList
          items={mockServices}
          addSelectedService={mockAddSelectedService}
          removeSelectedService={mockRemoveSelectedService}
          isSelectedList={false}
        />
      );

      const selectButtons = screen.getAllByRole('button', { name: /select/i });
      expect(selectButtons).toHaveLength(3);
    });

    it('shows Remove buttons when in selected list', () => {
      render(
        <ServiceList
          items={mockServices}
          addSelectedService={mockAddSelectedService}
          removeSelectedService={mockRemoveSelectedService}
          isSelectedList={true}
        />
      );

      const removeButtons = screen.getAllByRole('button', { name: /remove/i });
      expect(removeButtons).toHaveLength(3);
    });
  });

  describe('User Interactions', () => {
    it('calls addSelectedService when Select button is clicked', () => {
      render(
        <ServiceList
          items={mockServices}
          addSelectedService={mockAddSelectedService}
          removeSelectedService={mockRemoveSelectedService}
          isSelectedList={false}
        />
      );

      const firstButton = screen.getAllByRole('button', { name: /select/i })[0];
      fireEvent.click(firstButton);

      expect(mockAddSelectedService).toHaveBeenCalledTimes(1);
      expect(mockAddSelectedService).toHaveBeenCalledWith(mockServices[0]);
    });

    it('calls removeSelectedService when Remove button is clicked', () => {
      render(
        <ServiceList
          items={mockServices}
          addSelectedService={mockAddSelectedService}
          removeSelectedService={mockRemoveSelectedService}
          isSelectedList={true}
        />
      );

      const firstButton = screen.getAllByRole('button', { name: /remove/i })[0];
      fireEvent.click(firstButton);

      expect(mockRemoveSelectedService).toHaveBeenCalledTimes(1);
      expect(mockRemoveSelectedService).toHaveBeenCalledWith(mockServices[0]);
    });
  });

  describe('Props', () => {
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

    it('works without optional props', () => {
      render(
        <ServiceList
          items={mockServices}
          addSelectedService={mockAddSelectedService}
        />
      );

      expect(screen.getByText('Service 1')).toBeInTheDocument();
    });
  });
});
