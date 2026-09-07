import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Services from '../Components/Services.jsx';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: 'en' }
  })
}));

describe('Services Split Section', () => {
  it('renders all 6 service tabs', () => {
    render(<Services />);
    expect(screen.getByText('01 SHIPPING')).toBeInTheDocument();
    expect(screen.getByText('02 RAIL')).toBeInTheDocument();
    expect(screen.getByText('03 SOLUTIONS')).toBeInTheDocument();
    expect(screen.getByText('04 ADVISORY')).toBeInTheDocument();
    expect(screen.getByText('05 METALS')).toBeInTheDocument();
    expect(screen.getByText('06 SLAG & BYPRODUCTS')).toBeInTheDocument();
  });

  it('displays default first service content and allows tab switching', () => {
    render(<Services />);
    
    // Default active tab: 01 SHIPPING
    expect(screen.getByText('Container & Bulk Ocean Freight')).toBeInTheDocument();
    expect(screen.getByText('Inquire Freight Rates')).toBeInTheDocument();

    // Click on tab 02 RAIL
    fireEvent.click(screen.getByText('02 RAIL'));
    expect(screen.getByText('Cross-Border Rail Freight')).toBeInTheDocument();
    expect(screen.getByText('Inquire Rail Routes')).toBeInTheDocument();

    // Click on tab 05 METALS
    fireEvent.click(screen.getByText('05 METALS'));
    expect(screen.getByText('Structural & Industrial Metal Supply')).toBeInTheDocument();
    expect(screen.getByText('Request Metal Specs')).toBeInTheDocument();
  });
});
