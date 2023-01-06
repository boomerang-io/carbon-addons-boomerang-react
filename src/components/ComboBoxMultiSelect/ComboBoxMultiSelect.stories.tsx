import React from "react";
import { action } from "@storybook/addon-actions";
import MultiSelect from "./ComboBoxMultiSelect";

export default {
  title: "Inputs/ComboBoxMultiSelect",
  component: MultiSelect,
  parameters: {
    docs: {
      description: {
        component: "Enhanced multiselect that allows multiple options to be selected with filtering",
      },
    },
  },
  decorators: [(story) => <div style={{ maxWidth: "25rem", padding: "1rem" }}>{story()}</div>],
};

const animals = [
  { label: "Caribou", value: "caribou" },
  { label: "Cat", value: "cat" },
  { label: "Catfish", value: "catfish" },
  { label: "Cheetah", value: "cheetah" },
  { label: "Chipmunk", value: "chipmunk" },
  { label: "Dog", value: "dog" },
  { label: "Dolphin", value: "dolphin" },
  { label: "Dove", value: "dove" },
  { label: "Panda", value: "panda" },
  { label: "Parrot", value: "parrot" },
  { label: "Peacock", value: "peacock" },
  { label: "Penguim", value: "penguim" },
];

const initialDefaultAnimals = "panda,dog";

export const Default = (args) => {
  return (
    <MultiSelect
      id="multi-select"
      initialSelectedItems={initialDefaultAnimals}
      items={animals}
      itemToString={(item) => item.label}
      onChange={action("Multiselect changed")}
      titleText={"Select some animals"}
      placeholder={"Select an animal"}
      {...args}
    />
  );
};

export const NoSelectedItems = (args) => {
  return (
    <MultiSelect
      id="multi-select"
      items={animals}
      itemToString={(item: { label: string}) => item.label}
      onChange={action("Multiselect changed")}
      titleText={"Select some animals"}
      placeholder={"Select an animal"}
      {...args}
    />
  );
};

NoSelectedItems.story = {
  name: "No selected items",
};

export const KitchenSink = (args) => {
  return (
    <MultiSelect
      disableClear
      id="tooltip-title-multi-select"
      initialSelectedItems={[
        { label: "Cat", value: "cat" },
        { label: "Cheetah", value: "cheetah" },
      ]}
      items={animals}
      itemToString={(item: any) => item.label}
      onChange={action("Multiselect changed")}
      titleText={"Select some animals"}
      placeholder={"Select an animal"}
      helperText={"Some helper text"}
      tooltipContent={"Tooltip for multiSelect"}
      tooltipProps={{ direction: "top" }}
      {...args}
    />
  );
};
