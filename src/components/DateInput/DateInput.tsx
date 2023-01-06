import React from "react";
import cx from "classnames";
import TooltipHover from "../TooltipHover";
import type { TooltipHoverProps } from  "../TooltipHover";
import { DatePicker, DatePickerInput } from "@carbon/react";
import { Information } from "@carbon/react/icons";
import { DATE_TYPES } from "../../constants/DataDrivenInputTypes";
import { prefix } from "../../internal/settings";

type DATE_TYPE = typeof DATE_TYPES[keyof typeof DATE_TYPES];

type Props = {
  id: string;
  dateFormat?: string;
  datePickerProps?: any;
  disabled?: boolean;
  helperText?: string;
  invalid?: boolean;
  max?: string;
  min?: string;
  label?: string;
  labelText?: string;
  name?: string;
  onCalendarChange?: (...args: any[]) => any;
  onChange?: (...args: any[]) => any;
  readOnly?: boolean;
  tooltipClassName?: string;
  tooltipContent?: React.ReactNode;
  tooltipProps?: TooltipHoverProps;
  type?: DATE_TYPE;
  value: string | string[];
};

const DateInputComponent = React.forwardRef<any, Props>(function DateInputComponent(
  {
    id,
    dateFormat,
    datePickerProps = {},
    disabled,
    helperText,
    invalid,
    label,
    labelText,
    max,
    min,
    onCalendarChange,
    onChange,
    readOnly,
    tooltipClassName = `${prefix}--bmrg-date-input__tooltip`,
    tooltipContent,
    tooltipProps = { direction: "top" },
    type = DATE_TYPES.DATE,
    value,
    ...dateInputProps
  },
  ref
) {
  const labelValue = label || labelText;

  const dateInputHelperId = !helperText ? undefined : `date-input-helper-text-${id}`;
  const helperClasses = cx(`${prefix}--form__helper-text`, {
    [`${prefix}--form__helper-text--disabled`]: disabled,
  });

  if (type === DATE_TYPES.DATE_RANGE) {
    /** Add support for csv strings */
    const finalValue = typeof value === "string" ? value.split(",") : value;

    return (
      <div className={`${prefix}--bmrg-date-input`}>
        {labelValue && (
          <div className={`${prefix}--label ${prefix}--bmrg-date-input__label`}>
            <div>{labelValue}</div>
            {tooltipContent && (
              <div className={tooltipClassName}>
                <TooltipHover tooltipContent={tooltipContent} {...tooltipProps}>
                  <Information size={16} fill="currentColor" />
                </TooltipHover>
              </div>
            )}
          </div>
        )}
        <DatePicker
          key={id}
          allowInput={!readOnly}
          className={`${prefix}--bmrg-date-picker`}
          dateFormat={dateFormat}
          datePickerType="range"
          maxDate={max}
          minDate={min}
          onChange={typeof onCalendarChange === "function" ? onCalendarChange : onChange}
          value={finalValue}
          {...datePickerProps}
        >
          <DatePickerInput
            id={`${id}-start`}
            autoComplete="off"
            disabled={disabled || readOnly}
            invalid={invalid}
            labelText=""
            readOnly={readOnly}
            ref={ref}
            style={{ width: "100%" }}
            pattern=".*"
            {...dateInputProps}
          />
          <DatePickerInput
            id={`${id}-end`}
            autoComplete="off"
            disabled={disabled || readOnly}
            invalid={invalid}
            labelText=""
            readOnly={readOnly}
            ref={ref}
            style={{ width: "100%" }}
            pattern=".*"
            {...dateInputProps}
          />
        </DatePicker>
        {helperText && !invalid && (
          <div id={dateInputHelperId} className={helperClasses}>
            {helperText}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className={`${prefix}--bmrg-date-input`}>
        <DatePicker
          key={id}
          allowInput={!readOnly}
          className={`${prefix}--bmrg-date-picker`}
          dateFormat={dateFormat}
          datePickerType="single"
          maxDate={max}
          minDate={min}
          onChange={onCalendarChange}
          value={value}
          {...datePickerProps}
        >
          <DatePickerInput
            id={id}
            disabled={disabled || readOnly}
            invalid={invalid}
            onChange={onChange}
            labelText={
              labelValue && (
                <div className={`${prefix}--bmrg-date-input__label`}>
                  <div>{labelValue}</div>
                  {tooltipContent && (
                    <div className={tooltipClassName}>
                      <TooltipHover tooltipContent={tooltipContent} {...tooltipProps}>
                        <Information size={16} fill="currentColor" />
                      </TooltipHover>
                    </div>
                  )}
                </div>
              )
            }
            readOnly={readOnly}
            ref={ref}
            style={{ width: "100%" }}
            pattern=".*"
            {...dateInputProps}
          />
        </DatePicker>
        {helperText && !invalid && (
          <div id={dateInputHelperId} className={helperClasses}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
});

export default DateInputComponent;
