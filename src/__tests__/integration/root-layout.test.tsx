import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import RootLayout from '@/app/layout';

// Mock the usePathname hook
jest.mocked(usePathname).mockReturnValue('/');

describe('RootLayout Integration Tests', () => {
  const TestChild = () => <div data-testid="test-child">Test Content</div>;

  // Integration Test 1: Complete layout structure with all components
  it('renders complete layout with header, main content, and footer', () => {
    render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    );

    // Step 1: Check that child content is rendered in main area
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();

    // Step 2: Check that header is present using getByRole
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    // Step 3: Check that footer is present using getByRole
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();

    // Step 4: Verify layout structure is complete
    expect(header).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  // Integration Test 2: Header component integration within layout
  it('integrates header component with logo and navigation', () => {
    render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    );

    // Step 1: Check header is present
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    // Step 2: Check logo is rendered using getByRole
    const logo = screen.getByRole('img', { name: 'logo' });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logo.png');

    // Step 3: Check navigation links specifically
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const contactLink = screen.getByRole('link', { name: 'Contact Us' });

    expect(homeLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();

    // Step 4: Check navigation links have correct hrefs
    expect(homeLink).toHaveAttribute('href', '/');
    expect(contactLink).toHaveAttribute('href', '/contact-us');
  });

  // Integration Test 3: Footer component integration within layout
  it('integrates footer component with all sections and links', () => {
    render(
      <RootLayout>
        <TestChild />
      </RootLayout>
    );

    // Step 1: Check footer is present
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();

    // Step 2: Check all footer section headings using getAllByRole
    const footerHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(footerHeadings).toHaveLength(3);
    expect(footerHeadings[0]).toHaveTextContent('About Us');
    expect(footerHeadings[1]).toHaveTextContent('Contact Info');
    expect(footerHeadings[2]).toHaveTextContent('Follow Us');

    // Step 3: Check contact information is present
    expect(screen.getByText('Email: info@urbanmali.com')).toBeInTheDocument();
    expect(screen.getByText('Phone: 077 1234567')).toBeInTheDocument();
    expect(screen.getByText('Address: 123 Garden Street')).toBeInTheDocument();

    // Step 4: Check all social media links using getAllByRole
    const facebookLink = screen.getByRole('link', { name: 'Facebook' });
    const instagramLink = screen.getByRole('link', { name: 'Instagram' });
    const twitterLink = screen.getByRole('link', { name: 'Twitter' });

    expect(facebookLink).toBeInTheDocument();
    expect(instagramLink).toBeInTheDocument();
    expect(twitterLink).toBeInTheDocument();

    // Step 5: Check copyright notice
    expect(
      screen.getByText('© 2025 Garden. All rights reserved.')
    ).toBeInTheDocument();
  });
});
