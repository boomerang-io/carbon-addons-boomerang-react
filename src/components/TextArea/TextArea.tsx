import React from "react";
import { TextArea } from "@carbon/react";
import TooltipHover from "../TooltipHover";
import { Information } from "@carbon/react/icons";
import { prefix } from "../../internal/settings";

type Props = {
  tooltipClassName?: string;
  tooltipContent?: React.ReactNode;
  tooltipProps?: any;
  className?: string;
  cols?: number;
  defaultValue?: string | number;
  disabled?: boolean;
  enableCounter?: boolean;
  helperText?: React.ReactNode;
  hideLabel?: boolean;
  id?: string;
  invalid?: boolean;
  invalidText?: React.ReactNode;
  label?: string;
  labelText: React.ReactNode;
  light?: boolean;
  max?: string | number;
  maxCount?: number;
  onChange?: (...args: any[]) => any;
  onClick?: (...args: any[]) => any;
  placeholder?: string;
  rows?: number;
  value?: string | number;
};

const TextAreaComponent = React.forwardRef<any, Props>(function TextAreaComponent(
  {
    id,
    label,
    labelText,
    max,
    maxCount,
    tooltipClassName = `${prefix}--bmrg-text-area__tooltip`,
    tooltipContent,
    tooltipProps = { direction: "top" },
    value,
    ...textAreaProps
  },
  ref
) {
  const labelValue = label || labelText;
  const maxValue = max ?? maxCount;

  // False for null and undefined. We help consumers out by allowing them to pass a max
  const enableCounter = maxValue != null;

  return (
    <div key={id} className={`${prefix}--bmrg-text-area`}>
      <TextArea
        id={id}
        labelText={
          labelValue && (
            <div style={{ display: "flex" }}>
              <div>{labelValue}</div>
              {tooltipContent && (
                <div className={tooltipClassName}>
                  <TooltipHover {...tooltipProps} tooltipText={tooltipContent}>
                    <Information size={16} fill="currentColor" />
                  </TooltipHover>
                </div>
              )}
            </div>
          )
        }
        ref={ref}
        value={value}
        maxCount={maxValue}
        enableCounter={enableCounter}
        {...textAreaProps}
      />
    </div>
  );
});

export default TextAreaComponent;
