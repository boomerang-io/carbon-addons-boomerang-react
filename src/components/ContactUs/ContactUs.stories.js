import React from 'react';
import { storiesOf } from '@storybook/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ContactUs from './ContactUs';
import NotificationsContainer from '../Notifications/NotificationsContainer';

const mock = new MockAdapter(axios);
mock.onPost(`https://ibm.com/support/contact`).reply(200);

storiesOf('Contact Us', module).add('default', () => {
  return (
    <>
      <ContactUs baseServiceUrl="https://ibm.com" />
      <NotificationsContainer />
    </>
  );
});
