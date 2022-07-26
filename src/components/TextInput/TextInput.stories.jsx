import { action } from "@storybook/addon-actions";
import { object, text } from "@storybook/addon-knobs";
import TextInput from "./TextInput";

export default {
  title: "Inputs/TextInput",
  component: TextInput,
};

export const Default = () => {
  return (
    <TextInput
      id="default-text-input"
      onChange={action("text input change")}
      placeholder={text("placeholder", "Placeholder")}
      type="text"
    />
  );
};

export const KitchenSink = () => {
  return (
    <div style={{ height: "5rem" }}>
      <TextInput
        id="tooltip-label-text-input"
        onChange={action("text input change")}
        placeholder={text("placeholder", "Placeholder")}
        helperText={text("helperText", "Some helper text")}
        labelText={text("labelText", "Label for text input")}
        tooltipContent={text("tooltipContent", "Tooltip for text input")}
        tooltipProps={object("tooltipProps", { placement: "top" })}
      />
    </div>
  );
};
