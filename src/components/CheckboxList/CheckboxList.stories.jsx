import CheckboxList from "./CheckboxList";
import { action } from "@storybook/addon-actions";

const animals = [
  { labelText: "Cat", id: "cat" },
  { labelText: "Dog", id: "dog" },
  { labelText: "Panda", id: "panda" },
  { labelText: "Parrot", id: "parrot" },
];

export default {
  title: "Inputs/CheckboxList",
  component: CheckboxList,
  argTypes: {
    options: {
      type: "array",
      defaultValue: animals,
    },
    initialSelectedItems: {
      type: "array",
      defaultValue: ["panda"],
    },
  },
};

export const Default = (args) => {
  return <CheckboxList {...args} />;
};

export const KitchenSink = (args) => {
  return (
    <CheckboxList
      helperText="Testing this"
      initialSelectedItems={["peacock"]}
      labelText="Select some animals"
      onChange={() => {}}
      options={animals}
      tooltipContent="Tooltip for checkbox"
      tooltipProps={{ direction: "top" }}
      {...args}
    />
  );
};
