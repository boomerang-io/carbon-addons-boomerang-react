import { action } from "@storybook/addon-actions";
import { boolean, text, select } from "@storybook/addon-knobs";
import Toggle from "./Toggle";

export default {
  title: "Inputs/Toggle",
  component: Toggle,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "16rem", padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = (args) => {
  return <Toggle id="default-toggle" defaultToggled onToggle={action("Toggle clicked")} {...args} />;
};

export const InvalidWarning = (args) => {
  return (
    <Toggle
      id="tooltip-label-toggle"
      defaultToggled
      onToggle={action("Toggle clicked")}
      labelText="Label for toggle"
      tooltipContent="Tooltip for toggle"
      tooltipProps={{ direction: "top" }}
      helperText={text("helperText", "helperText")}
      orientation={select("orienation", ["horizontal", "vertical"], "vertical")}
      reversed={boolean("reversed", false)}
      invalid
      invalidText="This toggle value is invalid"
      {...args}
    />
  );
};

export const HorizontalToggle = (args) => {
  return (
    <Toggle
      id="default-toggle"
      defaultToggled
      onToggle={action("Toggle clicked")}
      labelText="Label for toggle"
      helperText={text("helperText", "helperText")}
      {...args}
    />
  );
};

export const KitchenSink = (args) => {
  return (
    <Toggle
      id="tooltip-label-toggle"
      defaultToggled
      onToggle={action("Toggle clicked")}
      labelText="Label for toggle"
      tooltipContent="Tooltip for toggle"
      tooltipProps={{ direction: "top" }}
      helperText={text("helperText", "helperText")}
      orientation={select("orienation", ["horizontal", "vertical"], "vertical")}
      reversed={boolean("reversed", false)}
      {...args}
    />
  );
};
