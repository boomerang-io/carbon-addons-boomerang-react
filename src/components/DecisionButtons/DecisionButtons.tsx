import React, { useState } from "react";
import cx from "classnames";
import TooltipHover from "../TooltipHover";
import { Information } from "@carbon/react/icons";
import { prefix } from "../../internal/settings";

const ButtonTypes = {
  Negative: "negative",
  Positive: "positive",
};

DecisionButtons.defaultProps = {
  canUncheck: false,
  orientation: "horizontal",
  labelPosition: "right",
  onChange: () => {},
  tooltipClassName: `${prefix}--bmrg-radio-group__tooltip`,
};

type OwnProps = {
  canUncheck?: boolean;
  children?: React.ReactNode;
  className?: string;
  defaultSelected?: string | number;
  disabled?: boolean;
  helperText?: string;
  id?: string;
  items?: any[];
  label?: string;
  labelText?: string;
  name: string;
  onChange?: (...args: any[]) => any;
  orientation?: "horizontal" | "vertical";
  tooltipClassName?: string;
  tooltipContent?: React.ReactNode;
  tooltipProps?: any;
  selectedItem?: string | number;
};

type Props = OwnProps & typeof DecisionButtons.defaultProps;

function DecisionButtons({
  canUncheck,
  className,
  defaultSelected,
  disabled,
  helperText,
  id,
  items,
  label,
  labelText,
  name,
  onChange,
  orientation,
  tooltipClassName,
  tooltipContent,
  tooltipProps,
  selectedItem: propsSelectedItem,
}: Props) {
  const [stateSelected, setSelected] = useState(propsSelectedItem || defaultSelected);

  const selectedItem = propsSelectedItem ?? stateSelected; // Externally controlled if value props exists

  const getDecisionButtons = () => {
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    const children = items.map((item, index) => {
      const { icon: Icon, label, type, value } = item;
      const selected = value === selectedItem;

      const wrapperClasses = cx(`${prefix}--bmrg-decision-button-wrapper`, {
        [`${prefix}--bmrg-decision-button-wrapper--${orientation}`]: orientation === "vertical",
      });

      const contentClasses = cx(`${prefix}--bmrg-decision-button`, {
        [`${prefix}--bmrg-decision-button--positive`]: type === ButtonTypes.Positive,
        [`${prefix}--bmrg-decision-button--negative`]: type === ButtonTypes.Negative,
      });

      return (
        <label className={wrapperClasses} key={`${name}-${value}-${index}`} htmlFor={`${name}-${value}-${index}`}>
          <input
            checked={selected}
            id={`${name}-${value}-${index}`}
            name={name}
            onClick={handleChange}
            readOnly
            type="radio"
            value={value}
          />
          <div className={contentClasses}>
            <span>{label}</span>
            {Icon && <Icon className={`${prefix}--bmrg-decision-button-icon`} />}
          </div>
        </label>
      );
    });

    return children;
  };

  const handleChange = (evt: any) => {
    const { value } = evt.target;
    if (value !== selectedItem) {
      setSelected(value);
      onChange && onChange(value, name, evt);
    } else if (canUncheck) {
      setSelected("");
      onChange && onChange("", name, evt);
    }
  };
  const isVertical = orientation === "vertical";
  const hasVerticalHelperText = isVertical && helperText;
  const hasHorizontalHelperText = !isVertical && helperText;

  const wrapperClasses = cx(`${prefix}--radio-button-group`, className, {
    [`${prefix}--radio-button-group--${orientation}`]: isVertical,
  });

  const labelValue = label || labelText;
  const labelTextId = !labelValue ? undefined : `${id}-label`;

  return (
    <div className={`${prefix}--bmrg-decision-buttons`}>
      {labelValue && (
        <div className={`${prefix}--bmrg-decision-buttons__title`}>
          <div id={labelTextId} className={`${prefix}--label`}>
            {labelValue}
          </div>
          {tooltipContent && (
            <div className={tooltipClassName}>
              <TooltipHover {...tooltipProps} onClick={(e: any) => e.preventDefault()} tooltipText={tooltipContent}>
                <Information size={16} fill="currentColor" />
              </TooltipHover>
            </div>
          )}
        </div>
      )}
      {hasVerticalHelperText && <div className={`${prefix}--form__helper-text`}>{helperText}</div>}
      <div className={`${prefix}--form-item`}>
        {/* @ts-expect-error TS(2322): Type '{ children: Element[]; className: string; di... Remove this comment to see the full error message */}
        <div className={wrapperClasses} disabled={disabled}>
          {getDecisionButtons()}
        </div>
      </div>
      {hasHorizontalHelperText && <div className={`${prefix}--form__helper-text`}>{helperText}</div>}
    </div>
  );
}

export default DecisionButtons;
