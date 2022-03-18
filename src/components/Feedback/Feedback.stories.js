import React from 'react';
import Feedback from './Feedback';

export default {
  title: 'Feedback',
};

export const Default = () => {
  return (
    <>
      <Feedback
        platformName="IBM Boomerang"
        sendIdeasUrl="https://ideas.ibm.com"
        platformOrganization="IBM"
      />
    </>
  );
};

Default.story = {
  name: 'default',
};
