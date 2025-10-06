import '@testing-library/jest-dom';
import React from 'react';

// Suppress console warnings for DOM nesting in tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('In HTML, <html> cannot be a child of <div>') ||
        args[0].includes('This will cause a hydration error'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, priority, ...props }: any) {
    // Convert priority boolean to string to avoid React warnings
    const imgProps = { src, alt, ...props };
    if (priority !== undefined) {
      imgProps.priority = priority.toString();
    }
    return React.createElement('img', imgProps);
  };
});

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ href, children, ...props }: any) {
    return React.createElement('a', { href, ...props }, children);
  };
});
