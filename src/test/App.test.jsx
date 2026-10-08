import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';

describe('Campus Hustle - Core Platform & Navigation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the platform brand, logo, and verified badge', () => {
    render(<App />);
    expect(screen.getAllByText(/CAMPUS HUSTLE/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Everything campus. One trusted platform./i).length).toBeGreaterThan(0);
  });

  it('displays hero section with primary CTAs and trust indicators', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /Browse Campus/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sell Something/i })).toBeInTheDocument();
    expect(screen.getByText(/Campus Verified Identities/i)).toBeInTheDocument();
    expect(screen.getByText(/Student-to-Student Only/i)).toBeInTheDocument();
  });

  it('navigates to Marketplace when clicking Browse Campus', () => {
    render(<App />);
    const browseBtn = screen.getByRole('button', { name: /Browse Campus/i });
    fireEvent.click(browseBtn);
    expect(screen.getByPlaceholderText(/Search books, calculators, electronics/i)).toBeInTheDocument();
  });

  it('navigates through main tabs: Food, Rides, Services, Map, Dashboard', () => {
    render(<App />);
    
    // Food
    const foodTab = screen.getByRole('button', { name: /^Food & Snacks$/i });
    fireEvent.click(foodTab);
    expect(screen.getByText(/Food & Late-Night Campus Canteen/i)).toBeInTheDocument();

    // Rides
    const ridesTab = screen.getByRole('button', { name: /^Campus Rides$/i });
    fireEvent.click(ridesTab);
    expect(screen.getByText(/Campus Rides & Fast Internal Transit/i)).toBeInTheDocument();

    // Services
    const servicesTab = screen.getByRole('button', { name: /^Services$/i });
    fireEvent.click(servicesTab);
    expect(screen.getByText(/Student Services & Peer Assistance/i)).toBeInTheDocument();

    // Map
    const mapTab = screen.getByRole('button', { name: /^Campus Map$/i });
    fireEvent.click(mapTab);
    expect(screen.getByText(/Official Campus Ecosystem Map/i)).toBeInTheDocument();
  });

  it('opens Quick Sell modal in 60 seconds', () => {
    render(<App />);
    const quickSellBtn = screen.getByRole('button', { name: /Quick Sell/i });
    fireEvent.click(quickSellBtn);
    expect(screen.getByText(/Quick Sell — Post in 60 Seconds/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Product Name \/ Title/i)).toBeInTheDocument();
  });
});
