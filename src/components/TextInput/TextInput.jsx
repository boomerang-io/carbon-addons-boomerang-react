import React from "react";
import PropTypes from "prop-types";
import TooltipHover from "../TooltipHover";
import { TextInput } from "@carbon/react";
import { Information } from "@carbon/react/icons";
import { prefix } from "../../internal/settings";

console.log(TextInput);

const TextInputComponent = React.forwardRef(function TextInputComponent(
  { id, label, labelText, tooltipClassName, tooltipContent, tooltipProps, ...textInputProps },
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

TextInputComponent.propTypes = {
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
   * Specify an optional className to be applied to the `<input>` node
   */
  className: PropTypes.string,

  /**
   * Optionally provide the default value of the `<input>`
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText: PropTypes.node,

  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  hideLabel: PropTypes.bool,

  /**
   * Specify a custom `id` for the `<input>`
   */
  id: PropTypes.string.isRequired,

  /**
   * `true` to use the inline version.
   */
  inline: PropTypes.bool,

  /**
   * Specify whether the control is currently invalid
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText: PropTypes.node,

  /**
   * Alias for labelText that has higher precedence
   */
  label: PropTypes.node,
  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: PropTypes.node,

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   */
  light: PropTypes.bool,

  /**
   * Optionally provide an `onChange` handler that is called whenever `<input>`
   * is updated
   */
  onChange: PropTypes.func,

  /**
   * Optionally provide an `onClick` handler that is called whenever the
   * `<input>` is clicked
   */
  onClick: PropTypes.func,

  /**
   * Specify the placeholder attribute for the `<input>`
   */
  placeholder: PropTypes.string,

  /**
   * Whether the input should be read-only
   */
  readOnly: PropTypes.bool,

  /**
   * Specify the size of the Text Input. Currently supports the following:
   */
  size: PropTypes.oneOf(["sm", "md", "lg"]),

  /**
   * Specify the type of the `<input>`
   */
  type: PropTypes.string,

  /**
   * Specify the value of the `<input>`
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};

TextInputComponent.defaultProps = {
  tooltipClassName: `${prefix}--bmrg-text-input__tooltip`,
  tooltipProps: { direction: "top" },
};

export default TextInputComponent;
