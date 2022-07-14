import React, { useState } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "@carbon/react";
import TooltipHover from "../TooltipHover";
import { Information } from "@carbon/react/icons";
import { prefix } from "../../internal/settings";



CheckboxListComponent.propTypes = {
  checkboxProps: PropTypes.object,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  id: PropTypes.string,
  initialSelectedItems: PropTypes.array,
  label: PropTypes.string,
  labelText: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  selectedItems: PropTypes.array,
  tooltipClassName: PropTypes.string,
  tooltipContent: PropTypes.any,
  tooltipProps: PropTypes.object,
};

CheckboxListComponent.defaultProps = {
  initialSelectedItems: [],
  tooltipClassName: `${prefix}--bmrg-checkbox-list__tooltip`,
  tooltipProps: { direction: "top" },
};

function CheckboxListComponent({
  checkboxProps,
  disabled,
  helperText,
  id,
  initialSelectedItems,
  label,
  labelText,
  onChange,
  options,
  selectedItems: propsSelectedItems,
  tooltipClassName,
  tooltipContent,
  tooltipProps,
}) {
  const [stateSelectedItems, setSelectedItems] = useState(initialSelectedItems);

  const selectedItems = propsSelectedItems || stateSelectedItems; // Externally controlled if selectedItems props exists

  const handleCheckboxChange = (event, { checked: value, id }) => {
    let newSelectedItems = [...stateSelectedItems];

    if (value) {
      newSelectedItems.push(id);
    } else {
      newSelectedItems = newSelectedItems.filter((item) => item !== id);
    }

    setSelectedItems(newSelectedItems);

    if (typeof onChange === "function") {
      onChange(value, id, event, newSelectedItems);
    }
  };

  const labelValue = label || labelText;

  const labelTextId = !labelValue ? undefined : `${id}-label`;

  return (
    <div key={id} className={`${prefix}--bmrg-checkbox-list`}>
      {labelValue && (
        <div className={`${prefix}--bmrg-checkbox-list__title`}>
          <div id={labelTextId} className={`${prefix}--label`} style={{ marginBottom: ".3125rem" }}>
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
      {helperText && <div className={`${prefix}--form__helper-text`}>{helperText}</div>}

      <div className={`${prefix}--bmrg-checkbox-list__list`}>
        {options.map((option) => {
          const checked = selectedItems.some((item) => item === option.id);
          return (
            <Checkbox
              disabled={disabled}
              key={option.id}
              id={option.id}
              labelText={option.labelText}
              onChange={handleCheckboxChange}
              checked={checked}
              {...checkboxProps}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CheckboxListComponent;
