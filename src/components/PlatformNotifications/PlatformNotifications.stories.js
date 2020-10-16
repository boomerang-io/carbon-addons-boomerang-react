import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs/react';

import PlatformNotificationsContainer from './index';

// const mockSocketUrl = 'http://localhost:7750/notifications/ws';
const mockSocketUrl = 'https://www.google.com/notifications/ws';

storiesOf('PlatformNotifications', module).add('default', () => {
  return (
    <PlatformNotificationsContainer
      initialNotifications={[
        {
          id: 'testId',
          creator: 'launchpad',
          title: 'Maintenance Scheduled for a long long long long time',
          detail:
            'Launchpad is scheduled for maintenance on January 8 from 2am-3am for a long long long time',
          date: 1555079172156,
          type: 'exception',
        },
      ]}
      config={{
        wsUrl: mockSocketUrl,
      }}
      isNotificationActive={boolean('isNotificationActive', true)}
      setHasNewNotifications={action('setHasNewNotifications')}
    />
  );
});
