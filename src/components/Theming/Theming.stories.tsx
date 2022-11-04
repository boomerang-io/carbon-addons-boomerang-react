import React from "react";
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
} from "@carbon/react";

import DataTable from "./dataTableDefault";
import { comboBoxItems, dropdownOptions, multiSelectOptions } from "./propsData";

const Divider = () => <div style={{ margin: "2rem" }} />;

export default {
  title: "Playground/Theming",
  parameters: {
    docs: {
      description: {
        component: "See how a select set of Carbon components look using different themes",
      },
    },
  },
};

export const Default = () => {
  return (
    <div
      style={{
        padding: "2rem",
        background: "var(--cds-background)",
      }}
    >
      <Button>Carbon</Button>
      <Button kind="secondary">Carbon</Button>
      <Button kind="danger">Carbon</Button>
      <Button kind="tertiary">Carbon</Button>
      <Divider />
      <Accordion>
        <AccordionItem title="Section 1 title" open={false}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
        </AccordionItem>
        <AccordionItem title="Section 2 title">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
        </AccordionItem>
        <AccordionItem title="Section 3 title" />
      </Accordion>
      <Divider />
      <fieldset className="cds--fieldset">
        <legend className="cds--label">Boomerang</legend>
        <Checkbox id="checkbox-label-1" labelText="Carbon" />
        <Checkbox id="checkbox-label-2" labelText="Boomerang" />
      </fieldset>
      <Divider />
      <TextInput labelText="Library" placeholder="e.g. Boomerang" />
      <Divider />
      <TextInput
        labelText="Library"
        helperText="This is required"
        placeholder="e.g. Carbon"
        invalid
        invalidText="Please enter a valid value"
      />
      <Divider />
      <TextArea
        labelText="Thoughts on Phenomenology"
        helperText="What do you think"
        placeholder="e.g. I'm not quite sure..."
        invalid
        invalidText="Please enter a valid value"
      />
      <Divider />
      <Search labelText="Libraries" placeholder="e.g Carbon" />
      <Divider />
      <ComboBox
        titlText="Libraries"
        invalid
        invalidText="It is required"
        items={comboBoxItems}
        itemToString={(item: any) => item ? item.text : ""}
        placeholder="e.g. Boomerang"
      />
      <Divider />
      <MultiSelect items={multiSelectOptions} itemToString={(item: any) => item ? item.text : ""} label="Multiselect" />
      <Divider />
      <Dropdown
        style={{ width: "10rem", marginBottom: "1rem" }}
        label="Test"
        title="Dropdown"
        items={dropdownOptions}
        itemToString={(item: any) => item ? item.text : ""}
      />
      <OverflowMenu>
        <OverflowMenuItem itemText="Carbon" />
        <OverflowMenuItem itemText="Boomerang" />
      </OverflowMenu>
      <Divider />
      <DataTable />
    </div>
  );
};
