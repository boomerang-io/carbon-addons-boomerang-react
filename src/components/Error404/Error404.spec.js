import React from 'react';
import { render } from '@testing-library/react';

import Error404 from './Error404';

test('render Error404 with defaults', async () => {
  const { getByText } = render(<Error404 />);
  expect(getByText('404 - Page Not Found')).toBeInTheDocument();
  expect(getByText('Crikey. Something seems to have swam off with this page.')).toBeInTheDocument();
  expect(getByText('Try refreshing, or contact the local authorities.')).toBeInTheDocument();
});

test('render Error404 without text', async () => {
  const { queryByText } = render(<Error404 header={null} title={null} message={null} />);
  expect(queryByText('403 - Access Forbidden')).not.toBeInTheDocument();
  expect(queryByText('You’ve found yourself in deep water.')).not.toBeInTheDocument();
  expect(
    queryByText('You shouldn’t be here - contact the local authorities if you disagree.')
  ).not.toBeInTheDocument();
});

test('render Error404 with custom text', async () => {
  const { getByText } = render(<Error404 header="hello" title="there" message="sir" />);
  expect(getByText('hello')).toBeInTheDocument();
  expect(getByText('there')).toBeInTheDocument();
  expect(getByText('sir')).toBeInTheDocument();
});
