import { render, screen } from '@testing-library/react';
import ContactUsPage from '@/app/contact-us/page';

describe('Contact Us Page Integration Tests', () => {
  // Integration Test 1: Complete contact page structure and content
  it('renders complete contact page with all sections and information', () => {
    render(<ContactUsPage />);

    // Step 1: Check main page heading
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveTextContent('Contact Us');

    // Step 2: Check page description
    const description = screen.getByText(/We are here to help you/);
    expect(description).toBeInTheDocument();

    // Step 3: Check all contact card headings using getAllByRole
    const cardHeadings = screen.getAllByRole('heading', { level: 4 });
    expect(cardHeadings).toHaveLength(3);
    expect(cardHeadings[0]).toHaveTextContent('Address');
    expect(cardHeadings[1]).toHaveTextContent('Email');
    expect(cardHeadings[2]).toHaveTextContent('Phone');

    // Step 4: Check address information is present
    expect(screen.getByText(/123 Garden Street/)).toBeInTheDocument();
    expect(
      screen.getByText(/Green Valley, Stockholm, Sweden/)
    ).toBeInTheDocument();

    // Step 5: Check phone information is present
    const phoneNumbers = screen.getAllByText(/\+46 70 123 45 67/);
    expect(phoneNumbers).toHaveLength(2); // Phone and Email sections
    const businessHours = screen.getAllByText(/Mon-Fri: 9:00 AM - 6:00 PM/);
    expect(businessHours).toHaveLength(2);
  });

  // Integration Test 2: Contact information structure and organization
  it('organizes contact information correctly in TextCard components', () => {
    render(<ContactUsPage />);

    // Step 1: Find Address card and verify its content
    const addressHeading = screen.getByRole('heading', { name: 'Address' });
    const addressCard = addressHeading.closest('div');
    expect(addressCard).toBeInTheDocument();
    expect(addressCard).toHaveTextContent('123 Garden Street');
    expect(addressCard).toHaveTextContent('Green Valley, Stockholm, Sweden');

    // Step 2: Find Email card and verify its content
    const emailHeading = screen.getByRole('heading', { name: 'Email' });
    const emailCard = emailHeading.closest('div');
    expect(emailCard).toBeInTheDocument();
    expect(emailCard).toHaveTextContent('+46 70 123 45 67');
    expect(emailCard).toHaveTextContent('Mon-Fri: 9:00 AM - 6:00 PM');

    // Step 3: Find Phone card and verify its content
    const phoneHeading = screen.getByRole('heading', { name: 'Phone' });
    const phoneCard = phoneHeading.closest('div');
    expect(phoneCard).toBeInTheDocument();
    expect(phoneCard).toHaveTextContent('+46 70 123 45 67');
    expect(phoneCard).toHaveTextContent('Mon-Fri: 9:00 AM - 6:00 PM');

    // Step 4: Verify all cards are present and contain expected content
    expect(addressCard).toBeInTheDocument();
    expect(emailCard).toBeInTheDocument();
    expect(phoneCard).toBeInTheDocument();
  });

  // Integration Test 3: Page layout and accessibility
  it('provides proper page structure and accessibility features', () => {
    render(<ContactUsPage />);

    // Step 1: Check page has proper heading hierarchy
    const h1Heading = screen.getByRole('heading', { level: 1 });
    expect(h1Heading).toHaveTextContent('Contact Us');

    const h4Headings = screen.getAllByRole('heading', { level: 4 });
    expect(h4Headings).toHaveLength(3);

    // Step 2: Check all contact information is accessible
    const addressInfo = screen.getByText(/123 Garden Street/);
    const phoneNumbers = screen.getAllByText(/\+46 70 123 45 67/);
    const businessHours = screen.getAllByText(/Mon-Fri: 9:00 AM - 6:00 PM/);

    expect(addressInfo).toBeInTheDocument();
    expect(phoneNumbers).toHaveLength(2);
    expect(businessHours).toHaveLength(2);

    // Step 3: Verify page structure is logical and complete
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText(/We are here to help you/)).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
  });
});
