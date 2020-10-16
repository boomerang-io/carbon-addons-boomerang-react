import React from 'react';
import { render } from '@testing-library/react';

import ErrorMessage from './ErrorMessage';

const status = 'testStatus';
const statusText = 'testText';

test('render Error with Message', async () => {
  const { findByText } = render(<ErrorMessage status={status} statusText={statusText} />);
  const testStatus = await findByText(/testStatus/i);
  expect(testStatus).toBeInTheDocument();

  const testStatusText = await findByText(/testText/i);
  expect(testStatusText).toBeInTheDocument();
});
