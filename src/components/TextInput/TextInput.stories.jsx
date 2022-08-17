import { action } from "@storybook/addon-actions";
import TextInput from "./TextInput";

export default {
  title: "Inputs/TextInput",
  component: TextInput,
  parameters: {
    docs: {
      description: {
        component: "Enhanced text input with support for tooltip text and use as a data driven component",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "25rem", padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    tooltipContent: {
      control: "text",
    },
  },
};

export const Default = (args) => {
  return (
    <TextInput
      id="default-text-input"
      onChange={action("text input change")}
      placeholder={"Placeholder"}
      type="text"
      labelText="Label"
      {...args}
    />
  );
};

export const KitchenSink = (args) => {
  return (
    <div style={{ height: "5rem" }}>
      <TextInput
        id="tooltip-label-text-input"
        onChange={action("text input change")}
        placeholder={"Placeholder"}
        helperText={"Some helper text"}
        labelText={"Label for text input"}
        tooltipContent={"Tooltip for text input"}
        tooltipProps={{ placement: "top" }}
        {...args}
      />
    </div>
  );
};
