//@ts-nocheck
import React from "react";
import CheckboxListComponent from "../CheckboxList";
import CreatableComponent from "../Creatable";
import MultiSelectComponent from "../ComboBoxMultiSelect";
import DateInputComponent from "../DateInput";
import RadioGroupComponent from "../RadioGroup";
import SelectComponent from "../ComboBox";
import TextAreaComponent from "../TextArea";
import TextInputComponent from "../TextInput";
import ToggleComponent from "../Toggle";
import {
  CHECKBOX_TYPES,
  CREATABLE_TYPES,
  DATE_TYPES,
  MULTI_SELECT_TYPES,
  RADIO_TYPES,
  SELECT_TYPES,
  TEXT_AREA_TYPES,
  TEXT_EDITOR_TYPES,
  TEXT_INPUT_TYPES,
  BOOLEAN_TYPES,
} from "../../internal/DataDrivenInputTypes";
import { FormInput } from "../../types";

function formatSelectOptions(options = []) {
  return options.map((option) => ({ label: (option as any).value, value: (option as any).key }));
}

function formatCheckBoxListOptions(options = []) {
  return options.map((option) => ({ labelText: (option as any).value, id: (option as any).key }));
}

function formatRadioGroupOptions(options = []) {
  return options.map((option) => ({
    labelText: (option as any).value,
    value: (option as any).key,
  }));
}

function validateRegex(pattern: any, value: any) {
  const regexTester = new RegExp(pattern);
  let hasError = false;
  if (Array.isArray(value)) hasError = !value.every((val) => regexTester.test(val));
  else hasError = !regexTester.test(value);
  return hasError;
}

const determineInitialValues = (input: any) => {
  let value = "";
  const valueToCheck = input.value || input.defaultValue || input.values || input.defaultValues;
  if (valueToCheck) {
    switch (valueToCheck) {
      case "false": {
        value = false;
        break;
      }
      case "true": {
        value = true;
        break;
      }
      default: {
        value = valueToCheck;
      }
    }
  }
  return value;
};

type OwnDataDrivenInputProps = {
  id?: string;
  CheckboxList?: React.ReactElement;
  Creatable?: React.ReactElement;
  CustomComponent?: React.ReactElement | Function;
  DateInput?: React.ReactElement;
  MultiSelect?: React.ReactElement;
  RadioGroup?: React.ReactElement;
  Select?: React.ReactElement;
  TextArea?: React.ReactElement;
  TextEditor?: React.ReactElement;
  TextInput?: React.ReactElement;
  Toggle?: React.ReactElement;
  formikProps?: any;
  onChange?: Function;
};

type DataDrivenInputProps = OwnDataDrivenInputProps & FormInput;

