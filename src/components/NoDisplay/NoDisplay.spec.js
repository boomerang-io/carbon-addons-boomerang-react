import React from 'react';
import { render } from '@testing-library/react';

import NoDisplay from './NoDisplay';

test('render NoDisplay with Message', async () => {
  const { findByText } = render(<NoDisplay text="Looks like you need to add some repos." />);
  const message = await findByText(/Looks like you need to add some repos./i);

  expect(message).toBeInTheDocument();
});
