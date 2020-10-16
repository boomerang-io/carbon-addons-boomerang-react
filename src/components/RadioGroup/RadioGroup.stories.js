import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';

import RadioGroup from './RadioGroup';

const options1 = [
  { labelText: 'Radio 1', value: 'radio 1 value' },
  { labelText: 'Radio 2', value: 'radio 2 value' },
];
const options2 = [
  { labelText: 'Radio 3', value: 'radio 3 value' },
  { labelText: 'Radio 4', value: 'radio 4 value' },
];

storiesOf('RadioGroup', module)
  .add('default and vertical', () => {
    return (
      <RadioGroup
        id="test"
        defaultSelected={text('defaultSelected', 'default value')}
        name={text('name', 'Radio group 1')}
        onChange={action('radio changed')}
        options={options1}
        orientation="horizontal"
      />
    );
  })
  .add('with tooltip and label and horizontal', () => {
    return (
      <RadioGroup
        id="test"
        defaultSelected={text('defaultSelected', 'default value')}
        labelText={text('labelText', 'Select a value')}
        helperText="test"
        name={text('name', 'Radio group 2')}
        onChange={() => {}}
        options={options2}
        orientation="vertical"
        tooltipContent={text('tooltipContent', 'Tooltip for radioGroup')}
        tooltipProps={{ direction: 'right' }}
      />
    );
  });
