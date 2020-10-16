import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ComboBox from './index';

const items = [
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

const ComboBoxExternallyControlled = () => {
  const [selectedItem, setSelectedItem] = React.useState([]);

  return (
    <ComboBox
      onChange={() => setSelectedItem({ label: 'Penguim', value: 'penguim' })}
      id="select-default"
      items={items}
      placeholder="Search for something"
      titleText="Should always select penguim"
      selectedItem={selectedItem}
    />
  )
}

storiesOf('ComboBox', module)
  .add('default', () => {
    return (
      <div style={{ width: '25rem' }}>
        <ComboBox
          onChange={action('select change')}
          id="select-default"
          items={items}
          placeholder="Search for something"
          titleText="Should filter item"
          helperText="Default behavior"
        />
      </div>
    );
  })
  .add('without filter', () => {
    return (
      <div style={{ width: '25rem' }}>
        <ComboBox
          onChange={action('select change')}
          id="select-filter"
          items={items}
          placeholder="Select something"
          titleText="Should filter item"
          shouldFilterItem={false}
        />
      </div>
    );
  })
  .add('with tooltip, helper text and disabled clear', () => {
    return (
      <div style={{ width: '25rem' }}>
        <ComboBox
          disableClear
          onChange={action('select change')}
          id="select-tooltip-helper"
          items={items}
          placeholder="Search for something"
          titleText="Should filter item"
          helperText="My items are filtered internally"
          shouldFilterItem={({ item, inputValue }) =>
            item.label.toLowerCase().includes(inputValue.toLowerCase())
          }
          tooltipContent="Tooltip for select"
          tooltipProps={{ direction: 'top' }}
        />
      </div>
    );
  })
  .add('with itemToElement', () => {
    return (
      <div style={{ width: '25rem' }}>
        <ComboBox
          disableClear
          onChange={action('select change')}
          id="select-tooltip-helper"
          items={items}
          placeholder="Search for something"
          titleText="Should filter item"
          helperText="My items are filtered internally"
          shouldFilterItem={({ item, inputValue }) =>
            item.label.toLowerCase().includes(inputValue.toLowerCase())
          }
          itemToElement={(item) => item.value + ' test'}
          tooltipContent="Tooltip for select"
          tooltipProps={{ direction: 'top' }}
        />
      </div>
    );
  }).add('with menu opening upwards', () => {
    return (
      <div style={{ width: '25rem', height: '30rem', display: 'flex', alignItems: 'flex-end' }}>
        <ComboBox
          onChange={action('select change')}
          id="select-default"
          items={items}
          placeholder="Search for something"
          titleText="Menu should open upwards"
          direction="top"
        />
      </div>
    );
  }).add('with external control', () => {
    return (
      <div style={{ width: '25rem' }}>
        <ComboBoxExternallyControlled />
      </div>
    );
  });
