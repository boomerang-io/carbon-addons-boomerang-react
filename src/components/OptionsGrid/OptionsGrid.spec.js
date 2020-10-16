import React from 'react';
import { render } from '@testing-library/react';

import OptionsGrid from './OptionsGrid';

const mockfn = jest.fn();
const data = [
  { id: '0', name: 'data1' },
  { id: '1', name: 'data2' },
];
const columns = 2;
const selectedItems = [];

test('render OptionsGrid', async () => {
  const { findByText } = render(
    <OptionsGrid onSelect={mockfn} data={data} columns={columns} selectedItems={selectedItems} />
  );
  const firstOption = await findByText(/data1/i);

  expect(firstOption).toBeInTheDocument();

  const SecondOption = await findByText(/data2/i);

  expect(SecondOption).toBeInTheDocument();
});
