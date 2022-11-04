import React from "react";
import ComboBox from "./index";

export default {
  title: "Inputs/ComboBox",
  component: ComboBox,
  parameters: {
    docs: {
      description: {
        component: "Enhanced combobox that default filters options on type by default",
      },
    },
  },
  argTypes: { onChange: { action: "clicked" } },
};

const items = [
  { label: "Caribou", value: "caribou", disabled: true },
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
  { label: "Penguin", value: "penguin" },
];

const singleItems = [
  "Caribou",
  "Cat",
  "Catfish",
  "Cheetah",
  "Chipmunk",
  "Dog",
  "Dolphin",
  "Dove",
  "Panda",
  "Parrot",
  "Peacock",
  "Penguin",
];

export const Default = () => {
  return (
    <div style={{ width: "25rem" }}>
      {/* @ts-expect-error TS(2741): Property 'onChange' is missing in type '{ id: stri... Remove this comment to see the full error message */}
      <ComboBox
        id="select-default"
        items={items}
        placeholder="Search for something"
        titleText="Should filter item"
        helperText="Default behavior"
      />
    </div>
  );
};

export const SingleItems = () => {
  return (
    <div style={{ width: "25rem" }}>
      {/* @ts-expect-error TS(2741): Property 'onChange' is missing in type '{ id: stri... Remove this comment to see the full error message */}
      <ComboBox
        id="select-default"
        items={singleItems}
        placeholder="Search for something"
        titleText="Should filter item"
        helperText="Default behavior"
      />
    </div>
  );
};

export const WithoutFilter = () => {
  return (
    <div style={{ width: "25rem" }}>
      {/* @ts-expect-error TS(2741): Property 'onChange' is missing in type '{ id: stri... Remove this comment to see the full error message */}
      <ComboBox
        id="select-filter"
        items={items}
        placeholder="Select something"
        titleText="Should not filter, only highlight"
        shouldFilterItem={false}
      />
    </div>
  );
};

export const ItemToElement = () => {
  return (
    <div style={{ width: "25rem" }}>
      {/* @ts-expect-error TS(2741): Property 'onChange' is missing in type '{ disableC... Remove this comment to see the full error message */}
      <ComboBox
        disableClear
        id="select-tooltip-helper"
        items={items}
        placeholder="Search for something"
        titleText="Should filter item"
        helperText="My items are filtered internally"
        itemToElement={(item) => item.value + " 😊"}
        tooltipContent="Tooltip for select"
        tooltipProps={{ direction: "top" }}
      />
    </div>
  );
};

export const MenuOpenUpwards = () => {
  return (
    <div style={{ width: "25rem", height: "15rem", display: "flex", alignItems: "flex-end" }}>
      {/* @ts-expect-error TS(2741): Property 'onChange' is missing in type '{ id: stri... Remove this comment to see the full error message */}
      <ComboBox
        id="select-default"
        items={items}
        placeholder="Search for something"
        titleText="Menu should open upwards"
        direction="top"
      />
    </div>
  );
};

const ComboBoxExternallyControlled = () => {
  const [selectedItem, setSelectedItem] = React.useState([]);

  return (
    <ComboBox
      // @ts-expect-error TS(2345): Argument of type '{ label: string; value: string; ... Remove this comment to see the full error message
      onChange={({ selectedItem }) => (selectedItem ? setSelectedItem({ label: "Penguin", value: "penguin" }) : null)}
      id="select-default"
      items={items}
      placeholder="Search for something"
      titleText="Always getting pengiun"
      selectedItem={selectedItem}
    />
  );
};

export const ExternalControl = () => {
  return (
    <div style={{ width: "25rem" }}>
      <ComboBoxExternallyControlled />
    </div>
  );
};

export const KitchenSink = () => {
  return (
    <div style={{ width: "25rem" }}>
      {/* @ts-expect-error TS(2741): Property 'onChange' is missing in type '{ disableC... Remove this comment to see the full error message */}
      <ComboBox
        disableClear
        id="select-tooltip-helper"
        items={items}
        placeholder="Search for something"
        titleText="Should filter item"
        helperText="My items are filtered internally"
        tooltipContent="Tooltip for select"
        tooltipProps={{ direction: "top" }}
      />
    </div>
  );
};
