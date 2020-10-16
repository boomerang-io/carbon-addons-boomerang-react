import React from 'react';
import { render } from '@testing-library/react';

import TextInput from './TextInput.js';

const mockfn = jest.fn();

const props = {
  id: 'test',
  labelText: 'test',
  onChange: mockfn,
  placeholder: 'placeholder',
  tooltipContent: 'tooltip content',
  helperText: 'helper text',
};

test('render tooltip', () => {
  const { queryByText } = render(<TextInput {...props} />);
  expect(queryByText(/helper text/i)).toBeInTheDocument();
});
