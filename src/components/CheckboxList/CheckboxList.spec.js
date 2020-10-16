import React from 'react';
import { render } from '@testing-library/react';

import CheckboxList from './CheckboxList.js';

const mockfn = jest.fn();

const animals = [
  { labelText: 'Cat', id: 'cat' },
  { labelText: 'Dog', id: 'dog' },
  { labelText: 'Panda', id: 'panda' },
];

const props = {
  id: 'test',
  options: animals,
  helperText: 'helper text',
  onChange: mockfn,
  labelText: 'label text',
  tooltipContent: 'tooltip content',
};

test('render label, helperText, tooltip and options', () => {
  const { queryByText } = render(<CheckboxList {...props} />);
  expect(queryByText(/helper text/i)).toBeInTheDocument();
  expect(queryByText(/label text/i)).toBeInTheDocument();
  expect(queryByText(/cat/i)).toBeInTheDocument();
  expect(queryByText(/dog/i)).toBeInTheDocument();
  expect(queryByText(/panda/i)).toBeInTheDocument();
});
