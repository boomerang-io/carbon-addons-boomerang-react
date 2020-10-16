import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import FeatureNavTab from './index.js';

const history = createMemoryHistory();

const props = {
  label: 'Red Panda',
  to: '/test',
};

test('render feature nav tab', () => {
  const { queryByText } = render(
    <Router history={history}>
      <FeatureNavTab {...props} />
    </Router>
  );
  expect(queryByText(/Red Panda/i)).toBeInTheDocument();
});
