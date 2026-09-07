import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Contact from '../Components/Contact.jsx';

// Mock Formspree and hCaptcha
vi.mock('@formspree/react', () => ({
  useForm: () => [{ submitting: false, succeeded: false, errors: [] }, vi.fn()],
  ValidationError: () => null,
}));

vi.mock('@hcaptcha/react-hcaptcha', () => ({
  default: vi.fn(() => <div data-testid="hcaptcha-mock" />)
}));

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: 'en' }
  })
}));

describe('Contact Section', () => {
  it('renders real contact phone and email without icons', () => {
    render(<Contact />);
    expect(screen.getByText('+48 22 643 00 60')).toBeInTheDocument();
    expect(screen.getByText('info@kzg.net.pl')).toBeInTheDocument();
    expect(screen.getByText('Contact us for rate quotes, raw material sourcing, and freight logistics.')).toBeInTheDocument();
  });

  it('renders form input fields with required attributes', () => {
    render(<Contact />);
    const nameInput = screen.getByLabelText(/Full Name \*/i);
    const emailInput = screen.getByLabelText(/Corporate Email \*/i);
    const companyInput = screen.getByLabelText(/Company Name \*/i);
    const messageInput = screen.getByLabelText(/Message \*/i);

    expect(nameInput).toBeRequired();
    expect(emailInput).toBeRequired();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(companyInput).toBeRequired();
    expect(messageInput).toBeRequired();
  });

  it('renders the Send Message action submit button', () => {
    render(<Contact />);
    const submitBtn = screen.getByRole('button', { name: /Send Message/i });
    expect(submitBtn).toBeInTheDocument();
  });
});
