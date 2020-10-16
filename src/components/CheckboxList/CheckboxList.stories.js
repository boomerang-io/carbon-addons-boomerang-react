import React from 'react';
import { storiesOf } from '@storybook/react';
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

storiesOf('CheckboxList', module)
  .add('default', () => {
    return (
      <CheckboxList
        initialSelectedItems={['panda']}
        onChange={action('checkboxlist changed')}
        options={animals}
      />
    );
  })
  .add('with tooltip and label', () => {
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
  });
