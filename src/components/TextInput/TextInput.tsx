import React from "react";
import { TextInput } from "@carbon/react";
import { Information } from "@carbon/react/icons";
import TooltipHover from "../TooltipHover";
import { prefix } from "../../internal/settings";
import type { TooltipHoverProps } from  "../TooltipHover";

type Props = React.ComponentPropsWithRef<"input"> & {
  tooltipClassName?: string;
  tooltipContent?: React.ReactNode;
  tooltipProps?: TooltipHoverProps;
  defaultValue?: string | number;
  helperText?: React.ReactNode;
  hideLabel?: boolean;
  inline?: boolean;
  invalid?: boolean;
  invalidText?: React.ReactNode;
  label?: React.ReactNode;
  labelText?: React.ReactNode;
  light?: boolean;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
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
