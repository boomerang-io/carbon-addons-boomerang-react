import React from "react";
import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";
import { Help, ThumbsUp, ThumbsDown } from "@carbon/react/icons";
import DecisionButtons from "./DecisionButtons";

export default {
  title: "Inputs/DecisionButtons",
  component: DecisionButtons
};

const items1 = [
  { label: "Radiooooooooooo 1", value: "radio 1" },
  { label: "Radio 2", value: "radio 2" },
];

const items2 = [
  { icon: ThumbsUp, label: "Yes", type: "positive", value: "yes" },
  { icon: ThumbsDown, label: "No", type: "negative", value: "no" },
  { icon: Help, label: "Maybe", value: "maybe" },
];

function ExternallyControlledDecisionButtons() {
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
      />
      <button onClick={handleClear}>Clear selection</button>
    </>
  );
}


export const DefaultAndVertical = () => {
  return (
    <DecisionButtons
      defaultSelected="radio 2"
      name="radio buttons 1"
      onChange={action("Change radio button")}
      labelText={text("labelText", "Example label text")}
      helperText={text("helperText", "Example helper text")}
      items={items1}
      orientation="vertical"
      tooltipContent={text("tooltipContent", "Tooltip for DecisionButtons")}
      tooltipProps={{ direction: "right" }}
    />
  );
};

DefaultAndVertical.story = {
  name: "default and vertical",
};

export const WithPositiveAndNegativeButtonsAndHorizontal = () => {
  return (
    <DecisionButtons
      defaultSelected="no"
      name="radio buttons 2"
      helperText={text("helperText", "Example helper text")}
      onChange={action("Change radio button")}
      orientation="horizontal"
      items={items2}
    />
  );
};

WithPositiveAndNegativeButtonsAndHorizontal.story = {
  name: "with positive and negative buttons and horizontal",
};

export const ExternallyControlled = () => {
  return <ExternallyControlledDecisionButtons />;
};

ExternallyControlled.story = {
  name: "externallyControlled",
};

export const CanUncheckButtons = () => {
  return (
    <DecisionButtons
      canUncheck
      name="radio buttons 4"
      onChange={action("Change radio button")}
      orientation="horizontal"
      items={items2}
    />
  );
};

CanUncheckButtons.story = {
  name: "can uncheck buttons",
};
