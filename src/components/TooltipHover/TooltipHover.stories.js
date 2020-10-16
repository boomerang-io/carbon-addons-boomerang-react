import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text } from '@storybook/addon-knobs/react';
import TooltipHover from './TooltipHover';

storiesOf('TooltipHover', module).add('default', () => {
  return (
    <TooltipHover
      tooltipContent={text('content | tooltipContent | tooltipText  ', 'some nice words here')}
      direction={select(
        'direction',
        { top: 'top', bottom: 'bottom', left: 'left', right: 'right', auto: 'auto' },
        'top'
      )}
      align={select('align', { 'default (no value)': null, start: 'start', end: 'end' })}
    >
      <button>Hover me!</button>
    </TooltipHover>
  );
});
