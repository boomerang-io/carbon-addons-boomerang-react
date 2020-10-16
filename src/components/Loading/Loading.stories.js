import React from 'react';
import { storiesOf } from '@storybook/react';

import Loading from './Loading';

storiesOf('Loading', module)
  .add('default', () => {
    return <Loading />;
  })
  .add('delay render after 2 seconds', () => {
    return <Loading delay={2000} />;
  })
  .add('without overlay', () => {
    return <Loading withOverlay={false} />;
  });
