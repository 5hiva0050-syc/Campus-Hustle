import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';

describe('Give Away (₹0) & Rent / Borrow Systems', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders Give Away section with ₹0 free student items', () => {
    render(<App />);
    const giveawayTab = screen.getAllByRole('button', { name: /Give Away \(₹0\)/i })[0];
    fireEvent.click(giveawayTab);

    expect(screen.getByText(/Zero-Rupee Campus Sharing/i)).toBeInTheDocument();
    expect(screen.getByText(/First Year Engineering Physics Lab Manual/i)).toBeInTheDocument();
    expect(screen.getAllByText(/FREE/i).length).toBeGreaterThan(0);
  });

  it('renders Rent / Borrow section with daily equipment rental rates', () => {
    render(<App />);
    const rentTab = screen.getAllByRole('button', { name: /Rent \/ Borrow/i })[0];
    fireEvent.click(rentTab);

    expect(screen.getByText(/Temporary Campus Equipment & Gear/i)).toBeInTheDocument();
    expect(screen.getByText(/Texas Instruments TI-84 Plus CE Graphing Calculator/i)).toBeInTheDocument();
    expect(screen.getAllByText(/RENT/i).length).toBeGreaterThan(0);
  });
});
