import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import HomePage from '@/app/page';

// Mock the useRouter hook
const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockPrefetch = jest.fn();

jest.mocked(useRouter).mockReturnValue({
  push: mockPush,
  replace: mockReplace,
  prefetch: mockPrefetch,
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
});

describe('Home Page Integration Tests', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('should render home page with all sections and allow service selection', () => {
    render(<HomePage />);

    // Check hero section
    expect(
      screen.getByText('Professional Garden Services')
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Transform your outdoor space/)
    ).toBeInTheDocument();

    // Check services section headers
    expect(screen.getByText('Choose Services')).toBeInTheDocument();
    expect(screen.getByText('Your Selection')).toBeInTheDocument();

    // Check that all services are rendered
    expect(screen.getByText('Weeding')).toBeInTheDocument();
    expect(screen.getByText('Watering')).toBeInTheDocument();
    expect(screen.getByText('Pruning and Trimming')).toBeInTheDocument();
  });

  it('should add services to selection when clicked and update state', () => {
    render(<HomePage />);

    // Initially, selection should be empty
    expect(
      screen.getByText('Choose services from the left panel to get started')
    ).toBeInTheDocument();

    // Click on first service (Weeding) - click the Select button
    const selectButtons = screen.getAllByText('Select');
    expect(selectButtons).toHaveLength(3); // Should have 3 Select buttons initially

    fireEvent.click(selectButtons[0]); // Click Weeding Select button

    // Check that Weeding appears in the selected services section
    const selectedServices = screen.getAllByText('Weeding');
    expect(selectedServices).toHaveLength(2); // One in available, one in selected

    // Verify that the service was added by checking for Remove button
    const removeButtons = screen.getAllByText('Remove');
    expect(removeButtons).toHaveLength(1); // Should have 1 Remove button for Weeding
  });

  it('should remove services from selection when clicked and update state', () => {
    render(<HomePage />);

    // Add services first
    const selectButtons = screen.getAllByText('Select');
    fireEvent.click(selectButtons[0]); // Click Weeding Select button
    fireEvent.click(selectButtons[1]); // Click Watering Select button

    // Verify both are selected
    expect(screen.getAllByText('Weeding')).toHaveLength(2);
    expect(screen.getAllByText('Watering')).toHaveLength(2);

    // Remove Weeding from selected services - click the Remove button
    const removeButtons = screen.getAllByText('Remove');
    fireEvent.click(removeButtons[0]); // Click the first Remove button

    // Check that Weeding is removed from selected (only one occurrence now)
    expect(screen.getAllByText('Weeding')).toHaveLength(1);
    expect(screen.getAllByText('Watering')).toHaveLength(2); // Watering still selected
  });

  it('should prevent duplicate service selection', () => {
    render(<HomePage />);

    // Click on Weeding service multiple times
    const selectButtons = screen.getAllByText('Select');
    fireEvent.click(selectButtons[0]); // Click Weeding Select button
    fireEvent.click(selectButtons[0]); // Try to click again
    fireEvent.click(selectButtons[0]); // Try to click again

    // Should only have 2 occurrences (one in available, one in selected)
    expect(screen.getAllByText('Weeding')).toHaveLength(2);
  });
});
