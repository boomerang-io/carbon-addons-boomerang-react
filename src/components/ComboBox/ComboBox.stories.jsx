import React from "react";
import { action } from "@storybook/addon-actions";
import ComboBox from "./index";

export default {
  title: "Inputs/ComboBox",
  component: ComboBox,
};

const items = [
  { label: "Caribou", value: "caribou", isDisabled: true },
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

const ComboBoxExternallyControlled = () => {
  const [selectedItem, setSelectedItem] = React.useState([]);

  return (
    <ComboBox
      onChange={() => setSelectedItem({ label: "Penguin", value: "penguin" })}
      id="select-default"
      items={items}
      placeholder="Search for something"
      titleText="Should always select penguin"
      selectedItem={selectedItem}
    />
  );
};

export const Default = () => {
  return (
    <div style={{ width: "25rem" }}>
      <ComboBox
        onChange={action("select change")}
        id="select-default"
        items={items}
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
      <ComboBox
        onChange={action("select change")}
        id="select-filter"
        items={items}
        placeholder="Select something"
        titleText="Should filter item"
        shouldFilterItem={false}
      />
    </div>
  );
};

export const ItemToElement = () => {
  return (
    <div style={{ width: "25rem" }}>
      <ComboBox
        disableClear
        onChange={action("select change")}
        id="select-tooltip-helper"
        items={items}
        placeholder="Search for something"
        titleText="Should filter item"
        helperText="My items are filtered internally"
        shouldFilterItem={({ item, inputValue }) => item.label.toLowerCase().includes(inputValue.toLowerCase())}
        itemToElement={(item) => (
          <button
            style={{ height: "100%", width: "100%", outline: "none", background: "none", border: "none" }}
            disabled
          >
            {item.value + " test"}
          </button>
        )}
        tooltipContent="Tooltip for select"
        tooltipProps={{ direction: "top" }}
      />
    </div>
  );
};

export const MenuOpenUpwards = () => {
  return (
    <div style={{ width: "25rem", height: "30rem", display: "flex", alignItems: "flex-end" }}>
      <ComboBox
        onChange={action("select change")}
        id="select-default"
        items={items}
        placeholder="Search for something"
        titleText="Menu should open upwards"
        direction="top"
      />
    </div>
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
        onChange={action("select change")}
        id="select-tooltip-helper"
        items={items}
        placeholder="Search for something"
        titleText="Should filter item"
        helperText="My items are filtered internally"
        shouldFilterItem={({ item, inputValue }) => item.label.toLowerCase().includes(inputValue.toLowerCase())}
        tooltipContent="Tooltip for select"
        tooltipProps={{ direction: "top" }}
      />
    </div>
  );
};
