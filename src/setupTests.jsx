import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Mock window.matchMedia for motion / prefers-reduced-motion
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Mock motion/react to prevent animation delay in tests
vi.mock('motion/react', () => {
  return {
    motion: {
      div: ({ children, className, onClick, style }) =>
        React.createElement('div', { className, onClick, style }, children),
      section: ({ children, className }) =>
        React.createElement('section', { className }, children),
    },
    AnimatePresence: ({ children }) => React.createElement(React.Fragment, null, children),
    useInView: () => true,
  };
});
