import React from 'react';
import { storiesOf } from '@storybook/react';

import ContactUs from './ContactUs';

storiesOf('Contact Us', module).add('default', () => {
  return <ContactUs />;
});
