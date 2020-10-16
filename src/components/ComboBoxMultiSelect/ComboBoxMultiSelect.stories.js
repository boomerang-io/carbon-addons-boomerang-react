import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { object, text } from '@storybook/addon-knobs/react';

import MultiSelect from './ComboBoxMultiSelect';

const animals = [
  { label: 'Caribou', value: 'caribou' },
  { label: 'Cat', value: 'cat' },
  { label: 'Catfish', value: 'catfish' },
  { label: 'Cheetah', value: 'cheetah' },
  { label: 'Chipmunk', value: 'chipmunk' },
  { label: 'Dog', value: 'dog' },
  { label: 'Dolphin', value: 'dolphin' },
  { label: 'Dove', value: 'dove' },
  { label: 'Panda', value: 'panda' },
  { label: 'Parrot', value: 'parrot' },
  { label: 'Peacock', value: 'peacock' },
  { label: 'Penguim', value: 'penguim' },
];

const initialDefaultAnimals = [
  { label: 'Panda', value: 'panda' },
  { label: 'Dog', value: 'dog' },
];

storiesOf('ComboBoxMultiSelect', module)
  .add('default', () => {
    return (
      <div style={{ width: '25rem' }}>
        <MultiSelect
          id="multi-select"
          initialSelectedItems={initialDefaultAnimals}
          items={object('items', animals)}
          itemToString={(item) => item.label}
          onChange={action('Multiselect changed')}
          titleText={text('titleText', 'Select some animals')}
          placeholder={text('placeholder', 'Select an animal')}
        />
      </div>
    );
  })
  .add('No selected items', () => {
    return (
      <div style={{ width: '25rem' }}>
        <MultiSelect
          id="multi-select"
          items={object('items', animals)}
          itemToString={(item) => item.label}
          onChange={action('Multiselect changed')}
          titleText={text('titleText', 'Select some animals')}
          placeholder={text('placeholder', 'Select an animal')}
        />
      </div>
    );
  })
  .add('with tooltip, title, helper text and disabled clear', () => {
    return (
      <div style={{ width: '25rem' }}>
        <MultiSelect
          disableClear
          id="tooltip-title-multi-select"
          initialSelectedItems={[
            { label: 'Cat', value: 'cat' },
            { label: 'Cheetah', value: 'cheetah' },
          ]}
          items={object('items', animals)}
          itemToString={(item) => item.label}
          onChange={action('Multiselect changed')}
          titleText={text('titleText', 'Select some animals')}
          placeholder={text('placeholder', 'Select an animal')}
          helperText={text('helperText', 'Some helper text')}
          tooltipContent={text('tooltipContent', 'Tooltip for multiSelect')}
          tooltipProps={{ direction: 'top' }}
        />
      </div>
    );
  });