function DataDrivenInput(props: DataDrivenInputProps) {
  const {
    CheckboxList = CheckboxListComponent,
    Creatable = CreatableComponent,
    DateInput = DateInputComponent,
    MultiSelect = MultiSelectComponent,
    RadioGroup = RadioGroupComponent,
    Select = SelectComponent,
    TextArea = TextAreaComponent,
    TextEditor = TextAreaComponent,
    TextInput = TextInputComponent,
    Toggle = ToggleComponent,
    formikProps,
    ...inputProps
  } = props;

  const {
    // eslint-disable-next-line no-unused-vars
    conditionallyRender,
    customComponent,
    disabled,
    description = "",
    defaultValue,
    defaultValues,
    label,
    helperText = "",
    pattern,
    patternInvalidText,
    invalid,
    invalidText,
    // eslint-disable-next-line no-unused-vars
    invalidValues,
    key,
    governingOptions,
    governingDisabled,
    minValueLength,
    maxValueLength,
    onBlur,
    onChange,
    options,
    placeholder,
    readOnly,
    required,
    // eslint-disable-next-line no-unused-vars
    requiredForKey,
    // eslint-disable-next-line no-unused-vars
    requiredValueOf,
    type,
    value,
    values,
    ...restInputProps
  } = inputProps;

  let Component;
  let componentProps = {};

  let inputValue = value || values;
  let regexError = inputValue && Boolean(pattern) && validateRegex(pattern, inputValue);

  let invalidInput = regexError || invalid;
  let invalidTextMessage = regexError && patternInvalidText ? patternInvalidText : invalidText;

  React.useEffect(() => {
    // eslint-disable-next-line
    inputValue = determineInitialValues({
      value,
      values,
      defaultValue,
      defaultValues,
    });
  });

  const allInputProps = {
    id: key,
    name: key,
    key,
    disabled,
    helperText,
    label,
    onBlur,
    onChange,
    readOnly,
    required,
    tooltipContent: description,
  };

  if (Object.values(CHECKBOX_TYPES).includes(type)) {
    const checkboxOptions = formatCheckBoxListOptions(options);
    Component = CheckboxList;
    componentProps = {
      ...allInputProps,
      initialSelectedItems: inputValue,
      options: checkboxOptions,
      ...restInputProps,
    };
  } else if (Object.values(CREATABLE_TYPES).includes(type)) {
    Component = Creatable;
    componentProps = {
      ...allInputProps,
      createKeyValuePair:
        type === CREATABLE_TYPES.CREATABLE_PAIR || type === CREATABLE_TYPES.CREATABLE_PAIR_NON_DELETABLE,
      nonDeletable:
        type === CREATABLE_TYPES.CREATABLE_SINGLE_NON_DELETABLE ||
        type === CREATABLE_TYPES.CREATABLE_PAIR_NON_DELETABLE,
      invalid: invalidInput,
      invalidText: invalidTextMessage,
      placeholder,
      value: inputValue,
      ...restInputProps,
    };
  } else if (Object.values(DATE_TYPES).includes(type)) {
    Component = DateInput;
    componentProps = {
      ...allInputProps,
      invalid,
      invalidText,
      placeholder,
      type,
      value: inputValue,
      ...restInputProps,
    };
  } else if (Object.values(MULTI_SELECT_TYPES).includes(type)) {
    const items = formatSelectOptions(options);
    Component = MultiSelect;
    componentProps = {
      ...allInputProps,
      items,
      initialSelectedItems: Array.isArray(inputValue)
        ? items.filter((item) => inputValue.includes(item.value))
        : typeof inputValue === "string"
        ? inputValue
        : [],
      itemToString: (input: any) => input && input.label,
      invalid,
      invalidText,
      placeholder,
      ...restInputProps,
    };
  } else if (Object.values(RADIO_TYPES).includes(type)) {
    const radioOptions = formatRadioGroupOptions(options);
    Component = RadioGroup;
    componentProps = {
      ...allInputProps,
      options: radioOptions,
      valueSelected: inputValue,
      ...restInputProps,
    };
  } else if (Object.values(SELECT_TYPES).includes(type)) {
    const items = governingOptions || formatSelectOptions(options);
    const selectedItem = items.find((item: any) => item.value === value) ?? {};
    Component = Select;
    componentProps = {
      ...allInputProps,
      disabled: governingDisabled || disabled,
      invalid,
      invalidText,
      initialSelectedItem: selectedItem,
      selectedItem,
      itemToString: (input: any) => input && input.label,
      items,
      placeholder,
      ...restInputProps,
    };
  } else if (Object.values(TEXT_AREA_TYPES).includes(type)) {
    Component = TextArea;
    componentProps = {
      ...allInputProps,
      invalid: invalidInput,
      invalidText: invalidTextMessage,
      placeholder,
      value: inputValue,
      ...restInputProps,
    };
  } else if (type.startsWith(TEXT_EDITOR_TYPES.TEXT_EDITOR)) {
    Component = TextEditor;
    componentProps = {
      ...allInputProps,
      invalid: invalidInput,
      invalidText: invalidTextMessage,
      placeholder,
      value: inputValue,
      ...restInputProps,
    };
  } else if (Object.values(TEXT_INPUT_TYPES).includes(type)) {
    Component = TextInput;
    componentProps = {
      ...allInputProps,
      maxLength: maxValueLength,
      minLength: minValueLength,
      max: maxValueLength,
      min: minValueLength,
      invalid: invalidInput,
      invalidText: invalidTextMessage,
      placeholder,
      type: type === TEXT_INPUT_TYPES.SECURED ? TEXT_INPUT_TYPES.PASSWORD : type,
      value: inputValue,
      ...restInputProps,
    };
  } else if (Object.values(BOOLEAN_TYPES).includes(type)) {
    Component = Toggle;
    componentProps = {
      ...allInputProps,
      invalid,
      invalidText,
      onChange: undefined,
      onToggle: onChange,
      toggled: value === true || value === "true",
      ...restInputProps,
    };
  }

  if (customComponent) {
    Component = customComponent;
    return (
      <Component
        {...allInputProps}
        {...componentProps}
        value={inputValue}
        {...restInputProps}
        formikProps={formikProps}
      />
    );
  } else {
    if (Component) {
      return <Component {...componentProps} />;
    }
  }

  return null;
}

export default DataDrivenInput;
