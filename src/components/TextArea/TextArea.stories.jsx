import React from "react";
import { action } from "@storybook/addon-actions";
import { object, text } from "@storybook/addon-knobs";
import TextArea from "./TextArea";

export default {
  title: "Inputs/TextArea",
  component: TextArea,
};

const ExternallyControlledTextArea = (props) => {
  const [value, setValue] = React.useState(null);

  return (
    <TextArea
      {...props}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      value={value}
    />
  );
};

export const Default = () => {
  return (
    <TextArea
      id="default-text-area"
      onChange={action("text area change")}
      placeholder={text("placeholder", "Placeholder")}
      style={object("style", { resize: "none" })}
      type="text"
    />
  );
};

export const WithTooltipLabelAndHelperText = () => {
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
    />
  );
};

WithTooltipLabelAndHelperText.story = {
  name: "with tooltip, label and helper text",
};

export const WithMaxInputLength = () => {
  return (
    <ExternallyControlledTextArea
      id="max-length-label-text-area"
      placeholder={text("placeholder", "Placeholder")}
      style={{ resize: "none" }}
      labelText={text("labelText", "Label for text area")}
      max={200}
    />
  );
};

WithMaxInputLength.story = {
  name: "with max input length",
};
