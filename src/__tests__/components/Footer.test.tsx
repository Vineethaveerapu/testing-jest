import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';
import '@testing-library/jest-dom';

describe('Footer Component', () => {
  // Test 1: Check if footer renders
  it('renders the footer element', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  // Test 2: Check all section headings using getAllByRole
  it('renders all section headings', () => {
    render(<Footer />);
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings).toHaveLength(3);
    expect(headings[0]).toHaveTextContent('About Us');
    expect(headings[1]).toHaveTextContent('Contact Info');
    expect(headings[2]).toHaveTextContent('Follow Us');
  });

  // Test 3: Check About Us section content
  it('renders About Us section with description', () => {
    render(<Footer />);
    const aboutUsHeading = screen.getByRole('heading', { name: 'About Us' });
    expect(aboutUsHeading).toBeInTheDocument();

    const description = screen.getByText(
      /We are dedicated to providing the best gardening solutions/i
    );
    expect(description).toBeInTheDocument();
  });

  // Test 4: Check Contact Info section using getAllByRole
  it('renders all contact information items', () => {
    render(<Footer />);
    const contactItems = screen.getAllByRole('listitem');
    expect(contactItems).toHaveLength(3);
    expect(contactItems[0]).toHaveTextContent('Email: info@urbanmali.com');
    expect(contactItems[1]).toHaveTextContent('Phone: 077 1234567');
    expect(contactItems[2]).toHaveTextContent('Address: 123 Garden Street');
  });

  // Test 5: Check Contact Info heading
  it('renders Contact Info heading', () => {
    render(<Footer />);
    const contactHeading = screen.getByRole('heading', {
      name: 'Contact Info',
    });
    expect(contactHeading).toBeInTheDocument();
  });

  // Test 6: Check Follow Us section heading
  it('renders Follow Us heading', () => {
    render(<Footer />);
    const followUsHeading = screen.getByRole('heading', { name: 'Follow Us' });
    expect(followUsHeading).toBeInTheDocument();
  });

  // Test 7: Check all social media links using getAllByRole
  it('renders all social media links', () => {
    render(<Footer />);
    const socialLinks = screen.getAllByRole('link');
    expect(socialLinks).toHaveLength(3);
    expect(socialLinks[0]).toHaveTextContent('Facebook');
    expect(socialLinks[1]).toHaveTextContent('Instagram');
    expect(socialLinks[2]).toHaveTextContent('Twitter');
  });

  // Test 8: Check Facebook link specifically
  it('renders Facebook link with correct href', () => {
    render(<Footer />);
    const facebookLink = screen.getByRole('link', { name: 'Facebook' });
    expect(facebookLink).toBeInTheDocument();
    expect(facebookLink).toHaveAttribute('href', '/facebook');
  });

  // Test 9: Check Instagram link specifically
  it('renders Instagram link with correct href', () => {
    render(<Footer />);
    const instagramLink = screen.getByRole('link', { name: 'Instagram' });
    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink).toHaveAttribute('href', '/instagram');
  });

  // Test 10: Check Twitter link specifically
  it('renders Twitter link with correct href', () => {
    render(<Footer />);
    const twitterLink = screen.getByRole('link', { name: 'Twitter' });
    expect(twitterLink).toBeInTheDocument();
    expect(twitterLink).toHaveAttribute('href', '/twitter');
  });

  // Test 11: Check copyright notice
  it('renders copyright notice', () => {
    render(<Footer />);
    const copyright = screen.getByText('© 2025 Garden. All rights reserved.');
    expect(copyright).toBeInTheDocument();
  });
});
