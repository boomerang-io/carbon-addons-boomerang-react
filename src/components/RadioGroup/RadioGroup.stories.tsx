import { action } from "@storybook/addon-actions";
import RadioGroup from "./RadioGroup";

export default {
  title: "Inputs/RadioGroup",
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component: "Manage radio inputs with optional label, helper and tooltip text and use as a data driven component",
      },
    },
  },
};

const options1 = [
  { labelText: "Radio 1", value: "radio 1 value" },
  { labelText: "Radio 2", value: "radio 2 value" },
];
const options2 = [
  { labelText: "Radio 3", value: "radio 3 value" },
  { labelText: "Radio 4", value: "radio 4 value" },
];

export const Default = (args: any) => {
  return (
    <RadioGroup
      id="test"
      defaultSelected={"default value"}
      helperText={"Test helper text"}
      name={"Radio group 1"}
      onChange={action("radio changed")}
      options={options1}
      orientation="horizontal"
      {...args}
    />
  );
};

export const KitchenSink = (args: any) => {
  return (
    <RadioGroup
      id="test"
      defaultSelected={"default value"}
      labelText={"Select a value"}
      helperText={"Test helper text"}
      name={"Radio group 2"}
      onChange={() => {}}
      options={options2}
      orientation="vertical"
      tooltipContent={"Tooltip for radioGroup"}
      tooltipProps={{ direction: "right" }}
      {...args}
    />
  );
};
