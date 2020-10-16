import React from 'react';
import { render } from '@testing-library/react';

import RadioGroup from './RadioGroup.js';

const mockfn = jest.fn();

const options = [
  { labelText: 'One', value: 'one' },
  { labelText: 'Two', value: 'two' },
];

const props = {
  name: 'test',
  defaultSelected: 'one',
  onChange: mockfn,
  options,
  tooltipContent: 'tooltip content',
  helperText: 'helper text',
  labelText: 'label text',
};

test('render label, helperText, tooltip and options', () => {
  const { queryByText } = render(<RadioGroup {...props} />);
  expect(queryByText(/helper text/i)).toBeInTheDocument();
  expect(queryByText(/label text/i)).toBeInTheDocument();
  expect(queryByText(/One/i)).toBeInTheDocument();
  expect(queryByText(/Two/i)).toBeInTheDocument();
});
