import React from 'react';
import { storiesOf } from '@storybook/react';

import { Button } from 'carbon-components-react';

import NotificationsContainer from './NotificationsContainer';
import ToastNotification from './ToastNotification';
import notify from './notify';

storiesOf('Notifications', module).add('default', () => {
  return (
    <div>
      <Button
        onClick={() =>
          notify(
            <ToastNotification subtitle="This happened" title="Something happened" kind="success" />
          )
        }
      >
        Try Me
      </Button>
      <NotificationsContainer />
    </div>
  );
});
