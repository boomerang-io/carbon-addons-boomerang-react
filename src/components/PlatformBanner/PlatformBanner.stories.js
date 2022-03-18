import React from 'react';
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

export default {
  title: 'PlatformBanner',
};

export const Default = () => {
  return <PlatformBanner {...props()} />;
};

Default.story = {
  name: 'default',
};
