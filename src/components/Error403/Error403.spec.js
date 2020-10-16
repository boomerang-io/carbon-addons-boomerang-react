import React from 'react';
import { render } from '@testing-library/react';
import Error403 from './Error403';

test('render Error403 with defaults', async () => {
  const { getByText } = render(<Error403 />);
  expect(getByText('403 - Access Forbidden')).toBeInTheDocument();
  expect(getByText('You’ve found yourself in deep water.')).toBeInTheDocument();
  expect(
    getByText('You shouldn’t be here - contact the local authorities if you disagree.')
  ).toBeInTheDocument();
});

test('render Error403 without text', async () => {
  const { queryByText } = render(<Error403 header={null} title={null} message={null} />);
  expect(queryByText('403 - Access Forbidden')).not.toBeInTheDocument();
  expect(queryByText('You’ve found yourself in deep water.')).not.toBeInTheDocument();
  expect(
    queryByText('You shouldn’t be here - contact the local authorities if you disagree.')
  ).not.toBeInTheDocument();
});

test('render Error403 with custom text', async () => {
  const { getByText } = render(<Error403 header="hello" title="there" message="sir" />);
  expect(getByText('hello')).toBeInTheDocument();
  expect(getByText('there')).toBeInTheDocument();
  expect(getByText('sir')).toBeInTheDocument();
});
