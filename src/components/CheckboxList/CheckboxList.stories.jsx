import CheckboxList from "./CheckboxList";
import { action } from "@storybook/addon-actions";

export default {
  title: "Inputs/CheckboxList",
  component: CheckboxList,
};

const animals = [
  { labelText: "Cat", id: "cat" },
  { labelText: "Dog", id: "dog" },
  { labelText: "Panda", id: "panda" },
];

const animals2 = [
  { labelText: "Parrot", id: "parrot" },
  { labelText: "Peacock", id: "peacock" },
  { labelText: "Penguin", id: "penguin" },
];

export const Default = () => {
  return <CheckboxList initialSelectedItems={["panda"]} onChange={action("checkboxlist changed")} options={animals} />;
};

export const KitchenSink = () => {
  return (
    <CheckboxList
      helperText="Testing this"
      initialSelectedItems={["peacock"]}
      labelText="Select some animals"
      onChange={() => {}}
      options={animals2}
      tooltipContent="Tooltip for checkbox"
      tooltipProps={{ direction: "top" }}
    />
  );
};
