import { action } from "@storybook/addon-actions";
import Toggle from "./Toggle";

export default {
  title: "Inputs/Toggle",
  component: Toggle,
  parameters: {
    docs: {
      description: {
        component: "Enhanced toggle with support for label, helper and tooltip text and use as a data driven component",
      },
    },
  },
  decorators: [(story: any) => <div style={{ maxWidth: "16rem", padding: "1rem" }}>{story()}</div>],
};

export const Default = (args: any) => {
  return <Toggle id="default-toggle" defaultToggled onToggle={action("Toggle clicked")} {...args} />;
};

export const InvalidWarning = (args: any) => {
  return (
    <Toggle
      id="tooltip-label-toggle"
      defaultToggled
      onToggle={action("Toggle clicked")}
      labelText="Label for toggle"
      tooltipContent="Tooltip for toggle"
      tooltipProps={{ direction: "top" }}
      helperText={"helperText"}
      orientation={"vertical"}
      reversed={false}
      invalid
      invalidText="This toggle value is invalid"
      {...args}
    />
  );
};

export const HorizontalToggle = (args: any) => {
  return (
    <Toggle
      id="default-toggle"
      defaultToggled
      onToggle={action("Toggle clicked")}
      labelText="Label for toggle"
      helperText={"helperText"}
      {...args}
    />
  );
};

export const KitchenSink = (args: any) => {
  return (
    <Toggle
      id="tooltip-label-toggle"
      defaultToggled
      onToggle={action("Toggle clicked")}
      labelText="Label for toggle"
      tooltipContent="Tooltip for toggle"
      tooltipProps={{ direction: "top" }}
      helperText={"helperText"}
      orientation={"vertical"}
      reversed={false}
      {...args}
    />
  );
};
