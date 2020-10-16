import React from 'react';
import { render } from '@testing-library/react';

import ErrorDragon from './ErrorDragon';

const statusUrl = '/test';

test('render Error with Message', async () => {
  const { findByText } = render(<ErrorDragon statusUrl={statusUrl} />);
  const title = await findByText(/Don’t lose your daks/i);
  expect(title).toBeInTheDocument();
});
