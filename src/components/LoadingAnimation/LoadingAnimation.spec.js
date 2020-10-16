import React from 'react';
import { render } from '@testing-library/react';

import LoadingAnimation from './LoadingAnimation.js';

test('render custom message', async () => {
  const { findByText } = render(
    <LoadingAnimation message="I don't like the aussie loading messages" />
  );

  const message = await findByText(/I don't like the aussie loading messages/i);

  expect(message).toBeInTheDocument();
});
