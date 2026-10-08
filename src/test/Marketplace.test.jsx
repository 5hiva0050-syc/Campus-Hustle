import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';

describe('Marketplace & Discovery Engine', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders initial campus marketplace items with realistic data', () => {
    render(<App />);
    // Navigate to marketplace
    fireEvent.click(screen.getByRole('button', { name: /^Marketplace$/i }));

    expect(screen.getByText(/Casio fx-991EX ClassWiz Scientific Calculator/i)).toBeInTheDocument();
    expect(screen.getByText(/Higher Engineering Mathematics by B.S. Grewal/i)).toBeInTheDocument();
    expect(screen.getByText(/Ergonomic Hostel Desk Study Lamp/i)).toBeInTheDocument();
  });

  it('filters items correctly when searching for "Scientific Calculator"', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /^Marketplace$/i }));

    const searchInput = screen.getByPlaceholderText(/Search books, calculators, electronics/i);
    fireEvent.change(searchInput, { target: { value: 'Scientific Calculator' } });

    expect(screen.getByText(/Casio fx-991EX ClassWiz Scientific Calculator/i)).toBeInTheDocument();
    expect(screen.queryByText(/Wildcraft 35L Water-Resistant College Backpack/i)).not.toBeInTheDocument();
  });

  it('displays seller trust credentials and availability badges', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /^Marketplace$/i }));

    expect(screen.getAllByText(/Available/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Campus Verified/i).length).toBeGreaterThan(0);
  });

  it('opens detailed listing modal when clicking an item card', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /^Marketplace$/i }));

    const calcItem = screen.getByText(/Casio fx-991EX ClassWiz Scientific Calculator/i);
    fireEvent.click(calcItem);

    expect(screen.getByText(/Why Trust This Seller\?/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Make Offer/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Chat on Campus/i })).toBeInTheDocument();
  });
});
