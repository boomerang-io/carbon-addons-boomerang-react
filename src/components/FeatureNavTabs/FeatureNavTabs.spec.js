import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import FeatureNavTab from '../FeatureNavTab';
import FeatureNavTabs from './index.js';

const history = createMemoryHistory();

test('render feature nav tabs', () => {
  const { queryByText } = render(
    <Router history={history}>
      <FeatureNavTabs>
        <FeatureNavTab label="Polar Bear" to="/polar-bear" />
        <FeatureNavTab label="Bee" to="/bee" />
      </FeatureNavTabs>
    </Router>
  );
  expect(queryByText(/Polar Bear/i)).toBeInTheDocument();
  expect(queryByText(/Bee/i)).toBeInTheDocument();
});
