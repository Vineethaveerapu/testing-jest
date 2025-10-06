import { render, screen } from '@testing-library/react';
import TextCard from '@/components/TextCard';
import '@testing-library/jest-dom';

describe('TextCard Component', () => {
  describe('Title Rendering', () => {
    it('renders title when provided', () => {
      render(<TextCard title="Test Title" />);
      const title = screen.getByRole('heading', { level: 4 });
      expect(title).toHaveTextContent('Test Title');
    });

    it('renders title with different text', () => {
      render(<TextCard title="Another Title" />);
      const title = screen.getByRole('heading', { level: 4 });
      expect(title).toHaveTextContent('Another Title');
    });

    it('does not render title when not provided', () => {
      // @ts-expect-error title is required but testing conditional rendering
      render(<TextCard />);
      const title = screen.queryByRole('heading', { level: 4 });
      expect(title).not.toBeInTheDocument();
    });

    it('does not render title when empty string', () => {
      render(<TextCard title="" />);
      const title = screen.queryByRole('heading', { level: 4 });
      expect(title).not.toBeInTheDocument();
    });
  });

  describe('Content Rendering', () => {
    it('renders children content when provided', () => {
      render(<TextCard title="Test Title">Test content</TextCard>);
      const content = screen.getByText('Test content');
      expect(content).toBeInTheDocument();
    });

    it('does not render children when not provided', () => {
      render(<TextCard title="Test Title" />);
      const title = screen.getByRole('heading', { level: 4 });
      expect(title).toBeInTheDocument();
      const contentDiv = screen.queryByText('Test content');
      expect(contentDiv).not.toBeInTheDocument();
    });

    it('renders children without title', () => {
      // @ts-expect-error title is required but testing children rendering
      render(<TextCard>Test content only</TextCard>);
      const content = screen.getByText('Test content only');
      expect(content).toBeInTheDocument();
      const title = screen.queryByRole('heading', { level: 4 });
      expect(title).not.toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('applies custom className when provided', () => {
      render(
        <TextCard
          className="custom-class"
          title="Test"
        />
      );
      const title = screen.getByRole('heading', { level: 4 });
      const cardContainer = title.closest('div');
      expect(cardContainer).toHaveClass('custom-class');
    });

    it('works without className prop', () => {
      render(<TextCard title="Test" />);
      const title = screen.getByRole('heading', { level: 4 });
      expect(title).toBeInTheDocument();
    });
  });
});
