import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';

describe('From Chat to Deal - Structured Negotiation Workflow', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('completes the entire offer negotiation and deal summary flow', () => {
    render(<App />);

    // 1. Open Marketplace
    fireEvent.click(screen.getByRole('button', { name: /^Marketplace$/i }));

    // 2. Open Calculator Listing
    const calc = screen.getByText(/Casio fx-991EX ClassWiz Scientific Calculator/i);
    fireEvent.click(calc);

    // 3. Click Make Offer
    const makeOfferBtn = screen.getByRole('button', { name: /Make Offer/i });
    fireEvent.click(makeOfferBtn);

    expect(screen.getByText(/Make a Structured Offer/i)).toBeInTheDocument();

    // 4. Enter ₹600 offer
    const offerInput = screen.getByPlaceholderText(/e.g. 600/i);
    fireEvent.change(offerInput, { target: { value: '600' } });

    const submitOfferBtn = screen.getByRole('button', { name: /Submit Formal Offer/i });
    fireEvent.click(submitOfferBtn);

    // 5. Chat modal opens with listing header
    expect(screen.getByText(/Listing-Specific Deal Chat/i)).toBeInTheDocument();
    expect(screen.getByText(/Current Deal Stage:/i)).toBeInTheDocument();

    // 6. Navigate to Dashboard to view deals
    const closeButtons = screen.getAllByLabelText(/Close modal/i);
    closeButtons.forEach(btn => fireEvent.click(btn));
    fireEvent.click(screen.getByTitle(/Arjun Verma - Campus Verified/i)); // open dashboard

    // 7. Click My Deals & Purchases tab
    const dealsTab = screen.getByRole('button', { name: /My Deals & Purchases/i });
    fireEvent.click(dealsTab);

    expect(screen.getByText(/Locked Deals & Transaction Ledger/i)).toBeInTheDocument();
  });
});
