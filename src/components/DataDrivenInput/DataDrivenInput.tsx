import React from "react";
import CheckboxList from "../CheckboxList";
import Creatable from "../Creatable";
import MultiSelect from "../ComboBoxMultiSelect";
import DateInput from "../DateInput";
import RadioGroup from "../RadioGroup";
import Select from "../ComboBox";
import TextArea from "../TextArea";
import TextInput from "../TextInput";
import Toggle from "../Toggle";
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

DataDrivenInput.defaultProps = {
  CheckboxList: CheckboxList,
  Creatable: Creatable,
  DateInput: DateInput,
  MultiSelect: MultiSelect,
  RadioGroup: RadioGroup,
  Select: Select,
  TextArea: TextArea,
  TextEditor: TextArea,
  TextInput: TextInput,
  Toggle: Toggle,
};

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
        // @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
        value = false;
        break;
      }
      case "true": {
        // @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'string'.
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
    CheckboxList?: React.ReactElement;
    Creatable?: React.ReactElement;
    CustomComponent?: React.ReactElement;
    DateInput?: React.ReactElement;
    MultiSelect?: React.ReactElement;
    RadioGroup?: React.ReactElement;
    Select?: React.ReactElement;
    TextArea?: React.ReactElement;
    TextEditor?: React.ReactElement;
    TextInput?: React.ReactElement;
    Toggle?: React.ReactElement;
    formikProps?: any;
};

type DataDrivenInputProps = OwnDataDrivenInputProps & typeof DataDrivenInput.defaultProps;

function DataDrivenInput(props: DataDrivenInputProps) {
  const {
    CheckboxList,
    Creatable,
    DateInput,
    MultiSelect,
    RadioGroup,
    Select,
    TextArea,
    TextEditor,
    TextInput,
    Toggle,
    formikProps,
    ...inputProps
  } = props;

  const {
    // @ts-expect-error TS(2339): Property 'conditionallyRender' does not exist on t... Remove this comment to see the full error message
    // eslint-disable-next-line no-unused-vars
    conditionallyRender,
    // @ts-expect-error TS(2339): Property 'customComponent' does not exist on type ... Remove this comment to see the full error message
    customComponent,
    // @ts-expect-error TS(2339): Property 'disabled' does not exist on type '{ Cust... Remove this comment to see the full error message
    disabled,
    // @ts-expect-error TS(2339): Property 'description' does not exist on type '{ C... Remove this comment to see the full error message
    description = "",
    // @ts-expect-error TS(2339): Property 'defaultValue' does not exist on type '{ ... Remove this comment to see the full error message
    defaultValue,
    // @ts-expect-error TS(2339): Property 'defaultValues' does not exist on type '{... Remove this comment to see the full error message
    defaultValues,
    // @ts-expect-error TS(2339): Property 'label' does not exist on type '{ CustomC... Remove this comment to see the full error message
    label,
    // @ts-expect-error TS(2339): Property 'helperText' does not exist on type '{ Cu... Remove this comment to see the full error message
    helperText = "",
    // @ts-expect-error TS(2339): Property 'pattern' does not exist on type '{ Custo... Remove this comment to see the full error message
    pattern,
    // @ts-expect-error TS(2339): Property 'patternInvalidText' does not exist on ty... Remove this comment to see the full error message
    patternInvalidText,
    // @ts-expect-error TS(2339): Property 'invalid' does not exist on type '{ Custo... Remove this comment to see the full error message
    invalid,
    // @ts-expect-error TS(2339): Property 'invalidText' does not exist on type '{ C... Remove this comment to see the full error message
    invalidText,
    // @ts-expect-error TS(2339): Property 'invalidValues' does not exist on type '{... Remove this comment to see the full error message
    // eslint-disable-next-line no-unused-vars
    invalidValues,
    // @ts-expect-error TS(2339): Property 'key' does not exist on type '{ CustomCom... Remove this comment to see the full error message
    key,
    // @ts-expect-error TS(2339): Property 'governingOptions' does not exist on type... Remove this comment to see the full error message
    governingOptions,
    // @ts-expect-error TS(2339): Property 'governingDisabled' does not exist on typ... Remove this comment to see the full error message
    governingDisabled,
    // @ts-expect-error TS(2339): Property 'minValueLength' does not exist on type '... Remove this comment to see the full error message
    minValueLength,
    // @ts-expect-error TS(2339): Property 'maxValueLength' does not exist on type '... Remove this comment to see the full error message
    maxValueLength,
    // @ts-expect-error TS(2339): Property 'onBlur' does not exist on type '{ Custom... Remove this comment to see the full error message
    onBlur,
    // @ts-expect-error TS(2339): Property 'onChange' does not exist on type '{ Cust... Remove this comment to see the full error message
    onChange,
    // @ts-expect-error TS(2339): Property 'options' does not exist on type '{ Custo... Remove this comment to see the full error message
    options,
    // @ts-expect-error TS(2339): Property 'placeholder' does not exist on type '{ C... Remove this comment to see the full error message
    placeholder,
    // @ts-expect-error TS(2339): Property 'readOnly' does not exist on type '{ Cust... Remove this comment to see the full error message
    readOnly,
    // @ts-expect-error TS(2339): Property 'required' does not exist on type '{ Cust... Remove this comment to see the full error message
    required,
    // @ts-expect-error TS(2339): Property 'requiredForKey' does not exist on type '... Remove this comment to see the full error message
    // eslint-disable-next-line no-unused-vars
    requiredForKey,
    // @ts-expect-error TS(2339): Property 'requiredValueOf' does not exist on type ... Remove this comment to see the full error message
    // eslint-disable-next-line no-unused-vars
    requiredValueOf,
    // @ts-expect-error TS(2339): Property 'type' does not exist on type '{ CustomCo... Remove this comment to see the full error message
    type,
    // @ts-expect-error TS(2339): Property 'value' does not exist on type '{ CustomC... Remove this comment to see the full error message
    value,
    // @ts-expect-error TS(2339): Property 'values' does not exist on type '{ Custom... Remove this comment to see the full error message
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
      // @ts-expect-error TS(2322): Type '{}' is not assignable to type 'IntrinsicAttr... Remove this comment to see the full error message
      return <Component {...componentProps} />;
    }
  }

  return null;
}

export default DataDrivenInput;
