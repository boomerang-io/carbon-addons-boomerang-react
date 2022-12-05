import React, { useState } from "react";
import cx from "classnames";
import { Button, Tag, TextInput } from "@carbon/react";
import TooltipHover from "../TooltipHover";
import { Add, Information } from "@carbon/react/icons";
import { prefix } from "../../internal/settings";

import { isAccessibleKeyDownEvent } from "../../tools/accessibility";

type Props = {
  buttonClassName?: string;
  buttonContent?: string;
  buttonProps?: any;
  createKeyValuePair?: boolean;
  disabled?: boolean;
  id?: string;
  initialValues?: any[];
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
  onKeyBlur?: (...args: any[]) => any;
  onValueBlur?: (...args: any[]) => any;
  onInputBlur?: (...args: any[]) => any;
  onChange: (...args: any[]) => any;
  placeholder?: string;
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
  value?: any;
  values?: any[];
};

function CreatableComponent({
  buttonClassName = `${prefix}--bmrg-creatable__button`,
  buttonContent =  "Add",
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
  nonDeletable = false,
  max,
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

  const inputLabel = labelText || label;
  const inputKeyLabel = keyLabelText || keyLabel;
  const inputValueLabel = valueLabelText || valueLabel;

  const [createdItems, setCreatedItems] = useState<any[]>([]);
  const createButtonClassName = cx(buttonClassName, {
    "--no-label":
      (!createKeyValuePair && !inputLabel && !tooltipContent) ||
      (createKeyValuePair && !inputKeyLabel && !inputValueLabel),
  });

  /** Add support for csv strings */
  let finalValues = values;
  let finalExternalValues = externalValues;
  let finalExternalInitialValues = externalInitialValues;

  if (typeof values === "string") {
    finalValues = values === "" ? [] : (values as any).split(",");
  }

  if (typeof externalValues === "string") {
    finalExternalValues = externalValues === "" ? [] : externalValues.split(",");
  }

  if (typeof externalInitialValues === "string") {
    finalExternalInitialValues = (externalInitialValues as any).split(",");
  }

  const [initialItems] = useState(finalValues || finalExternalValues ? finalValues || finalExternalValues : []);
  const tagItems = finalValues || finalExternalValues ? finalValues || finalExternalValues : createdItems; // Externally controlled if values props exists

  const initialTagItems = finalExternalInitialValues || initialItems; // Externally controlled if initialValues props exists
  const existValue = (keyValue && value) || input;

  const hasBothHelperText = keyHelperText && valueHelperText;
  const hasBothLabelText = inputKeyLabel && inputValueLabel;

  const tagsToShow = finalExternalInitialValues ? [...initialTagItems, ...tagItems] : [...tagItems];
  const disableInputs = disabled || (max && tagsToShow.length >= max && max > 0);

  const onInputChange = (e: any) => {
    setInput(e.target.value);
  };

  const onKeyChange = (e: any) => {
    setKeyValue(e.target.value);
  };

  const onValueChange = (e: any) => {
    setValue(e.target.value);
  };

  const addValue = (e: any) => {
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
    onChange(items);
  };

  const removeValue = (value: any) => {
    const items = (tagItems as any).filter((item: any) => item !== value);
    setCreatedItems(items);
    onChange(items);
  };

  return (
    <div key={key} className={`${prefix}--bmrg-creatable`}>
      <div className={`${prefix}--bmrg-creatable__input`}>
        {createKeyValuePair ? (
          <div className={`${prefix}--bmrg-creatable__key-value-inputs`}>
            <TextInput
              disabled={disableInputs}
              id={`${id}-key`}
              invalid={invalid}
              invalidText={invalidText}
              helperText={keyHelperText}
              labelText={inputKeyLabel}
              onBlur={onKeyBlur}
              onChange={onKeyChange}
              placeholder={keyPlaceholder}
              type={type}
              value={keyValue}
              style={{
                marginBottom: hasBothHelperText || keyHelperText ? "0" : valueHelperText ? "1.5rem" : "0rem",
                marginTop: hasBothLabelText || inputKeyLabel ? "0" : inputValueLabel ? "1.5rem" : "0.5rem",
              }}
              {...textInputProps}
            />
            <span
              className={`${prefix}--bmrg-creatable__colon`}
              style={{
                marginTop: inputKeyLabel || inputValueLabel ? "1.75rem" : "0.75rem",
              }}
            >
              :
            </span>
            <TextInput
              disabled={disableInputs}
              id={`${id}-value`}
              invalid={invalid}
              invalidText={invalidText}
              helperText={valueHelperText}
              labelText={inputValueLabel}
              onBlur={onValueBlur}
              onChange={onValueChange}
              placeholder={valuePlaceholder}
              type={type}
              value={value}
              style={{
                marginBottom: hasBothHelperText || valueHelperText ? "0" : keyHelperText ? "1.5rem" : "0rem",
                marginTop: hasBothLabelText || inputValueLabel ? "0" : inputKeyLabel ? "1.5rem" : "0.5rem",
              }}
              {...textInputProps}
            />
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
            type={type}
            value={input}
            {...textInputProps}
          />
        )}
        <Button
          className={createButtonClassName}
          disabled={disabled || !existValue}
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
            onClick={nonDeletable && (initialTagItems as any).includes(item) ? undefined : () => removeValue(item)}
            onKeyDown={
              nonDeletable && (initialTagItems as any).includes(item)
                ? undefined
                : (e: any) => isAccessibleKeyDownEvent(e) && removeValue(item)
            }
            filter={!nonDeletable || (nonDeletable && !(initialTagItems as any).includes(item))}
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
