import React from "react";
import { RadioButton, RadioButtonGroup } from "@carbon/react";
import { Information } from "@carbon/react/icons";
import TooltipHover from "../TooltipHover";
import { prefix } from "../../internal/settings";
import type { TooltipHoverProps } from "../TooltipHover";

type RadioButtonOption = {
  disabled?: boolean;
  labelText: string;
  value: string;
};

type Props = {
  columnHeight?: string;
  defaultSelected?: string;
  disabled?: boolean;
  helperText?: string;
  id?: string;
  key?: string;
  label?: string;
  labelText?: string;
  name: string;
  onChange: (selectedValue: string, radioGroup: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  options: RadioButtonOption[];
  orientation?: "horizontal" | "vertical";
  radioGroupProps?: Record<string, any>;
  radioButtonProps?: Record<string, any>;
  tooltipClassName?: string;
  tooltipContent?: React.ReactNode;
  tooltipProps?: TooltipHoverProps;
  value?: string;
  verticalWrapped?: boolean;
};

function RadioGroupComponent({
  defaultSelected,
  disabled,
  helperText,
  id,
  label,
  labelText,
  name,
  onChange,
  options,
  orientation,
  radioGroupProps,
  radioButtonProps,
  tooltipClassName = `${prefix}--bmrg-radio-group__tooltip`,
  tooltipContent,
  tooltipProps = { direction: "top" },
  value,
  columnHeight = "6rem",
  verticalWrapped = false,
}: Props) {
  const labelValue = label || labelText;
  const labelTextId = !labelValue ? undefined : `${id}-label`;

  const isVertical = orientation === "vertical";
  const hasVerticalHelperText = isVertical && helperText;
  const hasHorizontalHelperText = !isVertical && helperText;

  // add "title" attribute to radio buttons labels so they show a tooltip with the content
  React.useEffect(() => {
    if (Array.isArray(options)) {
      options.forEach((option, index) => {
        const inputElement = document.getElementById(option.value);
        if (Boolean(inputElement) && inputElement !== null) {
          inputElement.parentNode?.children[1]?.children[1]?.setAttribute("title", options[index].labelText);
        }
      });
    }
  });

  return (
    //Defined a css var --height to be used on the wrapped container to determine the number of radios displayed in each column
    <div key={id} className={`${prefix}--bmrg-radio-group`} style={{ ["--height" as string]: columnHeight }}>
      {labelValue && (
        <div className={`${prefix}--bmrg-radio-group__title`}>
          <div id={labelTextId} className={`${prefix}--label`}>
            {labelValue}
          </div>
          {tooltipContent && (
            <div className={tooltipClassName}>
              <TooltipHover {...tooltipProps} tooltipText={tooltipContent}>
                <Information size={16} fill="currentColor" />
              </TooltipHover>
            </div>
          )}
        </div>
      )}
      {hasVerticalHelperText && (
        <div className={`${prefix}--form__helper-text`} style={{ marginBottom: "0.375rem" }}>
          {helperText}
        </div>
      )}
      <RadioButtonGroup
        className={isVertical && verticalWrapped ? `${prefix}--bmrg-radio-group__container` : undefined}
        defaultSelected={defaultSelected}
        disabled={disabled}
        name={name}
        onChange={onChange}
        orientation={orientation}
        valueSelected={value}
        {...radioGroupProps}
      >
        {options.map((option) => (
          <RadioButton
            disabled={option.disabled}
            id={option.value}
            key={option.value}
            labelText={option.labelText}
            value={option.value}
            {...radioButtonProps}
          />
        ))}
      </RadioButtonGroup>
      {hasHorizontalHelperText && <div className={`${prefix}--form__helper-text`}>{helperText}</div>}
    </div>
  );
}

export default RadioGroupComponent;
