import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Toggle } from "@carbon/react";
import TooltipHover from "../TooltipHover";
import { Information } from "@carbon/react/icons";
import { prefix } from "../../internal/settings";

ToggleComponent.propTypes = {
  /**
   * Helper text to match other inputs
   */
  helperText: PropTypes.string,
  /**
   * Alias for labelText
   */
  label: PropTypes.string,
  /**
   * Set the orientation of the toggle, horizontal is the default
   */
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
  /**
   * Change the order of apperance for label and control
   */
  reversed: PropTypes.bool,
  /**
   * Classname to pass to tooltip
   */
  tooltipClassName: PropTypes.string,
  /**
   * Content to display in tooltip
   */
  tooltipContent: PropTypes.node,
  /**
   * Additional props to pass to the tooltip
   */
  tooltipProps: PropTypes.object,
  /**
   * Start Carbon props
   */
  /**
   * Specify a custom className to apply to the form-item node
   */
  className: PropTypes.string,

  /**
   * Specify whether the toggle should be on by default
   */
  defaultToggled: PropTypes.bool,

  /**
   * Whether this control should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,

  /**
   * Provide an id that unique represents the underlying `<button>`
   */
  id: PropTypes.string.isRequired,

  /**
   * Specify the label for the "off" position
   */
  labelA: PropTypes.node,

  /**
   * Specify the label for the "on" position
   */
  labelB: PropTypes.node,

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: PropTypes.node.isRequired,

  /**
   * Provide an event listener that is called when the control is clicked
   */
  onClick: PropTypes.func,

  /**
   * Provide an event listener that is called when the control is toggled
   */
  onToggle: PropTypes.func,

  /**
   * Specify the size of the Toggle. Currently only supports 'sm' or 'md' (default)
   */
  size: PropTypes.oneOf(["sm", "md"]),

  /**
   * Specify whether the control is toggled
   */
  toggled: PropTypes.bool,
};

ToggleComponent.defaultProps = {
  orientation: "horizontal",
  tooltipClassName: `${prefix}--bmrg-toggle__tooltip`,
  tooltipProps: { direction: "top" },
};

function ToggleComponent({
  helperText,
  id,
  invalid,
  invalidText,
  reversed,
  label,
  labelText,
  orientation,
  tooltipClassName,
  tooltipContent,
  tooltipProps,
  ...toggleProps
}) {
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
        <Toggle id={id} aria-labelledby={labelTextId} labelA="" labelB="" {...toggleProps} />
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
