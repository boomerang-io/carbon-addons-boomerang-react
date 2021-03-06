import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import AboutPlatform from './AboutPlatform.js';

test('correct version rendered', () => {
  // Render new instance in every test to prevent leaking state
  const { getByText, getByRole } = render(<AboutPlatform version="1.2.1" />);
  const btn = getByRole('button', { name: /About the Platform/i });

  fireEvent.click(btn);

  const version = getByText(/1.2.1/i);
  expect(version).toBeInTheDocument();
});

test('correct organization rendered', () => {
  // Render new instance in every test to prevent leaking state
  const { getByText, getByRole } = render(<AboutPlatform organization="Boomerang" />);
  const btn = getByRole('button', { name: /About the Platform/i });

  fireEvent.click(btn);

  const organization = getByText(/Boomerang/i);
  expect(organization).toBeInTheDocument();
});
