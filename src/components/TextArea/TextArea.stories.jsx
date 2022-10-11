import React from "react";
import { action } from "@storybook/addon-actions";
import TextArea from "./TextArea";

export default {
  title: "Inputs/TextArea",
  component: TextArea,
  parameters: {
    docs: {
      description: {
        component: "Enhanced text area with support for tooltip text and use as a data driven component",
      },
    },
  },
  decorators: [
    (story) => (
      <div style={{ maxWidth: "25rem", padding: "1rem" }}>
        {story()}
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
      placeholder={"Placeholder"}
      style={{ resize: "none" }}
      type="text"
      {...args}
    />
  );
};

export const MaxInputLength = (args) => {
  return (
    <ExternallyControlledTextArea
      id="max-length-label-text-area"
      placeholder={"Placeholder"}
      style={{ resize: "none" }}
      labelText={"Label for text area"}
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
      placeholder={"Placeholder"}
      style={{ resize: "none" }}
      helperText={"Some helper text"}
      labelText={"Label for text area"}
      tooltipContent={"Tooltip for text area"}
      tooltipProps={{ direction: "top" }}
      {...args}
    />
  );
};
