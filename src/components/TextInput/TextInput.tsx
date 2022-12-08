import React from "react";
import TooltipHover from "../TooltipHover";
import { TextInput } from "@carbon/react";
import { Information } from "@carbon/react/icons";
import { prefix } from "../../internal/settings";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  autoComplete?: string;
  tooltipClassName?: string;
  tooltipContent?: React.ReactNode;
  tooltipProps?: any;
  className?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  helperText?: React.ReactNode;
  hideLabel?: boolean;
  id?: string;
  inline?: boolean;
  invalid?: boolean;
  invalidText?: React.ReactNode;
  label?: React.ReactNode;
  labelText?: React.ReactNode;
  light?: boolean;
  name?: string;
  onBlur?: (...args: any[]) => any;
  onChange?: (...args: any[]) => any;
  onClick?: (...args: any[]) => any;
  placeholder?: string;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
  type?: string;
  value?: string | number;
  warn?: boolean;
  warnText?: React.ReactNode;
};

const TextInputComponent = React.forwardRef<any, Props>(function TextInputComponent(
  {
    id,
    label,
    labelText,
    tooltipClassName = `${prefix}--bmrg-text-input__tooltip`,
    tooltipContent,
    tooltipProps = { direction: "top" },
    ...textInputProps
  },
  ref
) {
  const labelValue = label || labelText;
  return (
    <div key={id} className={`${prefix}--bmrg-text-input`}>
      <TextInput
        id={id}
        labelText={
          labelValue && (
            <div className={`${prefix}--bmrg-text-input__label`}>
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
        ref={ref}
        {...textInputProps}
      />
    </div>
  );
});

export default TextInputComponent;
