import React from "react";
import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";
import RadioGroup from "./RadioGroup";

export default {
  title: "Inputs/RadioGroup",
};

const options1 = [
  { labelText: "Radio 1", value: "radio 1 value" },
  { labelText: "Radio 2", value: "radio 2 value" },
];
const options2 = [
  { labelText: "Radio 3", value: "radio 3 value" },
  { labelText: "Radio 4", value: "radio 4 value" },
];



export const DefaultAndVertical = () => {
  return (
    <RadioGroup
      id="test"
      defaultSelected={text("defaultSelected", "default value")}
      helperText={text("helperText", "Test helper text")}
      name={text("name", "Radio group 1")}
      onChange={action("radio changed")}
      options={options1}
      orientation="horizontal"
    />
  );
};

DefaultAndVertical.story = {
  name: "default and vertical",
};

export const WithTooltipAndLabelAndHorizontal = () => {
  return (
    <RadioGroup
      id="test"
      defaultSelected={text("defaultSelected", "default value")}
      labelText={text("labelText", "Select a value")}
      helperText={text("helperText", "Test helper text")}
      name={text("name", "Radio group 2")}
      onChange={() => {}}
      options={options2}
      orientation="vertical"
      tooltipContent={text("tooltipContent", "Tooltip for radioGroup")}
      tooltipProps={{ direction: "right" }}
    />
  );
};

WithTooltipAndLabelAndHorizontal.story = {
  name: "with tooltip and label and horizontal",
};
