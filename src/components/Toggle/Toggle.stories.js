import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, text, select } from '@storybook/addon-knobs';
import Toggle from './Toggle';

export default {
  title: 'Toggle',
};

export const Default = () => {
  return (
    <div style={{ width: '16rem' }}>
      <Toggle id="default-toggle" defaultToggled onToggle={action('Toggle clicked')} />
    </div>
  );
};

Default.story = {
  name: 'default',
};

export const WithTooltipAndLabel = () => {
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
};

WithTooltipAndLabel.story = {
  name: 'with tooltip and label',
};

export const WithInvalidWarning = () => {
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
        invalid
        invalidText="This toggle value is invalid"
      />
    </div>
  );
};

WithInvalidWarning.story = {
  name: 'with invalid warning',
};

export const HorizontalToggle = () => {
  return (
    <div style={{ width: '16rem' }}>
      <Toggle
        id="default-toggle"
        defaultToggled
        onToggle={action('Toggle clicked')}
        labelText="Label for toggle"
        helperText={text('helperText', 'helperText')}
      />
    </div>
  );
};

HorizontalToggle.story = {
  name: 'horizontal toggle',
};
