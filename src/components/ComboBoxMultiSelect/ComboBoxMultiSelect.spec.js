import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
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

test('select and remove items', async () => {
  const { getByRole, getByPlaceholderText, getByText, queryByLabelText } = render(
    <ComboBoxMultiSelect {...props} />
  );

  const input = getByPlaceholderText(/select some animals/i);

  fireEvent.click(getByText(/panda/i));
  fireEvent.click(input);
  fireEvent.click(getByText(/cat/i));
  fireEvent.click(input);

  await waitFor(() => {
    expect(queryByLabelText(/Clear filter dog/i)).toBeInTheDocument();
    expect(queryByLabelText(/Clear filter cat/i)).toBeInTheDocument();
  });

  const clearButton = getByRole('button', { name: 'Clear selected item' });
  fireEvent.click(clearButton);
  await waitFor(() => {
    expect(queryByLabelText(/Clear filter panda/i)).not.toBeInTheDocument();
    expect(queryByLabelText(/Clear filter dog/i)).not.toBeInTheDocument();
    expect(queryByLabelText(/Clear filter cat/i)).not.toBeInTheDocument();
  });
});
