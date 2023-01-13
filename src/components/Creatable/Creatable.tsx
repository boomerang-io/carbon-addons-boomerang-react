import React, { useState } from "react";
import cx from "classnames";
import { Button, Tag, TextInput } from "@carbon/react";
import TooltipHover from "../TooltipHover";
import { Add, Information } from "@carbon/react/icons";
import { prefix } from "../../internal/settings";

import { isAccessibleKeyDownEvent } from "../../tools/accessibility";

type Props = {
  buttonClassName?: string;
  buttonContent?: React.ReactNode;
  buttonProps?: any;
  createKeyValuePair?: boolean;
  disabled?: boolean;
  id?: string;
  initialValues?: string | string[];
  invalid?: boolean;
  invalidText?: string;
  helperText?: string;
  key?: string;
  keyHelperText?: string;
  keyLabel?: string;
  keyLabelText?: string;
  keyPlaceholder?: string;
  label?: string;
  labelText?: string;
  nonDeletable?: boolean;
  max?: number;
  onKeyBlur?: (e: React.FocusEvent<HTMLInputElement>) => any;
  onValueBlur?: (e: React.FocusEvent<HTMLInputElement>) => any;
  onInputBlur?: (e: React.FocusEvent<HTMLInputElement>) => any;
  onChange?: (items: string[]) => void;
  placeholder?: string;
  readOnly?: boolean;
  tagProps?: any;
  tagType?: string;
  textInputProps?: any;
  tooltipClassName?: string;
  tooltipContent?: React.ReactNode;
  tooltipProps?: any;
  type?: string;
  valueHelperText?: string;
  valueLabel?: string;
  valueLabelText?: string;
  valuePlaceholder?: string;
  value?: string | string[];
  values?: string | string[];
};

