import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';

describe('Campus Rides & Mobility Network', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders interactive campus transit map and pre-approved routes', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /^Campus Rides$/i }));

    expect(screen.getByText(/Interactive Campus Transit Map/i)).toBeInTheDocument();
    expect(screen.getByText(/Select Campus Route/i)).toBeInTheDocument();
    expect(screen.getByText(/Approved Student Peer Mobility Network/i)).toBeInTheDocument();
  });

  it('calculates flat fare and assigns approved student rider', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /^Campus Rides$/i }));

    expect(screen.getByText(/Rohit Kumar/i)).toBeInTheDocument();
    expect(screen.getByText(/Approved Campus Rider/i)).toBeInTheDocument();
    expect(screen.getAllByText(/₹20/i).length).toBeGreaterThan(0);
  });

  it('books a campus ride and triggers booking state machine', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /^Campus Rides$/i }));

    const bookBtn = screen.getByRole('button', { name: /Book Campus Ride/i });
    fireEvent.click(bookBtn);

    expect(screen.getByText(/Live Booking Status:/i)).toBeInTheDocument();
    expect(screen.getByText(/Locating rider near pickup point/i)).toBeInTheDocument();
  });
});
