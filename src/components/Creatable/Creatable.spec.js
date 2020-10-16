import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Creatable from './Creatable.js';

const mockfn = jest.fn();

const singleProps = {
  id: 'test',
  keyLabel: 'one',
  onChange: mockfn,
  placeholder: 'placeholder',
  type: 'text',
  tooltipContent: 'tooltip content',
};

const pairProps = {
  createKeyValuePair: true,
  id: 'test',
  keyLabel: 'one',
  valueLabel: 'two',
  onChange: mockfn,
  keyPlaceholder: 'keyplaceholder',
  valuePlaceholder: 'valueplaceholder',
  type: 'text',
};

test('create values', () => {
  const { getByPlaceholderText, getByText, queryByText } = render(<Creatable {...singleProps} />);
  expect(queryByText(/panda/i)).not.toBeInTheDocument();
  expect(queryByText(/dog/i)).not.toBeInTheDocument();

  const input = getByPlaceholderText(/placeholder/i);
  const addButton = getByText(/add/i);

  fireEvent.change(input, { target: { value: 'panda' } });
  fireEvent.click(addButton);
  fireEvent.change(input, { target: { value: 'dog' } });
  fireEvent.click(addButton);

  expect(queryByText(/panda/i)).toBeInTheDocument();
  expect(queryByText(/dog/i)).toBeInTheDocument();
});

test('render key value pair', () => {
  const { getByPlaceholderText } = render(<Creatable {...pairProps} />);

  expect(getByPlaceholderText(/keyplaceholder/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/valueplaceholder/i)).toBeInTheDocument();
});
