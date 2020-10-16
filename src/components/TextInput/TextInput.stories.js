import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { object, text } from '@storybook/addon-knobs/react';

import TextInput from './TextInput';

storiesOf('TextInput', module)
  .add('default', () => {
    return (
      <TextInput
        id="default-text-input"
        onChange={action('text input change')}
        placeholder={text('placeholder', 'Placeholder')}
        type="text"
      />
    );
  })
  .add('with tooltip, label and helper text', () => {
    return (
      <div style={{ overflow: 'hidden', height: '2rem' }}>
        <TextInput
          id="tooltip-label-text-input"
          onChange={action('text input change')}
          placeholder={text('placeholder', 'Placeholder')}
          helperText={text('helperText', 'Some helper text')}
          labelText={text('labelText', 'Label for text input')}
          tooltipContent={text('tooltipContent', 'Tooltip for text input')}
          tooltipProps={object('tooltipProps', { placement: 'top' })}
        />
      </div>
    );
  });
