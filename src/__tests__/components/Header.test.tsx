import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';
import { usePathname } from 'next/navigation';
import '@testing-library/jest-dom';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('Header Component', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/');
  });

  // Test 1: Check if header renders
  it('renders the header element', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  // Test 2: Check if logo image renders using getByRole
  it('renders logo image', () => {
    render(<Header />);
    const logo = screen.getByRole('img', { name: 'logo' });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logo.png');
  });

  // Test 3: Check all navigation links using getAllByRole
  it('renders all navigation links', () => {
    render(<Header />);
    const navLinks = screen.getAllByRole('link');
    expect(navLinks).toHaveLength(2);
    expect(navLinks[0]).toHaveTextContent('Home');
    expect(navLinks[1]).toHaveTextContent('Contact Us');
  });

  // Test 4: Check Home link specifically
  it('renders Home link with correct href', () => {
    render(<Header />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  // Test 5: Check Contact Us link specifically
  it('renders Contact Us link with correct href', () => {
    render(<Header />);
    const contactLink = screen.getByRole('link', { name: 'Contact Us' });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', '/contact-us');
  });

  // Test 6: Check active styling when on home page using queryByRole
  it('applies active styling to Home link when on home page', () => {
    mockUsePathname.mockReturnValue('/');
    render(<Header />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toHaveClass('underline', 'underline-offset-4');
  });

  // Test 7: Check active styling when on contact page
  it('applies active styling to Contact Us link when on contact page', () => {
    mockUsePathname.mockReturnValue('/contact-us');
    render(<Header />);

    const contactLink = screen.getByRole('link', { name: 'Contact Us' });
    expect(contactLink).toHaveClass('underline', 'underline-offset-4');
  });

  // Test 8: Check that non-active links don't have styling using queryByRole
  it('does not apply active styling to Home link when on contact page', () => {
    mockUsePathname.mockReturnValue('/contact-us');
    render(<Header />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).not.toHaveClass('underline');
  });

  // Test 9: Check that non-active links don't have styling
  it('does not apply active styling to Contact Us link when on home page', () => {
    mockUsePathname.mockReturnValue('/');
    render(<Header />);

    const contactLink = screen.getByRole('link', { name: 'Contact Us' });
    expect(contactLink).not.toHaveClass('underline');
  });
});
