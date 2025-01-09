/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { action } from "@storybook/addon-actions";
import { Button } from "@carbon/react";
import { Help, ThumbsUp, ThumbsDown } from "@carbon/react/icons";
import DecisionButtons from "./DecisionButtons";

export default {
  title: "Inputs/DecisionButtons",
  component: DecisionButtons,
  parameters: {
    docs: {
      description: {
        component: "A button-like radio button experience for selecting between a descrete set of options UI",
      },
    },
  },
};

const items1 = [
  { label: "Radio 1", value: "radio 1" },
  { label: "Radio 2", value: "radio 2" },
];

const items2 = [
  { icon: ThumbsUp, label: "Yes", type: "positive", value: "yes" },
  { icon: ThumbsDown, label: "No", type: "negative", value: "no" },
  { icon: Help, label: "Maybe", value: "maybe" },
];

function ExternallyControlledDecisionButtons(args) {
  const [selectedItem, setSelectedItem] = React.useState("");
  const handleClear = () => {
    setSelectedItem("");
  };
  return (
    <>
      <DecisionButtons
        selectedItem={selectedItem}
        name="radio buttons 3"
        onChange={(value) => setSelectedItem(value)}
        orientation="vertical"
        items={items1}
        {...args}
      />
      <Button size="sm" kind="tertiary" onClick={handleClear} style={{ marginTop: "1rem" }}>
        Clear selection
      </Button>
    </>
  );
}

export const Default = (args) => {
  return (
    <DecisionButtons
      defaultSelected="radio 2"
      name="radio buttons 1"
      onChange={action("Change radio button")}
      labelText={"Make a decision"}
      helperText={"It's an important one. Choose wisely."}
      items={items1}
      orientation="vertical"
      tooltipContent={"Looking for help with the decision?"}
      tooltipProps={{ direction: "right" }}
      {...args}
    />
  );
};

export const PositiveAndNegativeButtonsAndHorizontal = (args) => {
  return (
    <DecisionButtons
      defaultSelected="no"
      name="radio buttons 2"
      helperText={"Yes, no, maybe so"}
      onChange={action("Change radio button")}
      orientation="horizontal"
      items={items2}
      {...args}
    />
  );
};

export const ExternallyControlled = (args) => {
  return <ExternallyControlledDecisionButtons {...args} />;
};

export const CanUncheckButtons = (args) => {
  return (
    <DecisionButtons
      canUncheck
      name="radio buttons 4"
      onChange={action("Change radio button")}
      orientation="horizontal"
      items={items2}
      {...args}
    />
  );
};
