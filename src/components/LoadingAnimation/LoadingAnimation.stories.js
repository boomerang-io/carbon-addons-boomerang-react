import React from 'react';
import { storiesOf } from '@storybook/react';

import LoadingAnimation from './LoadingAnimation';

storiesOf('LoadingAnimation', module)
  .add('default', () => {
    return <LoadingAnimation />;
  })
  .add('custom message', () => {
    return <LoadingAnimation message="I don't like the aussie loading messages" />;
  })
  .add('render after 2 seconds', () => {
    return <LoadingAnimation wait={2000} />;
  })
  .add('centered', () => {
    return <LoadingAnimation centered />;
  });
