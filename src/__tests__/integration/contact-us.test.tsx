import { render, screen } from '@testing-library/react';
import ContactUsPage from '@/app/contact-us/page';

describe('Contact Us Page Integration Tests', () => {
  it('should render contact us page with all contact information', () => {
    render(<ContactUsPage />);

    // Check main heading
    expect(screen.getByText('Contact Us')).toBeInTheDocument();

    // Check description
    expect(screen.getByText(/We are here to help you/)).toBeInTheDocument();

    // Check all contact cards are rendered
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();

    // Check address information (text is split across br tags)
    expect(screen.getByText(/123 Garden Street/)).toBeInTheDocument();
    expect(
      screen.getByText(/Green Valley, Stockholm, Sweden/)
    ).toBeInTheDocument();

    // Check phone information (text is split across br tags)
    expect(screen.getAllByText(/\+46 70 123 45 67/)).toHaveLength(2); // Phone and Email sections
    expect(screen.getAllByText(/Mon-Fri: 9:00 AM - 6:00 PM/)).toHaveLength(2);
  });

  it('should render TextCard components with proper structure', () => {
    render(<ContactUsPage />);

    // Check that TextCard components are properly structured
    const addressCard = screen.getByText('Address').closest('div');
    const emailCard = screen.getByText('Email').closest('div');
    const phoneCard = screen.getByText('Phone').closest('div');

    expect(addressCard).toBeInTheDocument();
    expect(emailCard).toBeInTheDocument();
    expect(phoneCard).toBeInTheDocument();

    // Check that each card contains its respective content
    expect(addressCard).toHaveTextContent('123 Garden Street');
    expect(addressCard).toHaveTextContent('Green Valley, Stockholm, Sweden');

    expect(emailCard).toHaveTextContent('+46 70 123 45 67');
    expect(emailCard).toHaveTextContent('Mon-Fri: 9:00 AM - 6:00 PM');

    expect(phoneCard).toHaveTextContent('+46 70 123 45 67');
    expect(phoneCard).toHaveTextContent('Mon-Fri: 9:00 AM - 6:00 PM');
  });
});
