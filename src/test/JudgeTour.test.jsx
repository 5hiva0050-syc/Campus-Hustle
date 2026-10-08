import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';

describe('PromptWar 1-Click Judge Tour Flow', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('launches Judge Demo Tour and advances through steps', () => {
    render(<App />);

    const tourLauncher = screen.getByText(/Judge Demo Walkthrough/i);
    fireEvent.click(tourLauncher);

    expect(screen.getByText(/Judge Mode/i)).toBeInTheDocument();
    expect(screen.getByText(/STEP 1: Platform Overview/i)).toBeInTheDocument();

    // Click next step button
    const nextBtn = screen.getByRole('button', { name: /Go to Step 2: Open Marketplace/i });
    fireEvent.click(nextBtn);

    expect(screen.getByText(/STEP 2: Explore Structured Marketplace/i)).toBeInTheDocument();
  });
});
