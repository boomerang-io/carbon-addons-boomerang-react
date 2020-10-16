import React from 'react';
import { render } from '@testing-library/react';

import ErrorBoundaryPoc from './ErrorBoundaryPoc';

const ErrorComponent = () => {
  throw new Error('test');
};

test('render ErrorBoundaryPoc with Message', async () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  const { findByText } = render(
    <ErrorBoundaryPoc>
      <ErrorComponent />
    </ErrorBoundaryPoc>
  );
  const testStatus = await findByText(/Oops, something went wrong/i);
  expect(testStatus).toBeInTheDocument();
  expect(consoleSpy).toHaveBeenCalled();
});
