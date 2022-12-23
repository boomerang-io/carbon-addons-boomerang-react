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
      <ComboBox
        id="select-default"
        items={items}
        placeholder="Search for something"
        titleText="Should filter item"
        helperText="Default behavior"
        onChange={() => {}}
      />
    </div>
  );
};

export const SingleItems = () => {
  return (
    <div style={{ width: "25rem" }}>
      <ComboBox
        id="select-default"
        items={singleItems}
        placeholder="Search for something"
        titleText="Should filter item"
        helperText="Default behavior"
        onChange={() => {}}
      />
    </div>
  );
};

export const WithoutFilter = () => {
  return (
    <div style={{ width: "25rem" }}>
      <ComboBox
        id="select-filter"
        items={items}
        placeholder="Select something"
        titleText="Should not filter, only highlight"
        shouldFilterItem={false}
        onChange={() => {}}
      />
    </div>
  );
};

export const ItemToElement = () => {
  return (
    <div style={{ width: "25rem" }}>
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
        onChange={() => {}}
      />
    </div>
  );
};

export const MenuOpenUpwards = () => {
  return (
    <div style={{ width: "25rem", height: "15rem", display: "flex", alignItems: "flex-end" }}>
      <ComboBox
        id="select-default"
        items={items}
        placeholder="Search for something"
        titleText="Menu should open upwards"
        direction="top"
        onChange={() => {}}
      />
    </div>
  );
};

const ComboBoxExternallyControlled = () => {
  const [selectedItem, setSelectedItem] = React.useState<{ label: string; value: string }>({} as any);

  return (
    <ComboBox
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
      <ComboBox
        disableClear
        id="select-tooltip-helper"
        items={items}
        placeholder="Search for something"
        titleText="Should filter item"
        helperText="My items are filtered internally"
        tooltipContent="Tooltip for select"
        tooltipProps={{ direction: "top" }}
        onChange={() => {}}
      />
    </div>
  );
};
