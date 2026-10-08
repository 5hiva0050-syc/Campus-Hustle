import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';

describe('Food Canteen & Student Peer Services', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders canteen menu and allows placing a food pre-order', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /^Food & Snacks$/i }));

    expect(screen.getAllByText(/Grilled Cheesy Veg Sandwich/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Classic Masala Maggi with Cheese & Herbs/i)).toBeInTheDocument();

    const orderBtn = screen.getAllByRole('button', { name: /Pre-Order for Pickup/i })[0];
    fireEvent.click(orderBtn);

    expect(screen.getByText(/Food Order Placed! 🥪/i)).toBeInTheDocument();
  });

  it('renders student peer services and opens service request modal', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /^Services$/i }));

    expect(screen.getByText(/Fast Laser Printing & Spiral Thesis Binding/i)).toBeInTheDocument();
    expect(screen.getByText(/1-on-1 Tutoring: Engineering Mathematics & DSA in C\+\+/i)).toBeInTheDocument();

    const requestBtn = screen.getAllByRole('button', { name: /Request Service/i })[0];
    fireEvent.click(requestBtn);

    expect(screen.getByText(/Request Service from Vikram Joshi/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Details of your requirement \/ Deadlines/i)).toBeInTheDocument();
  });
});
