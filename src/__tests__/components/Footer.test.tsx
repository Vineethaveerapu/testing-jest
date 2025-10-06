import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';
import '@testing-library/jest-dom';

describe('Footer Component', () => {
  describe('Section Headings', () => {
    it('renders all section headings', () => {
      render(<Footer />);
      const headings = screen.getAllByRole('heading', { level: 3 });
      const expectedTexts = ['About Us', 'Contact Info', 'Follow Us'];

      expect(headings).toHaveLength(3);
      headings.forEach((heading, index) => {
        expect(heading).toHaveTextContent(expectedTexts[index]);
      });
    });
  });

  describe('About Us Section', () => {
    it('renders about us description', () => {
      render(<Footer />);
      const description = screen.getByText(
        /We are dedicated to providing the best gardening solutions and tips for your green space/i
      );
      expect(description).toBeInTheDocument();
    });
  });

  describe('Contact Info Section', () => {
    it('renders all contact information', () => {
      render(<Footer />);
      expect(screen.getByText('Email: info@urbanmali.com')).toBeInTheDocument();
      expect(screen.getByText('Phone: 077 1234567')).toBeInTheDocument();
      expect(
        screen.getByText('Address: 123 Garden Street')
      ).toBeInTheDocument();
    });

    it('renders contact info as a list', () => {
      render(<Footer />);
      const contactItems = screen.getAllByRole('listitem');
      expect(contactItems).toHaveLength(3);
    });
  });

  describe('Social Media Links', () => {
    it('renders all social media links', () => {
      render(<Footer />);
      const facebookLink = screen.getByRole('link', { name: /facebook/i });
      const instagramLink = screen.getByRole('link', { name: /instagram/i });
      const twitterLink = screen.getByRole('link', { name: /twitter/i });

      expect(facebookLink).toBeInTheDocument();
      expect(instagramLink).toBeInTheDocument();
      expect(twitterLink).toBeInTheDocument();
    });
  });

  describe('Copyright Section', () => {
    it('renders copyright notice', () => {
      const year = new Date().getFullYear();
      render(<Footer />);
      const copyright = screen.getByText(
        `© ${year} Garden. All rights reserved.`
      );
      expect(copyright).toBeInTheDocument();
    });
  });
});
