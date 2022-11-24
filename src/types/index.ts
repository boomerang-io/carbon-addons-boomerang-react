import React from "react";

export interface DynamicInput extends FormInput, Government {};

export interface FormInput {
  conditionallyRender?: boolean;
  customComponent?: Function | React.ReactElement;
  defaultValues?: any[];
  invalid?: boolean;
  invalidText?: string;
  invalidValues?: any[];
  governingOptions?: any[];
  governingDisabled?: boolean;
  minValueLength?: string;
  maxValueLength?: string;
  onBlur?: Function;
  onChange?: Function;
  requiredForKey?: string;
  requiredValueOf?: string[];
  required?: boolean;
  placeholder?: string;
  language?: string;
  disabled?: boolean;
  defaultValue?: any;
  defaultOptionLabel?: any;
  value?: any;
  values?: any[];
  readOnly?: boolean;
  dateFormat?: string;
  pattern?: string;
  patternInvalidText?: string;
  government?: Government,
  description?: string;
  key: string;
  label?: string;
  type: string;
  min?: string;
  max?: string;
  options?: { key: string; value: string }[],
  helperText?: string;
  helperTextOff?: string;
  isDefaultLabel?: boolean;
  cannotEditLabel?: boolean;
}

export interface Government {
  governingJson: string;
  governingJsonKey: string;
  jsonKey: string;
  jsonLabel: string;
  governingKey: string;
  governing: boolean;
  governed: boolean;
  isGoverning: boolean;
  isGoverned: boolean;
}

export interface ModalFunctionChildrenProps {
  closeModal: () => void;
}
