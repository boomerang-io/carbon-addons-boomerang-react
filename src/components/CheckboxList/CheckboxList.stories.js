import React from 'react';
import { action } from '@storybook/addon-actions';

import CheckboxList from './CheckboxList';

const animals = [
  { labelText: 'Cat', id: 'cat' },
  { labelText: 'Dog', id: 'dog' },
  { labelText: 'Panda', id: 'panda' },
];

const animals2 = [
  { labelText: 'Parrot', id: 'parrot' },
  { labelText: 'Peacock', id: 'peacock' },
  { labelText: 'Penguin', id: 'penguin' },
];

export default {
  title: 'CheckboxList',
};

export const Default = () => {
  return (
    <CheckboxList
      initialSelectedItems={['panda']}
      onChange={action('checkboxlist changed')}
      options={animals}
    />
  );
};

Default.story = {
  name: 'default',
};

export const WithTooltipAndLabel = () => {
  return (
    <CheckboxList
      helperText="Testing this"
      initialSelectedItems={['peacock']}
      labelText="Select some animals"
      onChange={() => {}}
      options={animals2}
      tooltipContent="Tooltip for checkbox"
      tooltipProps={{ direction: 'top' }}
    />
  );
};

WithTooltipAndLabel.story = {
  name: 'with tooltip and label',
};
