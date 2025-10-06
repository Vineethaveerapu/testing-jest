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

  // Integration Test 1: Basic service selection workflow
  it('allows user to select a service and see state changes', () => {
    render(<HomePage />);

    // Step 1: Check initial state - no services selected
    expect(
      screen.getByText('Choose services from the left panel to get started')
    ).toBeInTheDocument();

    // Step 2: Check all services are available
    const availableServices = screen.getAllByRole('heading', { level: 4 });
    expect(availableServices).toHaveLength(3);
    expect(availableServices[0]).toHaveTextContent('Weeding');
    expect(availableServices[1]).toHaveTextContent('Watering');
    expect(availableServices[2]).toHaveTextContent('Pruning and Trimming');

    // Step 3: Check all Select buttons are present
    const selectButtons = screen.getAllByRole('button', { name: 'Select' });
    expect(selectButtons).toHaveLength(3);

    // Step 4: Select first service (Weeding) - this changes state
    fireEvent.click(selectButtons[0]);

    // Step 5: Verify state change - Weeding now appears in selected section
    const selectedServices = screen.getAllByText('Weeding');
    expect(selectedServices).toHaveLength(2); // One in available, one in selected

    // Step 6: Verify Remove button appears for selected service
    const removeButtons = screen.getAllByRole('button', { name: 'Remove' });
    expect(removeButtons).toHaveLength(1);
  });

  // Integration Test 2: Service removal workflow with state changes
  it('allows user to remove services and see state changes', () => {
    render(<HomePage />);

    // Step 1: Select multiple services first
    const selectButtons = screen.getAllByRole('button', { name: 'Select' });
    fireEvent.click(selectButtons[0]); // Select Weeding
    fireEvent.click(selectButtons[1]); // Select Watering

    // Step 2: Verify both services are selected
    expect(screen.getAllByText('Weeding')).toHaveLength(2);
    expect(screen.getAllByText('Watering')).toHaveLength(2);

    // Step 3: Remove Weeding from selected services
    const removeButtons = screen.getAllByRole('button', { name: 'Remove' });
    fireEvent.click(removeButtons[0]); // Remove Weeding

    // Step 4: Verify state change - Weeding is removed from selected
    expect(screen.getAllByText('Weeding')).toHaveLength(1); // Only in available now
    expect(screen.getAllByText('Watering')).toHaveLength(2); // Still selected

    // Step 5: Verify only one Remove button remains
    const remainingRemoveButtons = screen.getAllByRole('button', {
      name: 'Remove',
    });
    expect(remainingRemoveButtons).toHaveLength(1);

    // Step 6: Verify Weeding Select button is available again
    const selectButtonsAfterRemoval = screen.getAllByRole('button', {
      name: 'Select',
    });
    expect(selectButtonsAfterRemoval).toHaveLength(3); // All services available again
  });

  // Integration Test 3: Service removal workflow
  it('allows user to remove a selected service', () => {
    render(<HomePage />);

    // Step 1: Select a service first
    const selectButtons = screen.getAllByRole('button', { name: 'Select' });
    fireEvent.click(selectButtons[0]); // Select Weeding

    // Step 2: Verify service is selected
    expect(screen.getAllByText('Weeding')).toHaveLength(2);

    // Step 3: Remove the service
    const removeButtons = screen.getAllByRole('button', { name: 'Remove' });
    fireEvent.click(removeButtons[0]); // Remove Weeding

    // Step 4: Verify service is removed from selected
    expect(screen.getAllByText('Weeding')).toHaveLength(1); // Only in available now

    // Step 5: Verify no Remove buttons exist
    const noRemoveButtons = screen.queryByRole('button', { name: 'Remove' });
    expect(noRemoveButtons).not.toBeInTheDocument();
  });
});
