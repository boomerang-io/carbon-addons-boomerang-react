import React from 'react';
import { render } from '@testing-library/react';

import RecoverErrorBoundary from './RecoverErrorBoundary';

const ErrorComponent = () => {
  throw new Error('test');
};

test('render RecoverErrorBoundary with Message', async () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  const { findByText } = render(
    <RecoverErrorBoundary>
      <ErrorComponent />
    </RecoverErrorBoundary>
  );
  const testStatus = await findByText(/Oops, something went wrong/i);
  expect(testStatus).toBeInTheDocument();
  expect(consoleSpy).toHaveBeenCalled();
});
