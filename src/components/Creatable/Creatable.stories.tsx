import { action } from "@storybook/addon-actions";
import Creatable from "./Creatable";

export default {
  title: "Inputs/Creatable",
  component: Creatable,
  parameters: {
    docs: {
      description: {
        component: "An input to create values or key/value pairs.",
      },
    },
  },
  decorators: [(story: any) => <div style={{ maxWidth: "25rem", padding: "1rem" }}>{story()}</div>],
};

export const Default = (args: any) => {
  return (
    <Creatable
      id="text-input-creatable"
      labelText={"Creatable"}
      onChange={action("creatable change")}
      helperText="Test helperText"
      placeholder={"Create some values"}
      type="text"
      {...args}
    />
  );
};

export const NonDeletable = (args: any) => {
  return (
    <Creatable
      id="text-input-creatable"
      labelText={"Creatable"}
      onChange={action("creatable change")}
      helperText="Test helperText"
      placeholder={"Create some values"}
      initialValues="test,test2"
      nonDeletable={true}
      type="text"
      {...args}
    />
  );
};

export const KeyValuePair = (args: any) => {
  return (
    <Creatable
      createKeyValuePair
      id="key-value-creatable"
      keyLabelText={"Creatable Key"}
      valueLabelText={"Creatable Value"}
      onChange={action("creatable change")}
      keyPlaceholder={"Key"}
      valuePlaceholder={"Value"}
      keyHelperText={"Key Helper"}
      valueHelperText={"Value Helper"}
      type="text"
      {...args}
    />
  );
};

export const LimitTheNumberOfAddedValues = (args: any) => {
  return (
    <Creatable
      id="limit-values-creatable"
      labelText={"Creatable with added items limited"}
      onChange={action("creatable change")}
      helperText="Items added limited by 3"
      placeholder={"Create some values"}
      type="text"
      max={3}
      {...args}
    />
  );
};

export const KitchenSink = (args: any) => {
  return (
    <Creatable
      id="tooltip-creatable"
      helperText="Example helper text for creatable"
      labelText={"Controlled Creatable"}
      placeholder={"Create some values"}
      onChange={action("creatable change")}
      type="text"
      tooltipContent={"Tooltip for creatable"}
      tooltipProps={{ direction: "top" }}
      {...args}
    />
  );
};
