import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { Help16, ThumbsUp16, ThumbsDown16 } from '@carbon/icons-react';

import DecisionButtons from './DecisionButtons';

const items1 = [
  { label: 'Radiooooooooooo 1', value: 'radio 1' },
  { label: 'Radio 2', value: 'radio 2' },
];

const items2 = [
  { icon: ThumbsUp16, label: 'Yes', type: 'positive', value: 'yes' },
  { icon: ThumbsDown16, label: 'No', type: 'negative', value: 'no' },
  { icon: Help16, label: 'Maybe', value: 'maybe' },
];

function ExternallyControlledDecisionButtons() {
  const [selectedItem, setSelectedItem] = React.useState('');
  const handleClear = () => {
    setSelectedItem('');
  };
  return (
    <>
      <DecisionButtons
        selectedItem={selectedItem}
        name="radio buttons 3"
        onChange={(value) => setSelectedItem(value)}
        orientation="vertical"
        items={items1}
      />
      <button onClick={handleClear}>Clear selection</button>
    </>
  );
}

storiesOf('DecisionButtons', module)
  .add('default and vertical', () => {
    return (
      <DecisionButtons
        defaultSelected="radio 2"
        name="radio buttons 1"
        onChange={action('Change radio button')}
        labelText={text('labelText', 'Example label text')}
        helperText={text('helperText', 'Example helper text')}
        items={items1}
        orientation="vertical"
        tooltipContent={text('tooltipContent', 'Tooltip for DecisionButtons')}
        tooltipProps={{ direction: 'right' }}
      />
    );
  })
  .add('with positive and negative buttons and horizontal', () => {
    return (
      <DecisionButtons
        defaultSelected="no"
        name="radio buttons 2"
        onChange={action('Change radio button')}
        orientation="horizontal"
        items={items2}
      />
    );
  })
  .add('externallyControlled', () => {
    return <ExternallyControlledDecisionButtons />;
  })
  .add('can uncheck buttons', () => {
    return (
      <DecisionButtons
        canUncheck
        name="radio buttons 4"
        onChange={action('Change radio button')}
        orientation="horizontal"
        items={items2}
      />
    );
  });
