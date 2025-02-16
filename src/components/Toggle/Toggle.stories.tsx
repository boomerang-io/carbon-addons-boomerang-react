/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
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
  decorators: [(story) => <div style={{ maxWidth: "16rem", padding: "1rem" }}>{story()}</div>],
};

export const Default = (args) => {
  return <Toggle id="default-toggle" labelText="Toggle me" defaultToggled onToggle={action("Toggle clicked")} {...args} />;
};

export const InvalidWarning = (args) => {
  return (
    <Toggle
      defaultToggled
      id="tooltip-label-toggle"
      onToggle={action("Toggle clicked")}
      labelText="Toggle me"
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

export const HorizontalToggle = (args) => {
  return (
    <Toggle
      defaultToggled
      id="default-toggle"
      onToggle={action("Toggle clicked")}
      labelText="Label for toggle"
      helperText={"helperText"}
      {...args}
    />
  );
};

export const KitchenSink = (args) => {
  return (
    <Toggle
      defaultToggled
      id="tooltip-label-toggle"
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
