import React from "react";
import cx from "classnames";
import TooltipHover from "../TooltipHover";
import { Information } from "@carbon/react/icons";
import { prefix } from "../../internal/settings";
import MultiSelect from "./MultiSelect";

ComboBoxMultiSelect.defaultProps = {
  disableClear: false,
  tooltipClassName: `${prefix}--bmrg-multi-select__tooltip`,
  tooltipProps: { direction: "top" },
};

/**
 * For now we expect that if the prop value is a csv string,
 * then the items would be either in the key:value or value:label format.
 * The prop value would contain either the keys in the key:value or values in the value:label.
 */
function getFilteredItems({ items, selectedItems }: any) {
  return items.filter((item: any) =>
    selectedItems.some((selectedItem: any) => selectedItem === item.key || selectedItem === item.value)
  );
}

/*
(ts-migrate) TODO: Migrate the remaining prop types
...MultiSelect.propTypes
*/
type OwnProps = {
  disableClear?: boolean;
  id: string;
  labelText?: string;
  label?: string;
  titleText?: string;
  tooltipClassName?: string;
  tooltipContent?: React.ReactNode;
  tooltipProps?: any;
  initialSelectedItems: any;
  items: any;
  selectedItems: any;
};

type Props = OwnProps & typeof ComboBoxMultiSelect.defaultProps;

function ComboBoxMultiSelect({
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
}: Props) {
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
                    <Information size={16} fill="currentColor" />
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

export default ComboBoxMultiSelect;