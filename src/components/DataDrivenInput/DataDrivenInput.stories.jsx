import React from "react";
import TextInput from "../TextInput";
import DataDrivenInput from "./index";

export default {
  title: "Inputs/DataDrivenInput",
  component: DataDrivenInput,
  parameters: {
    docs: {
      description: {
        component: "A dynamic input driven via data. Used for data driven forms.",
      },
    },
  },
};

const input = {
  key: "text",
  label: "Text",
  value: "boomerang",
  type: "text",
  placeholder: "text",
  helperText: "text",
  description: "text",
  pattern: "(boomerang|carbon)",
  patternInvalidText: "Custom error for invalid pattern - Type boomerang or carbon.",
};

const customInput = {
  key: "custom",
  label: "Custom",
  value: "custom",
  type: "text",
  placeholder: "custom",
  helperText: "custom",
  required: true,
  // eslint-disable-next-line
  customComponent: ({ formikProps, ...rest }) => <TextInput {...rest} />,
};

export const Default = () => {
  const [testValue, setTestValue] = React.useState("boomerang");
  return (
    <DataDrivenInput
      id="dynamic-formik-form-id"
      {...input}
      value={testValue}
      onChange={(e) => setTestValue(e.target.value)}
    />
  );
};

export const CustomComponentInput = () => {
  return <DataDrivenInput id="dynamic-formik-form-id" {...customInput} />;
};