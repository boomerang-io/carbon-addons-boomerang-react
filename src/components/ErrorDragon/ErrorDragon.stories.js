import React from 'react';

import ErrorDragonComponent from './index';

const statusUrl = '/status';

export default {
  title: 'ErrorDragon',
};

export const Default = () => {
  return <ErrorDragonComponent statusUrl={statusUrl} />;
};

Default.story = {
  name: 'default',
};
