import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text, select } from '@storybook/addon-knobs';
import Toggle from './Toggle';

storiesOf('Toggle', module)
  .add('default', () => {
    return (
      <div style={{ width: '16rem' }}>
        <Toggle id="default-toggle" defaultToggled onToggle={action('Toggle clicked')} />
      </div>
    );
  })
  .add('with tooltip and label', () => {
    return (
      <div style={{ width: '16rem' }}>
        <Toggle
          id="tooltip-label-toggle"
          defaultToggled
          onToggle={action('Toggle clicked')}
          labelText="Label for toggle"
          tooltipContent="Tooltip for toggle"
          tooltipProps={{ direction: 'top' }}
          helperText={text('helperText', 'helperText')}
          orientation={select('orienation', ['horizontal', 'vertical'], 'vertical')}
          reversed={boolean('reversed', false)}
        />
      </div>
    );
  });
