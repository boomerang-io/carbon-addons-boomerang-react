import React from 'react';
//eslint-disable-next-line
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs/react';

import ProtectedRoute from './ProtectedRoute';

const history = createMemoryHistory();

const Component = () => <div>If you see me, then you have authorization to do so.</div>;

storiesOf('ProtectedRoute', module)
  .add('authorized', () => {
    return (
      <Router history={history}>
        <ProtectedRoute
          allowedUserRoles={['admin', 'operator']}
          component={Component}
          path="/"
          userRole={['user', 'operator']}
        />
      </Router>
    );
  })
  .add('not authorized', () => {
    return (
      <Router history={history}>
        <ProtectedRoute
          allowedUserRoles={['admin', 'operator']}
          component={Component}
          path="/"
          userRole="user"
        />
      </Router>
    );
  })
  .add('with custom message', () => {
    return (
      <Router history={history}>
        <ProtectedRoute
          allowedUserRoles={['admin', 'operator']}
          component={Component}
          path="/"
          title={text('title', 'custom title')}
          subtitle={text('subtitle', 'custom subtitle')}
          userRole="user"
        />
      </Router>
    );
  });
