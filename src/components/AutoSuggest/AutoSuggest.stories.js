import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs/react';

import TextInput from '../TextInput';

import AutoSuggest from './AutoSuggest';

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

storiesOf('AutoSuggest', module).add('default', () => {
  return (
    <div style={{ width: '25rem' }}>
      <AutoSuggest
        autoSuggestions={animals}
        inputProps={{
          id: text('id', 'auto-suggest'),
          placeholder: text('placeholder', 'Type an animal'),
          labelText: text('labelText', 'Animal'),
        }}
        onChange={action('Auto suggest change')}
      >
        <TextInput />
      </AutoSuggest>
    </div>
  );
});
