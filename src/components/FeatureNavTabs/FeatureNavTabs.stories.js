import React from 'react';
import { storiesOf } from '@storybook/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { default as Tabs } from './index';
import { default as Tab } from '../FeatureNavTab';

storiesOf('FeatureNavTabs', module)
  .add('default', () => {
    return (
      <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
        <Tabs>
          <Tab label="Services" to="/services" />
          <Tab label="Members" to="/members" />
          <Tab label="Service Requests" to="/service-requests" />
          <Tab label="Members Requests" to="/members-requests" />
          <Tab label="Settings" to="/settings" />
        </Tabs>
      </Router>
    );
  })
  .add('loading', () => {
    return (
      <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
        <Tabs>
          <Tab label="Services" to="/services" isLoading />
          <Tab label="Members" to="/members" />
          <Tab label="Service Requests" to="/service-requests" />
          <Tab label="Members Requests" to="/members-requests" isLoading />
          <Tab label="Settings" to="/settings" />
        </Tabs>
      </Router>
    );
  });
