import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs/react';
import {
  Accordion,
  AccordionItem,
  Button,
  ComboBox,
  Checkbox,
  Dropdown,
  MultiSelect,
  OverflowMenu,
  OverflowMenuItem,
  Search,
  TextInput,
  TextArea,
} from 'carbon-components-react';

import DataTable from './dataTableDefault';
import { comboBoxItems, dropdownOptions, multiSelectOptions } from './propsData';

const Divider = () => <div style={{ margin: '2rem' }} />;

storiesOf('Theming', module).add('default', () => {
  return (
    // dark-theme backgroundColor: '#1c496d'
    // light-theme backgroundColor: '#EAEAEA'
    <div
      style={{
        backgroundColor: select('Background', { Light: '#EAEAEA', Dark: '#1c496d' }, 'Light'),
        padding: '2rem',
      }}
    >
      <Button> Button Text </Button>
      <Button kind="secondary"> Button Text </Button>
      <Button kind="danger"> Button Text </Button>
      <Button kind="tertiary"> Button Text </Button>
      <Divider />
      <Accordion>
        <AccordionItem title="Section 1 title" open={false}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </AccordionItem>
        <AccordionItem title="Section 2 title">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </AccordionItem>
        <AccordionItem title="Section 3 title" />
      </Accordion>
      <Divider />
      <fieldset className="bx--fieldset">
        <legend className="bx--label">Checkbox heading</legend>
        <Checkbox id="checkbox-label-1" />
        <Checkbox id="checkbox-label-2" />
      </fieldset>
      <Divider />
      <TextInput labelText="Test" placeholder="Test" />
      <Divider />
      <TextInput
        labelText="Test"
        helperText="This is required"
        placeholder="Test"
        invalid
        invalidText="Please enter a valid value"
      />
      <Divider />
      <TextArea
        labelText="Test"
        helperText="This is required"
        placeholder="Test"
        invalid
        invalidText="Please enter a valid value"
      />
      <Divider />
      <Search labelText="Test" placeHolderText="Search" />
      <Divider />
      <ComboBox
        titlText="ComboBox"
        invalid
        invalidText="Is required"
        items={comboBoxItems}
        itemToString={(item) => (item ? item.text : '')}
        placeholder="ComboBox"
      />
      <Divider />
      <MultiSelect
        items={multiSelectOptions}
        itemToString={(item) => (item ? item.text : '')}
        label="Multiselect"
      />
      <Divider />
      <Dropdown
        style={{ width: '10rem' }}
        label="Test"
        title="Dropdown"
        items={dropdownOptions}
        itemToString={(item) => (item ? item.text : '')}
      />
      <OverflowMenu>
        <OverflowMenuItem>Test</OverflowMenuItem>
        <OverflowMenuItem>Test</OverflowMenuItem>
      </OverflowMenu>
      <Divider />
      <DataTable />
    </div>
  );
});