function CreatableComponent({
  buttonClassName = `${prefix}--bmrg-creatable__button`,
  buttonContent = "Add",
  buttonProps,
  createKeyValuePair = false,
  disabled,
  id,
  initialValues: externalInitialValues,
  invalid,
  invalidText,
  helperText,
  key,
  keyHelperText,
  keyLabel,
  keyLabelText,
  keyPlaceholder,
  label,
  labelText = "",
  max,
  nonDeletable = false,
  onKeyBlur,
  onValueBlur,
  onInputBlur,
  onChange,
  placeholder,
  tagProps,
  tagType = "teal",
  textInputProps,
  tooltipClassName = `${prefix}--bmrg-creatable__tooltip`,
  tooltipContent,
  tooltipProps = { direction: "top" },
  type = "text",
  valueHelperText,
  valueLabel,
  valueLabelText,
  valuePlaceholder,
  value: externalValues,
  values,
}: Props) {
  const [keyValue, setKeyValue] = useState("");
  const [value, setValue] = useState("");
  const [input, setInput] = useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const inputLabel = labelText || label;
  const inputKeyLabel = keyLabelText || keyLabel;
  const inputValueLabel = valueLabelText || valueLabel;

  const [createdItems, setCreatedItems] = useState<string[]>([]);
  const createButtonClassName = cx(buttonClassName, {
    "--no-label":
      (!createKeyValuePair && !inputLabel && !tooltipContent) ||
      (createKeyValuePair && !inputKeyLabel && !inputValueLabel),
  });

  /** Add support for csv strings */
  let finalValues: string[] | undefined;
  let finalExternalValues: string[] | undefined;
  let finalExternalInitialValues: string[] | undefined;

  if (typeof values === "string") {
    finalValues = values === "" ? ([] as string[]) : values.split(",");
  } else {
    finalValues = values;
  }

  if (typeof externalValues === "string") {
    finalExternalValues = externalValues === "" ? [] : externalValues.split(",");
  } else {
    finalExternalValues = externalValues;
  }

  if (typeof externalInitialValues === "string") {
    finalExternalInitialValues = externalInitialValues.split(",");
  } else {
    finalExternalInitialValues = externalInitialValues;
  }

  const [initialItems] = useState(finalValues || finalExternalValues ? finalValues || finalExternalValues : []);
  const tagItems = (finalValues || finalExternalValues ? finalValues || finalExternalValues : createdItems) as string[]; // Externally controlled if values props exists

  const initialTagItems = finalExternalInitialValues || initialItems || []; // Externally controlled if initialValues props exists
  const existValue = (keyValue && value) || input;

  const hasBothHelperText = keyHelperText && valueHelperText;
  const hasBothLabelText = inputKeyLabel && inputValueLabel;

  const tagsToShow = finalExternalInitialValues ? [...initialTagItems, ...tagItems] : [...tagItems];
  const disableInputs = disabled || (max && tagsToShow.length >= max && max > 0);

  // Check if key value pair has colon
  const keyInputHasColon = keyValue?.includes(":");
  const valueInputHasColon = value?.includes(":");
  const isKeyInputValid = invalid || keyInputHasColon;
  const isValueInputValid = invalid || valueInputHasColon;
  const keyInputInvalidText = keyInputHasColon ? '":" is not allowed' : invalidText;
  const valueInputInvalidText = valueInputHasColon ? '":" is not allowed' : invalidText;

  const isAddButtonDisabled = disabled || !existValue || keyInputHasColon || valueInputHasColon;

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyValue(e.target.value);
  };

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const addValue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const items = [...tagItems];
    if (createKeyValuePair && keyValue && value) {
      items.push(`${keyValue}:${value}`);
      setKeyValue("");
      setValue("");
    } else {
      input && items.push(input);
      setInput("");
    }

    setCreatedItems(items);
    if (onChange) onChange(items);
    inputRef.current?.focus();
  };

  const removeValue = (value: string) => {
    const items = tagItems.filter((item) => item !== value);
    setCreatedItems(items);
    if (onChange) onChange(items);
  };

  return (
    <div key={key} className={`${prefix}--bmrg-creatable`}>
      <div className={`${prefix}--bmrg-creatable__input`}>
        {createKeyValuePair ? (
          <div className={`${prefix}--bmrg-creatable__key-value-inputs`}>
            <div
              style={{
                marginBottom: hasBothHelperText || keyHelperText ? "0" : valueHelperText ? "1.5rem" : "0rem",
                marginTop: hasBothLabelText || inputKeyLabel ? "0" : inputValueLabel ? "1.5rem" : "0.5rem",
              }}
            >
              <TextInput
                disabled={disableInputs}
                id={`${id}-key`}
                invalid={isKeyInputValid}
                invalidText={keyInputInvalidText}
                helperText={keyHelperText}
                labelText={inputKeyLabel}
                onBlur={onKeyBlur}
                onChange={onKeyChange}
                placeholder={keyPlaceholder}
                ref={inputRef}
                type={type}
                value={keyValue}
                {...textInputProps}
              />
            </div>
            <span
              className={`${prefix}--bmrg-creatable__colon`}
              style={{
                marginTop: inputKeyLabel || inputValueLabel ? "2.25rem" : "1.25rem",
              }}
            >
              :
            </span>
            <div
              style={{
                marginBottom: hasBothHelperText || valueHelperText ? "0" : keyHelperText ? "1.5rem" : "0rem",
                marginTop: hasBothLabelText || inputValueLabel ? "0" : inputKeyLabel ? "1.5rem" : "0.5rem",
              }}
            >
              <TextInput
                disabled={disableInputs}
                id={`${id}-value`}
                invalid={isValueInputValid}
                invalidText={valueInputInvalidText}
                helperText={valueHelperText}
                labelText={inputValueLabel}
                onBlur={onValueBlur}
                onChange={onValueChange}
                placeholder={valuePlaceholder}
                type={type}
                value={value}
                {...textInputProps}
              />
            </div>
          </div>
        ) : (
          <TextInput
            disabled={disableInputs}
            id={id}
            invalid={invalid}
            invalidText={invalidText}
            helperText={helperText}
            labelText={
              <div style={{ display: "flex" }}>
                <div>{inputLabel}</div>
                {tooltipContent && (
                  <div className={tooltipClassName}>
                    <TooltipHover {...tooltipProps} tooltipText={tooltipContent}>
                      <Information size={16} fill="currentColor" />
                    </TooltipHover>
                  </div>
                )}
              </div>
            }
            onBlur={onInputBlur}
            onChange={onInputChange}
            placeholder={placeholder}
            ref={inputRef}
            type={type}
            value={input}
            {...textInputProps}
          />
        )}
        <Button
          className={createButtonClassName}
          disabled={isAddButtonDisabled}
          onClick={addValue}
          iconDescription="Add"
          renderIcon={Add}
          size="md"
          type="button"
          {...buttonProps}
        >
          {buttonContent}
        </Button>
      </div>
      <div className={`${prefix}--bmrg-creatable__tags`}>
        {tagsToShow.map((item, index) => (
          <Tag
            key={`${item}-${index}`}
            disabled={disabled}
            type={tagType}
            onClick={nonDeletable && initialTagItems.includes(item) ? undefined : () => removeValue(item)}
            onKeyDown={
              nonDeletable && initialTagItems.includes(item)
                ? undefined
                : (e: React.KeyboardEvent<HTMLDivElement>) => isAccessibleKeyDownEvent(e) && removeValue(item)
            }
            filter={!nonDeletable || (nonDeletable && !initialTagItems.includes(item))}
            {...tagProps}
          >
            {item}
          </Tag>
        ))}
      </div>
    </div>
  );
}

export default CreatableComponent;
