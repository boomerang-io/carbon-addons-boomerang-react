import React from 'react';
import PropTypes from 'prop-types';
import CheckboxList from '../CheckboxList';
import Creatable from '../Creatable';
import MultiSelect from '../ComboBoxMultiSelect';
import RadioGroup from '../RadioGroup';
import Select from '../ComboBox';
import TextArea from '../TextArea';
import TextInput from '../TextInput';
import Toggle from '../Toggle';
import {
  CHECKBOX_TYPES,
  CREATABLE_TYPES,
  MULTI_SELECT_TYPES,
  RADIO_TYPES,
  SELECT_TYPES,
  TEXT_AREA_TYPES,
  TEXT_EDITOR_TYPES,
  TEXT_INPUT_TYPES,
  BOOLEAN_TYPES,
} from '../../internal/DataDrivenInputTypes';

DataDrivenInput.propTypes = {
  CheckboxList: PropTypes.elementType,
  Creatable: PropTypes.elementType,
  CustomComponent: PropTypes.elementType,
  MultiSelect: PropTypes.elementType,
  RadioGroup: PropTypes.elementType,
  Select: PropTypes.elementType,
  TextArea: PropTypes.elementType,
  TextEditor: PropTypes.elementType,
  TextInput: PropTypes.elementType,
  Toggle: PropTypes.elementType,
  formikProps: PropTypes.object,
};

DataDrivenInput.defaultProps = {
  CheckboxList: CheckboxList,
  Creatable: Creatable,
  MultiSelect: MultiSelect,
  RadioGroup: RadioGroup,
  Select: Select,
  TextArea: TextArea,
  TextEditor: TextArea,
  TextInput: TextInput,
  Toggle: Toggle,
};

function formatSelectOptions(options = []) {
  return options.map((option) => ({ label: option.value, value: option.key }));
}

function formatCheckBoxListOptions(options = []) {
  return options.map((option) => ({ labelText: option.value, id: option.key }));
}

function formatRadioGroupOptions(options = []) {
  return options.map((option) => ({
    labelText: option.value,
    value: option.key,
  }));
}

const determineInitialValues = (input) => {
  let value = '';
  const valueToCheck = input.value || input.defaultValue || input.values || input.defaultValues;
  if (valueToCheck) {
    switch (valueToCheck) {
      case 'false': {
        value = false;
        break;
      }
      case 'true': {
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

function DataDrivenInput(props) {
  const {
    CheckboxList,
    Creatable,
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
    // eslint-disable-next-line no-unused-vars
    conditionallyRender,
    customComponent,
    disabled,
    description = '',
    defaultValue,
    defaultValues,
    label,
    helperText = '',
    invalid,
    invalidText,
    // eslint-disable-next-line no-unused-vars
    invalidValues,
    key,
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
      createKeyValuePair: type === CREATABLE_TYPES.CREATABLE_PAIR,
      invalid,
      invalidText,
      placeholder,
      value: inputValue,
      ...restInputProps,
    };
  } else if (Object.values(MULTI_SELECT_TYPES).includes(type)) {
    const items = formatSelectOptions(options);
    Component = MultiSelect;
    componentProps = {
      ...allInputProps,
      items,
      initialSelectedItems: Array.isArray(value)
        ? items.filter((item) => value.includes(item.value))
        : [],
      itemToString: (input) => input && input.label,
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
    const items = formatSelectOptions(options);
    Component = Select;
    componentProps = {
      ...allInputProps,
      invalid,
      invalidText,
      initialSelectedItem: items.find((item) => item.value === value),
      itemToString: (input) => input && input.label,
      items,
      placeholder,
      ...restInputProps,
    };
  } else if (Object.values(TEXT_AREA_TYPES).includes(type)) {
    Component = TextArea;
    componentProps = {
      ...allInputProps,
      invalid,
      invalidText,
      placeholder,
      value: inputValue,
      ...restInputProps,
    };
  } else if (type.startsWith(TEXT_EDITOR_TYPES.TEXT_EDITOR)) {
    Component = TextEditor;
    componentProps = {
      ...allInputProps,
      invalid,
      invalidText,
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
      invalid,
      invalidText,
      placeholder,
      type: type === TEXT_INPUT_TYPES.SECURED ? TEXT_INPUT_TYPES.PASSWORD : type,
      value: inputValue,
      ...restInputProps,
    };
  } else if (Object.values(BOOLEAN_TYPES).includes(type)) {
    Component = Toggle;
    componentProps = {
      ...allInputProps,
      onChange: undefined,
      onToggle: onChange,
      toggled: value === true || value === 'true',
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
