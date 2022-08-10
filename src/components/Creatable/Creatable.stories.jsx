import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";
import Creatable from "./Creatable";

export default {
  title: "Inputs/Creatable",
  component: Creatable,
};

export const Default = (args) => {
  return (
    <div style={{ width: "25rem" }}>
      <Creatable
        id="text-input-creatable"
        labelText={text("labelText", "Creatable")}
        onChange={action("creatable change")}
        helperText="Test helperText"
        placeholder={text("placeholder", "Create some values")}
        type="text"
        {...args}
      />
    </div>
  );
};

export const NonDeletable = (args) => {
  return (
    <div style={{ width: "25rem" }}>
      <Creatable
        id="text-input-creatable"
        labelText={text("labelText", "Creatable")}
        onChange={action("creatable change")}
        helperText="Test helperText"
        placeholder={text("placeholder", "Create some values")}
        initialValues="test,test2"
        nonDeletable={true}
        type="text"
        {...args}
      />
    </div>
  );
};

export const KeyValuePair = (args) => {
  return (
    <div style={{ width: "25rem" }}>
      <Creatable
        createKeyValuePair
        id="key-value-creatable"
        keyLabelText={text("keyLabelText", "Creatable Key")}
        valueLabelText={text("valueLabelText", "Creatable Value")}
        onChange={action("creatable change")}
        keyPlaceholder={text("keyPlaceholder", "Key")}
        valuePlaceholder={text("valuePlaceholder", "Value")}
        keyHelperText={text("keyHelperText", "Key Helper")}
        valueHelperText={text("valueHelperText", "Value Helper")}
        type="text"
        {...args}
      />
    </div>
  );
};

export const LimitTheNumberOfAddedValues = (args) => {
  return (
    <div style={{ width: "25rem" }}>
      <Creatable
        id="limit-values-creatable"
        labelText={text("labelText", "Creatable with added items limited")}
        onChange={action("creatable change")}
        helperText="Items added limited by 3"
        placeholder={text("placeholder", "Create some values")}
        type="text"
        max={3}
        {...args}
      />
    </div>
  );
};

export const KitchenSink = (args) => {
  return (
    <Creatable
      id="tooltip-creatable"
      helperText="Example helper text for creatable"
      labelText={text("labelText", "Controlled Creatable")}
      placeholder={text("placeholder", "Create some values")}
      onChange={action("creatable change")}
      type="text"
      tooltipContent={text("tooltipContent", "Tooltip for creatable")}
      tooltipProps={{ direction: "top" }}
      {...args}
    />
  );
};
