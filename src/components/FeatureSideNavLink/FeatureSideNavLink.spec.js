import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import FeatureSideNavLink from '.';
import { createBrowserHistory } from 'history';
import { Rocket16 } from '@carbon/icons-react';

const history = createBrowserHistory();
test('render FeatureSideNavLink with correct class', async () => {
  const { container, getByText } = render(
    <Router history={history}>
      <FeatureSideNavLink to="/testlink">Test Link</FeatureSideNavLink>
    </Router>
  );
  expect(container.firstChild).toHaveClass('bx--bmrg-feature-sidenav-link');
  expect(getByText('Test Link')).toHaveClass('bx--bmrg-feature-sidenav-link-content');
});

test('render FeatureSideNavLink with Divider', async () => {
  const { container, getByText } = render(
    <Router history={history}>
      <FeatureSideNavLink to="/testlink" hasDivider>
        Test Link
      </FeatureSideNavLink>
    </Router>
  );
  expect(container.lastChild).toHaveClass('bx--bmrg-feature-sidenav-link-divider');
});

test('render FeatureSideNavLink with Icon', async () => {
  const { container, getByTestId } = render(
    <Router history={history}>
      <FeatureSideNavLink
        to="/testlink"
        icon={Rocket16}
        iconProps={{ 'data-testid': 'rocket-icon' }}
        hasDivider
      >
        Test Link
      </FeatureSideNavLink>
    </Router>
  );
  expect(getByTestId('rocket-icon')).toBeInTheDocument();
});
