import React from 'react';
import { storiesOf } from '@storybook/react';

// import axios from 'axios';
import ReportBug from './ReportBug';

storiesOf('Report Bug', module).add(
  'default',
  () => {
    return <ReportBug />;
  },
  {
    info: {
      text: `
Report bug feature is for reporting platform issues.
          `,
    },
  }
);
