import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import TooltipHover from "../TooltipHover";
import { Information16 } from "@carbon/icons-react";
import { settings } from "carbon-components";

import MultiSelect from "./MultiSelect";

const { prefix } = settings;

MultiSelectComponent.propTypes = {
  disableClear: PropTypes.bool,
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  label: PropTypes.string,
  titleText: PropTypes.string,
  tooltipClassName: PropTypes.string,
  tooltipContent: PropTypes.any,
  tooltipProps: PropTypes.object,
};

MultiSelectComponent.defaultProps = {
  disableClear: false,
  tooltipClassName: `${prefix}--bmrg-multi-select__tooltip`,
  tooltipProps: { direction: "top" },
};

/**
 * For now we expect that if the prop value is a csv string,
 * then the items would be either in the key:value or value:label format.
 * The prop value would contain either the keys in the key:value or values in the value:label.
 */
function getFilteredItems({ items, selectedItems }) {
  return items.filter((item) =>
    selectedItems.some((selectedItem) => selectedItem === item.key || selectedItem === item.value)
  );
}

function MultiSelectComponent({
  disableClear,
  id,
  initialSelectedItems,
  items,
  label,
  labelText,
  selectedItems,
  titleText,
  tooltipClassName,
  tooltipContent,
  tooltipProps,
  ...multiSelectProps
}) {
  const labelValue = titleText || label || labelText;
  let finalInitialSelectedItems = initialSelectedItems;
  let finalSelectedItems = selectedItems;

  /** Add support for csv strings */
  if (typeof initialSelectedItems === "string") {
    const initialSelectedItemsArray = initialSelectedItems.split(",");
    finalInitialSelectedItems = getFilteredItems({ items, selectedItems: initialSelectedItemsArray });
  }

  if (typeof selectedItems === "string") {
    const selectedItemsArray = selectedItems.split(",");
    finalSelectedItems = getFilteredItems({ items, selectedItems: selectedItemsArray });
  }

  return (
    <div key={id} className={cx(`${prefix}--bmrg-multi-select`, { "--disableClear": disableClear })}>
      <MultiSelect
        id={id}
        titleText={
          labelValue && (
            <div style={{ display: "flex" }}>
              <div>{titleText || labelText || label}</div>
              {tooltipContent && (
                <div className={tooltipClassName}>
                  <TooltipHover {...tooltipProps} tooltipText={tooltipContent}>
                    <Information16 fill="#4d5358" />
                  </TooltipHover>
                </div>
              )}
            </div>
          )
        }
        initialSelectedItems={finalInitialSelectedItems}
        selectedItems={finalSelectedItems}
        items={items}
        {...multiSelectProps}
      />
    </div>
  );
}

export default MultiSelectComponent;
