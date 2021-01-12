import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { object, text } from '@storybook/addon-knobs/react';

import DateInput from './DateInput';

storiesOf('DateInput', module)
  .add('default', () => {
    return (
      <DateInput
        id="default-date-input"
        onCalendarChange={action('date input calendar change')}
        onChange={action('date input change')}
        placeholder={text('placeholder', 'yyyy-mm-dd')}
        autoComplete='off'
        dateFormat='Y-m-d'
        max='2020-01-31T13:10:20.219+00:00'
        min='2020-01-01T13:10:20.219+00:00'
      />
    );
  })
  .add('with tooltip, label and helper text', () => {
    return (
      <div style={{ height: '5rem' }}>
        <DateInput
          id="tooltip-label-date-input"
          onCalendarChange={action('date input calendar change')}
          onChange={action('date input change')}
          placeholder={text('placeholder', 'mm/dd/yyyy')}
          autoComplete='off'
          helperText={text('helperText', 'Some helper text')}
          labelText={text('labelText', 'Label for text input')}
          tooltipContent={text('tooltipContent', 'Tooltip for text input')}
          tooltipProps={object('tooltipProps', { placement: 'top' })}
        />
      </div>
    );
  });
