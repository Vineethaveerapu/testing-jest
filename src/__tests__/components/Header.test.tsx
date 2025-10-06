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

  describe('Logo Section', () => {
    it('renders logo image', () => {
      render(<Header />);
      const logo = screen.getByRole('img', { name: /logo/i });
      expect(logo).toBeInTheDocument();
    });
  });

  describe('Navigation Links', () => {
    it('renders all navigation links', () => {
      render(<Header />);
      const homeLink = screen.getByRole('link', { name: /home/i });
      const contactLink = screen.getByRole('link', { name: /contact us/i });

      expect(homeLink).toBeInTheDocument();
      expect(contactLink).toBeInTheDocument();
    });

    it('has correct link hrefs', () => {
      render(<Header />);
      const homeLink = screen.getByRole('link', { name: /home/i });
      const contactLink = screen.getByRole('link', { name: /contact us/i });

      expect(homeLink).toHaveAttribute('href', '/');
      expect(contactLink).toHaveAttribute('href', '/contact-us');
    });
  });

  describe('Active Link Styling', () => {
    it('applies active styling to current page link', () => {
      mockUsePathname.mockReturnValue('/');
      render(<Header />);

      const homeLink = screen.getByRole('link', { name: /home/i });
      expect(homeLink).toHaveClass('underline', 'underline-offset-4');
    });

    it('does not apply active styling to non-current page links', () => {
      mockUsePathname.mockReturnValue('/contact-us');
      render(<Header />);

      const homeLink = screen.queryByRole('link', { name: /home/i });
      expect(homeLink).not.toHaveClass('underline');
    });
  });
});
