import { action } from "@storybook/addon-actions";
import { object, text } from "@storybook/addon-knobs";
import MultiSelect from "./ComboBoxMultiSelect";

export default {
  title: "Inputs/ComboBoxMultiSelect",
  component: MultiSelect,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "25rem", padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
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
      items={object("items", animals)}
      itemToString={(item) => item.label}
      onChange={action("Multiselect changed")}
      titleText={text("titleText", "Select some animals")}
      placeholder={text("placeholder", "Select an animal")}
      {...args}
    />
  );
};

export const NoSelectedItems = (args) => {
  return (
    <MultiSelect
      id="multi-select"
      items={object("items", animals)}
      itemToString={(item) => item.label}
      onChange={action("Multiselect changed")}
      titleText={text("titleText", "Select some animals")}
      placeholder={text("placeholder", "Select an animal")}
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
      items={object("items", animals)}
      itemToString={(item) => item.label}
      onChange={action("Multiselect changed")}
      titleText={text("titleText", "Select some animals")}
      placeholder={text("placeholder", "Select an animal")}
      helperText={text("helperText", "Some helper text")}
      tooltipContent={text("tooltipContent", "Tooltip for multiSelect")}
      tooltipProps={{ direction: "top" }}
      {...args}
    />
  );
};
