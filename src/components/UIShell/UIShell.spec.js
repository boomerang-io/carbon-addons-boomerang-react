import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import UIShell from './UIShell';

test('accessibility of UIShell', async () => {
  const { container } = render(<UIShell />);
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
