import React from "react";
import { action } from "@storybook/addon-actions";
import { object, text } from "@storybook/addon-knobs";
import TextArea from "./TextArea";

export default {
  title: "Inputs/TextArea",
  component: TextArea,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "25rem", padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
};

const ExternallyControlledTextArea = (args) => {
  const [value, setValue] = React.useState(null);

  return (
    <TextArea
      {...args}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      value={value}
    />
  );
};

export const Default = (args) => {
  return (
    <TextArea
      id="default-text-area"
      onChange={action("text area change")}
      placeholder={text("placeholder", "Placeholder")}
      style={object("style", { resize: "none" })}
      type="text"
      {...args}
    />
  );
};

export const MaxInputLength = (args) => {
  return (
    <ExternallyControlledTextArea
      id="max-length-label-text-area"
      placeholder={text("placeholder", "Placeholder")}
      style={{ resize: "none" }}
      labelText={text("labelText", "Label for text area")}
      maxCount={200}
      {...args}
    />
  );
};

export const KitchenSink = (args) => {
  return (
    <TextArea
      id="tooltip-label-text-area"
      onChange={action("text area change")}
      placeholder={text("placeholder", "Placeholder")}
      style={{ resize: "none" }}
      helperText={text("helperText", "Some helper text")}
      labelText={text("labelText", "Label for text area")}
      tooltipContent={text("tooltipText", "Tooltip for text area")}
      tooltipProps={object("tooltipProps", { direction: "top" })}
      {...args}
    />
  );
};
