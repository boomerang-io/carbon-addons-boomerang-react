import React from 'react';
import { storiesOf } from '@storybook/react';
import Feedback from './Feedback';

storiesOf('Feedback', module).add('default', () => {
  return (
    <>
      <Feedback
        platformName="IBM Boomerang"
        sendIdeasUrl="https://ideas.ibm.com"
        platformOrganization="IBM"
      />
    </>
  );
});
