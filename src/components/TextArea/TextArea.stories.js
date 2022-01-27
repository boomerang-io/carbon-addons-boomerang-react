import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { object, text } from '@storybook/addon-knobs';

import TextArea from './TextArea';

const ExternallyControlledTextArea = (props) => {
  const [value, setValue] = React.useState(null);

  return (
    <TextArea
      {...props}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      value={value}
    />
  );
};

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
  })
  .add('with max input length', () => {
    return (
      <ExternallyControlledTextArea
        id="max-length-label-text-area"
        placeholder={text('placeholder', 'Placeholder')}
        style={{ resize: 'none' }}
        labelText={text('labelText', 'Label for text area')}
        max={200}
      />
    );
  });
