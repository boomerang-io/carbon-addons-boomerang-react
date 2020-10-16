import React from 'react';
import { storiesOf } from '@storybook/react';
import { Router } from 'react-router-dom';
import FeatureSideNavLink from './FeatureSideNavLink';
import { Rocket16 } from '@carbon/icons-react';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
storiesOf('FeatureSideNavLink', module)
  .add('Default Feature Sidenav Link', () => {
    return (
      <Router history={history}>
        <FeatureSideNavLink to="/test" children="TESTING" />
      </Router>
    );
  })
  .add('Active Feature Sidenav Link', () => {
    return (
      <Router history={history}>
        <FeatureSideNavLink to="/" children="TESTING" />
      </Router>
    );
  })
  .add('Feature Sidenav Link with Icon', () => {
    return (
      <Router history={history}>
        <FeatureSideNavLink
          to="/test"
          children="TESTING"
          iconProps={{ 'data-testid': 'rocket-icon' }}
          icon={Rocket16}
        />
      </Router>
    );
  })
  .add('Feature Sidenav Link with custom content', () => {
    return (
      <Router history={history}>
        <FeatureSideNavLink to="/test">
          <div>
            <p>text1</p>
            <p>text2</p>
          </div>
        </FeatureSideNavLink>
      </Router>
    );
  })
  .add('Feature Sidenav Link with divider', () => {
    return (
      <Router history={history}>
        <FeatureSideNavLink to="/test" children="TESTING" hasDivider />
      </Router>
    );
  });
