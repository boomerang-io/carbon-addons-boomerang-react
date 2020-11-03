import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs/react';

import Creatable from './Creatable';

storiesOf('Creatable', module)
  .add('default', () => {
    return (
      <div style={{ width: '25rem' }}>
        <Creatable
          id="text-input-creatable"
          labelText={text('labelText', 'Creatable')}
          onChange={action('creatable change')}
          helperText="Test helperText"
          placeholder={text('placeholder', 'Create some values')}
          type="text"
        />
      </div>
    );
  })
  .add('key value pair', () => {
    return (
      <div style={{ width: '25rem' }}>
        <Creatable
          createKeyValuePair
          id="key-value-creatable"
          keyLabelText={text('keyLabelText', 'Creatable Key')}
          valueLabelText={text('valueLabelText', 'Creatable Value')}
          onChange={action('creatable change')}
          keyPlaceholder={text('keyPlaceholder', 'Key')}
          valuePlaceholder={text('valuePlaceholder', 'Value')}
          keyHelperText={text('keyHelperText', 'Key Helper')}
          valueHelperText={text('valueHelperText', 'Value Helper')}
          type="text"
        />
      </div>
    );
  })
  .add('with tooltip and helper text', () => {
    return (
      <Creatable
        id="tooltip-creatable"
        helperText="Example helper text for creatable"
        labelText={text('labelText', 'Controlled Creatable')}
        placeholder={text('placeholder', 'Create some values')}
        onChange={action('creatable change')}
        type="text"
        tooltipContent={text('tooltipContent', 'Tooltip for creatable')}
        tooltipProps={{ direction: 'top' }}
      />
    );
  });
