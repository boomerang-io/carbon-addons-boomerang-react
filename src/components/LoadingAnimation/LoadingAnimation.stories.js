import React from 'react';

import LoadingAnimation from './LoadingAnimation';

export default {
  title: 'LoadingAnimation',
};

export const Default = () => {
  return <LoadingAnimation />;
};

Default.story = {
  name: 'default',
};

export const CustomMessage = () => {
  return <LoadingAnimation message="I don't like the aussie loading messages" />;
};

CustomMessage.story = {
  name: 'custom message',
};

export const RenderAfter2Seconds = () => {
  return <LoadingAnimation wait={2000} />;
};

RenderAfter2Seconds.story = {
  name: 'render after 2 seconds',
};

export const Centered = () => {
  return <LoadingAnimation centered />;
};

Centered.story = {
  name: 'centered',
};
