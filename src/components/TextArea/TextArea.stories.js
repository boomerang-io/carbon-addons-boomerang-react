import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { object, text } from '@storybook/addon-knobs/react';

import TextArea from './TextArea';

storiesOf('TextArea', module)
  .add('default', () => {
    return (
      <TextArea
        id="default-text-area"
        onChange={action('text area change')}
        placeholder={text('placeholder', 'Placeholder')}
        style={object('style', { resize: 'none' })}
        type="text"
      />
    );
  })
  .add('with tooltip, label and helper text', () => {
    return (
      <TextArea
        id="tooltip-label-text-area"
        onChange={action('text area change')}
        placeholder={text('placeholder', 'Placeholder')}
        style={{ resize: 'none' }}
        helperText={text('helperText', 'Some helper text')}
        labelText={text('labelText', 'Label for text area')}
        tooltipContent={text('tooltipText', 'Tooltip for text area')}
        tooltipProps={object('tooltipProps', { direction: 'top' })}
      />
    );
  });
