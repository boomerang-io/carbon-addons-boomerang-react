import React from "react";
import cx from "classnames";
import { Toggle } from "@carbon/react";
import TooltipHover from "../TooltipHover";
import type { TooltipHoverProps } from  "../TooltipHover";
import { Information } from "@carbon/react/icons";
import { prefix } from "../../internal/settings";

type Props = {
  helperText?: React.ReactNode;
  label?: React.ReactNode;
  orientation?: "vertical" | "horizontal";
  reversed?: boolean;
  tooltipClassName?: string;
  tooltipContent?: React.ReactNode;
  tooltipProps?: TooltipHoverProps;
  className?: string;
  defaultToggled?: boolean;
  disabled?: boolean;
  hideLabel?: boolean;
  id: string;
  labelA?: React.ReactNode;
  labelB?: React.ReactNode;
  labelText?: React.ReactNode;
  name?: string;
  onClick?: (...args: any[]) => any;
  onChange?: (...args: any[]) => any;
  onToggle?: (...args: any[]) => any;
  readOnly?: boolean;
  size?: "sm" | "md";
  toggled?: boolean;
  invalid?: boolean;
  invalidText?: string;
};

function ToggleComponent({
  helperText,
  id,
  invalid,
  invalidText,
  reversed,
  label,
  labelText,
  labelA = "",
  labelB = "",
  orientation = "horizontal",
  tooltipClassName = `${prefix}--bmrg-toggle__tooltip`,
  tooltipContent,
  tooltipProps = { direction: "top" },
  ...toggleProps
}: Props) {
  const labelValue = label || labelText;
  const labelTextId = !labelValue ? undefined : `${id}-label`;
  return (
    <div className={`${prefix}--bmrg-toggle__container`}>
      <div
        key={id}
        className={cx(`${prefix}--bmrg-toggle`, {
          "--reversed": reversed,
          "--vertical": orientation === "vertical",
        })}
      >
        {labelValue && (
          <>
            <div className={`${prefix}--bmrg-toggle__title`}>
              <label id={labelTextId} className={`${prefix}--label`} htmlFor={id} style={{ marginBottom: "0" }}>
                {labelValue}
              </label>
              {tooltipContent && (
                <div className={tooltipClassName}>
                  <TooltipHover {...tooltipProps} tooltipText={tooltipContent}>
                    <Information size={16} fill="currentColor" />
                  </TooltipHover>
                </div>
              )}
            </div>
          </>
        )}
        <Toggle id={id} aria-labelledby={labelTextId} labelA={labelA} labelB={labelB} labelText="" {...toggleProps} />
      </div>
      {invalid && (
        <div
          className={cx(`${prefix}--bmrg-toggle__invalid-text`, `${prefix}--form-requirement`)}
          style={{ marginBottom: "0" }}
        >
          {invalidText}
        </div>
      )}
      {helperText && !invalid && (
        <div className={`${prefix}--form__helper-text`} style={{ marginBottom: "0" }}>
          {helperText}
        </div>
      )}
    </div>
  );
}

export default ToggleComponent;
