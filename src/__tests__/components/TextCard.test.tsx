import { render, screen } from '@testing-library/react';
import TextCard from '@/components/TextCard';
import '@testing-library/jest-dom';

describe('TextCard Component', () => {
  // Test 1: Check if TextCard renders with title
  it('renders TextCard with title', () => {
    render(<TextCard title="Test Title" />);
    const title = screen.getByRole('heading', { level: 4 });
    expect(title).toHaveTextContent('Test Title');
  });

  // Test 2: Check title using getByRole
  it('renders title as heading element', () => {
    render(<TextCard title="Another Title" />);
    const title = screen.getByRole('heading', { level: 4 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Another Title');
  });

  // Test 3: Check children content
  it('renders children content when provided', () => {
    render(<TextCard title="Test Title">Test content</TextCard>);
    const content = screen.getByText('Test content');
    expect(content).toBeInTheDocument();
  });

  // Test 4: Check children without title
  it('renders children content without title', () => {
    // @ts-expect-error title is required but testing children rendering
    render(<TextCard>Test content only</TextCard>);
    const content = screen.getByText('Test content only');
    expect(content).toBeInTheDocument();
  });

  // Test 5: Check no title when not provided using queryByRole
  it('does not render title when not provided', () => {
    // @ts-expect-error title is required but testing conditional rendering
    render(<TextCard />);
    const title = screen.queryByRole('heading', { level: 4 });
    expect(title).not.toBeInTheDocument();
  });

  // Test 6: Check no title when empty string using queryByRole
  it('does not render title when empty string', () => {
    render(<TextCard title="" />);
    const title = screen.queryByRole('heading', { level: 4 });
    expect(title).not.toBeInTheDocument();
  });

  // Test 7: Check no children when not provided using queryByRole
  it('does not render children when not provided', () => {
    render(<TextCard title="Test Title" />);
    const title = screen.getByRole('heading', { level: 4 });
    expect(title).toBeInTheDocument();
    const contentDiv = screen.queryByText('Test content');
    expect(contentDiv).not.toBeInTheDocument();
  });

  // Test 8: Check custom className prop
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

  // Test 9: Check works without className prop
  it('works without className prop', () => {
    render(<TextCard title="Test" />);
    const title = screen.getByRole('heading', { level: 4 });
    expect(title).toBeInTheDocument();
  });

  // Test 10: Check multiple children content
  it('renders multiple children content', () => {
    render(
      <TextCard title="Test Title">
        <div>First child</div>
        <div>Second child</div>
      </TextCard>
    );
    expect(screen.getByText('First child')).toBeInTheDocument();
    expect(screen.getByText('Second child')).toBeInTheDocument();
  });
});
