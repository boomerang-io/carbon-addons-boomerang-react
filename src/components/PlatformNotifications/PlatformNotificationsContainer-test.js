import React from 'react';
import { shallow } from 'enzyme';
import { action } from '@storybook/addon-actions';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Server } from 'mock-socket';
import { getTime, subDays } from 'date-fns';

import PlatformNotificationsContainer from './PlatformNotificationsContainer';

const mockSocketUrl = 'ws://localhost:8081/ws';
const mockServer = new Server(mockSocketUrl);
const notificationsObj = {
  notifications: [
    {
      id: 'testID1',
      location: 'Launchpad',
      title: 'Maintenance Scheduled for a long long long long time',
      detail:
        'Launchpad is scheduled for maintenance on January 8 from 2am-3am for a long long long time',
      date: '1551300716020',
      type: 'exception',
    },
  ],
};

const mockEndptURL = 'http://localhost:8000/notifications';
const mock = new MockAdapter(axios);
mock.onPut(mockEndptURL).reply(200, {});

mockServer.on('connection', (socket) => {
  socket.on('message', () => {
    setInterval(() => {
      notificationsObj.notifications[0].id = Math.round(Math.random() * 100000000); // Change for each one
      notificationsObj.notifications[0].date = getTime(
        subDays(new Date(), Math.round(Math.random() * 10))
      );
      socket.send(JSON.stringify(notificationsObj));
    }, 10000);
  });
});

describe('Default Notification Container', () => {
  describe('Renders as expected', () => {
    const wrapper = shallow(
      <PlatformNotificationsContainer
        config={{
          wsUrl: 'ws://localhost:8081/ws',
          httpUrl: 'http://localhost:8000/notifications',
        }}
        isNotificationActive
        setHasNewNotifications={action('setHasNewNotifications')}
      />
    );
    it('Should Render at top level', () => {
      expect(wrapper.hasClass('bx--bmrg-notifications')).toEqual(true);
    });
  });
});
