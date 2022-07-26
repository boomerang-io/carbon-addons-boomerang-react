import { action } from "@storybook/addon-actions";
import { boolean, text, select } from "@storybook/addon-knobs";
import Toggle from "./Toggle";

export default {
  title: "Inputs/Toggle",
  component: Toggle,
};

export const Default = () => {
  return (
    <div style={{ width: "16rem" }}>
      <Toggle id="default-toggle" defaultToggled onToggle={action("Toggle clicked")} />
    </div>
  );
};

export const InvalidWarning = () => {
  return (
    <div style={{ width: "16rem" }}>
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
      />
    </div>
  );
};

export const HorizontalToggle = () => {
  return (
    <div style={{ width: "16rem" }}>
      <Toggle
        id="default-toggle"
        defaultToggled
        onToggle={action("Toggle clicked")}
        labelText="Label for toggle"
        helperText={text("helperText", "helperText")}
      />
    </div>
  );
};

export const KitchenSink = () => {
  return (
    <div style={{ width: "16rem" }}>
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
      />
    </div>
  );
};
