import React from "react";
import { RadioButton, RadioButtonGroup } from "@carbon/react";
import TooltipHover from "../TooltipHover";
import { Information } from "@carbon/react/icons";
import { prefix } from "../../internal/settings";

RadioGroupComponent.defaultProps = {
  columnHeight: "6rem",
  tooltipClassName: `${prefix}--bmrg-radio-group__tooltip`,
  tooltipProps: { direction: "top" },
  verticalWrapped: false,
};

type OwnProps = {
  columnHeight?: string;
  defaultSelected?: string;
  disabled?: boolean;
  helperText?: string;
  id?: string;
  key?: string;
  label?: string;
  labelText?: string;
  name: string;
  onChange: (...args: any[]) => any;
  options: any[];
  orientation?: string;
  radioGroupProps?: any;
  radioButtonProps?: any;
  tooltipClassName?: string;
  tooltipContent?: React.ReactNode;
  tooltipProps?: any;
  value?: string;
  verticalWrapped?: boolean;
};

type Props = OwnProps & typeof RadioGroupComponent.defaultProps;

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
  tooltipClassName,
  tooltipContent,
  tooltipProps,
  value,
  columnHeight,
  verticalWrapped,
}: Props) {
  const labelValue = label || labelText;
  const labelTextId = !labelValue ? undefined : `${id}-label`;

  const isVertical = orientation === "vertical";
  const hasVerticalHelperText = isVertical && helperText;
  const hasHorizontalHelperText = !isVertical && helperText;

  return (
    //Defined a css var --height to be used on the wrapped container to determine the number of radios displayed in each column
    // @ts-expect-error TS(2322): Type '{ "--height": string; }' is not assignable t... Remove this comment to see the full error message
    <div key={id} className={`${prefix}--bmrg-radio-group`} style={{ "--height": columnHeight }}>
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
      {hasVerticalHelperText && <div className={`${prefix}--form__helper-text`}>{helperText}</div>}
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
