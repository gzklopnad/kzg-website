import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Hero from '../Components/Hero.jsx';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: 'en' }
  })
}));

describe('Hero Section', () => {
  it('renders all 3 slide scrubber controls', () => {
    render(<Hero skipSteps={false} setSkipSteps={vi.fn()} />);
    expect(screen.getByRole('button', { name: /Jump to 01 SOURCING/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Jump to 02 FREIGHT/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Jump to 03 ADVISORY/i })).toBeInTheDocument();
  });

  it('changes slide content when scrubber buttons are clicked', () => {
    render(<Hero skipSteps={false} setSkipSteps={vi.fn()} />);
    
    // Initial slide 01 SOURCING content
    expect(screen.getByText('Supply and distribution of industrial metals, metallurgical slag, and certified smelting byproducts.')).toBeInTheDocument();

    // Click slide 02 FREIGHT button
    fireEvent.click(screen.getByRole('button', { name: /Jump to 02 FREIGHT/i }));
    expect(screen.getByText('Cross-border freight coordination across dedicated rail, sea, and road corridors.')).toBeInTheDocument();

    // Click slide 03 ADVISORY button
    fireEvent.click(screen.getByRole('button', { name: /Jump to 03 ADVISORY/i }));
    expect(screen.getByText('Risk assessment, customs procedures, and strategic routing for complex cargo flows.')).toBeInTheDocument();
  });

  it('renders background video tag with hero-final.mp4 source', () => {
    const { container } = render(<Hero skipSteps={false} setSkipSteps={vi.fn()} />);
    const videoElem = container.querySelector('video');
    expect(videoElem).toBeInTheDocument();
    const sourceElem = container.querySelector('video source');
    expect(sourceElem).toHaveAttribute('src', '/videos/hero-final.mp4');
  });
});
