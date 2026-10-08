import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';

describe('Safety Center & Admin Moderation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders safe meetup zones and prohibited items policy in Safety Center', () => {
    render(<App />);
    const safetyBtn = screen.getByRole('button', { name: /Safety Guidelines/i });
    fireEvent.click(safetyBtn);

    expect(screen.getByText(/Recommended Safe Campus Meetup Points/i)).toBeInTheDocument();
    expect(screen.getByText(/Central Library Main Entrance & Turnstiles/i)).toBeInTheDocument();
    expect(screen.getByText(/Prohibited Items & Non-Negotiables/i)).toBeInTheDocument();
  });

  it('allows university admin to view reports queue and resolve flags', () => {
    render(<App />);
    // Navigate to admin
    const adminBtn = screen.getByRole('button', { name: /Moderation Portal \(Admin\)/i });
    fireEvent.click(adminBtn);

    expect(screen.getByText(/Campus Ecosystem Admin Portal/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending User Reports & Flags/i)).toBeInTheDocument();

    const resolveBtn = screen.getByRole('button', { name: /Mark Resolved ✓/i });
    fireEvent.click(resolveBtn);

    expect(screen.getByText(/Report Resolved/i)).toBeInTheDocument();
  });
});
