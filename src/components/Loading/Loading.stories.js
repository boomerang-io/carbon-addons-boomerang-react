import React from 'react';

import Loading from './Loading';

export default {
  title: 'Loading',
};

export const Default = () => {
  return <Loading />;
};

Default.story = {
  name: 'default',
};

export const DelayRenderAfter2Seconds = () => {
  return <Loading delay={2000} />;
};

DelayRenderAfter2Seconds.story = {
  name: 'delay render after 2 seconds',
};

export const WithoutOverlay = () => {
  return <Loading withOverlay={false} />;
};

WithoutOverlay.story = {
  name: 'without overlay',
};
