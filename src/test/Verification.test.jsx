import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';

describe('Campus Identity Verification Simulator', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('opens verification modal and displays campus verification instructions', () => {
    render(<App />);

    // Click verify student ID in banner
    const verifyBtn = screen.getByRole('button', { name: /Verify Student ID Now/i });
    fireEvent.click(verifyBtn);

    expect(screen.getByText(/Campus Identity Verification/i)).toBeInTheDocument();
    expect(screen.getByText(/Why campus verification matters/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Verification Code/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/arjun.v@campus.edu/i)).toBeInTheDocument();
  });
});
