/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { Information } from "@carbon/react/icons";
import cx from "classnames";
import MultiSelect from "./MultiSelect";
import TooltipHover from "../TooltipHover";
import { prefix } from "../../internal/settings";
import type { TooltipHoverProps } from  "../TooltipHover";
import type { MultiSelectComboBoxProps } from "./MultiSelect";

/**
 * For now we expect that if the prop value is a csv string,
 * then the items would be either in the key:value or value:label format.
 * The prop value would contain either the keys in the key:value or values in the value:label.
 */
function getFilteredItems({ items, selectedItems }: { items: any[]; selectedItems: any[] }) {
  return items.filter((item: any) =>
    selectedItems.some((selectedItem: any) => selectedItem === item.key || selectedItem === item.value)
  );
}

type Props = Omit<MultiSelectComboBoxProps, "initialSelectedItems"> & {
  disableClear?: boolean;
  id: string;
  labelText?: string;
  label?: string;
  initialSelectedItems?: string | any[];
  items?: any;
  readOnly?: boolean;
  selectedItems?: string | any[];
  titleText?: string;
  tooltipClassName?: string;
  tooltipContent?: React.ReactNode;
  tooltipProps?: TooltipHoverProps;
};

function ComboBoxMultiSelect({
  disableClear = false,
  id,
  initialSelectedItems,
  items,
  label,
  labelText,
  selectedItems,
  titleText,
  tooltipClassName = `${prefix}--bmrg-multi-select__tooltip`,
  tooltipContent,
  tooltipProps = { direction: "top" },
  ...multiSelectProps
}: Props) {
  const labelValue = titleText || label || labelText;
  let finalInitialSelectedItems = initialSelectedItems;
  let finalSelectedItems = selectedItems;

  /** Add support for csv strings */
  if (typeof finalInitialSelectedItems === "string") {
    const initialSelectedItemsArray = finalInitialSelectedItems.split(",");
    finalInitialSelectedItems = getFilteredItems({ items, selectedItems: initialSelectedItemsArray });
  }

  if (typeof finalSelectedItems === "string") {
    const selectedItemsArray = finalSelectedItems.split(",");
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
