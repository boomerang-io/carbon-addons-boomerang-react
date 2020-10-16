import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text } from '@storybook/addon-knobs';

import PlatformBanner from './PlatformBanner';

const props = () => ({
  kind: select(
    'kind',
    { error: 'error', info: 'info', success: 'success', warning: 'warning' },
    'info'
  ),
  message: text('message', 'Message'),
  title: text('title', 'Title'),
});

storiesOf('PlatformBanner', module).add('default', () => {
  return <PlatformBanner {...props()} />;
});
