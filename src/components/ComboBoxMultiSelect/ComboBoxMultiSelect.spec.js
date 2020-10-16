import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ComboBoxMultiSelect from './ComboBoxMultiSelect.js';

const mockfn = jest.fn();

const animals = [
  { label: 'Cat', value: 'cat' },
  { label: 'Dog', value: 'dog' },
  { label: 'Panda', value: 'panda' },
];

const initialDefaultAnimals = [
  { label: 'Panda', value: 'panda' },
  { label: 'Dog', value: 'dog' },
];

const props = {
  id: 'test',
  initialSelectedItems: initialDefaultAnimals,
  items: animals,
  itemToString: (item) => item.label,
  helperText: 'helper text',
  onChange: mockfn,
  placeholder: 'select some animals',
  titleText: 'label text',
  tooltipContent: 'tooltip content',
};

test('render label, helperText and tooltip', () => {
  const { queryByText } = render(<ComboBoxMultiSelect {...props} />);
  expect(queryByText(/helper text/i)).toBeInTheDocument();
  expect(queryByText(/label text/i)).toBeInTheDocument();
});

test('select and remove items', () => {
  const { container, getByPlaceholderText, getByText, queryByText } = render(
    <ComboBoxMultiSelect {...props} />
  );
  expect(queryByText(/panda/i)).toBeInTheDocument();
  expect(queryByText(/dog/i)).toBeInTheDocument();
  expect(queryByText(/cat/i)).not.toBeInTheDocument();

  const input = getByPlaceholderText(/select some animals/i);

  fireEvent.click(getByText(/dog/i));
  fireEvent.click(input);
  fireEvent.click(getByText(/cat/i));
  fireEvent.click(input);

  expect(queryByText(/panda/i)).toBeInTheDocument();
  expect(queryByText(/dog/i)).not.toBeInTheDocument();
  expect(queryByText(/cat/i)).toBeInTheDocument();

  const clearButton = container.querySelector('.bx--list-box__selection');
  fireEvent.click(clearButton);

  expect(queryByText(/panda/i)).not.toBeInTheDocument();
  expect(queryByText(/dog/i)).not.toBeInTheDocument();
  expect(queryByText(/cat/i)).not.toBeInTheDocument();
});
