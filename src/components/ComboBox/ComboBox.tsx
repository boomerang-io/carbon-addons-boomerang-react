import React from "react";
import Downshift from "downshift";
import { PropTypes as ListBoxPropTypes } from "../../internal/ListBox";
import cx from "classnames";
import TooltipHover from "../TooltipHover";
import { Information } from "@carbon/react/icons";
import { prefix } from "../../internal/settings";
import { ComboBox } from "@carbon/react";

ComboBoxComponent.defaultProps = {
  disableClear: false,
  tooltipClassName: `${prefix}--bmrg-select__tooltip`,
  tooltipProps: { direction: "top" },
};

type OwnProps = {
  disableClear?: boolean;
  labelText?: React.ReactNode;
  label?: React.ReactNode;
  shouldFilterItem?: ((...args: any[]) => any) | boolean;
  tooltipClassName?: string;
  tooltipContent?: React.ReactNode;
  tooltipProps?: any;
  ariaLabel?: string;
  className?: string;
  direction?: "top" | "bottom";
  disabled?: boolean;
  downshiftProps?: any; // TODO: PropTypes.shape(Downshift.propTypes)
  helperText?: string;
  id: string;
  initialSelectedItem?: any | string | number;
  invalid?: boolean;
  invalidText?: React.ReactNode;
  itemToElement?: (...args: any[]) => any;
  itemToString?: (...args: any[]) => any;
  items: any[];
  light?: boolean;
  onChange: (...args: any[]) => any;
  onInputChange?: (...args: any[]) => any;
  onStateChange?: (...args: any[]) => any;
  onToggleClick?: (...args: any[]) => any;
  placeholder?: string;
  selectedItem?: any | string | number;
  size?: any; // TODO: ListBoxPropTypes.ListBoxSize
  titleText?: React.ReactNode;
  translateWithId?: (...args: any[]) => any;
  type?: any; // TODO: ListBoxPropTypes.ListBoxType
  warn?: boolean;
  warnText?: React.ReactNode;
};

type Props = OwnProps & typeof ComboBoxComponent.defaultProps;

function ComboBoxComponent({
  disableClear,
  id,
  label,
  labelText,
  titleText,
  tooltipClassName,
  tooltipContent,
  tooltipProps,
  onChange,
  onInputChange,
  shouldFilterItem,
  ...restComboBoxProps
}: Props) {
  // Set the initial selected item to the label or single value passed
  const selectedItemRef = React.useRef(
    restComboBoxProps.initialSelectedItem?.label ?? restComboBoxProps.initialSelectedItem
  );
  const queryRef = React.useRef(selectedItemRef.current);
  const [hasQuery, setHasQuery] = React.useState(false);

  // Support several props for the label text
  const labelValue = titleText || label || labelText;

  /**
   * The following three functions are to support a better ComboBox filtering experience
   * than the default or passing a `shouldFilterItem` function. With the latter, if you have a selected item
   * only that will be displayed if you do a naive filtering of the input.
   * We want to:
   * 1. Filter options based on the input text and plain value or label of the item
   * 2. After selecting a value, show all options when opening the combobox without having to clear the selection
   * 3. Filter the values when you enter a query with an item selected
   */

  /**
   * Keep track of the selected value with a ref so it doesn' re-render and to ensure that
   * onInputChange has a fresh value. `onChange` is called, then `onInputChange` when selecting an item
   */
  const defaultOnChange = React.useCallback(
    ({ selectedItem }) => {
      if (!selectedItem) {
        selectedItemRef.current = selectedItem;
      }

      if (typeof selectedItem === "string" || typeof selectedItem === "number") {
        selectedItemRef.current = selectedItem;
      } else {
        selectedItemRef.current = selectedItem?.label;
      }

      // Additional check if the onInputChange function is not called
      // Isn't triggered if the query value matches the selected one
      if (queryRef.current === selectedItemRef.current) {
        setHasQuery(false);
      }

      // Call consumer
      if (onChange) {
        onChange({ selectedItem });
      }
    },
    [onChange]
  );

  /**
   * When an item is selected, the `onInputChange` handler is called with the value selected
   * so it is difficult to disambiguate between a keydown event and a select event
   * Take a simple approach here. If the selectedItem and input values match, there isn't a query
   * If they don't, there is a query. We use this to determine if we should filter the values.
   */
  const defaultInputChange = (input: any) => {
    queryRef.current = input;
    if (input !== selectedItemRef.current) {
      setHasQuery(true);
    } else {
      setHasQuery(false);
    }
    // Call consumer
    if (onInputChange) {
      onInputChange(input);
    }
  };

  /**
   * Determine if I should filter the items or not
   * Selected value and no query means show everything, otherwise filter based on the input
   * No point in optimizing this because re-renders will only occur on query changes
   * and we need fresh values on those events to determine how to filter
   */
  const defaultShouldFilterItem = ({ item, inputValue }: any) => {
    if (selectedItemRef.current && !hasQuery) {
      return true;
    }

    if (typeof item === "string" || typeof item === "number") {
      return String(item).toLowerCase().includes(inputValue?.toLowerCase());
    }

    if (item && item.label) {
      return String(item.label).toLowerCase().includes(inputValue?.toLowerCase());
    }

    return item;
  };

  /**
   * If a function is passed, use that
   * If a false or null value is explicitely passed, then use default filtering behavior in component
   * Otherwise use our filtering logic as the new default
   */
  let finalShouldFilterItem;
  if (typeof shouldFilterItem === "function") {
    finalShouldFilterItem = shouldFilterItem;
  } else if (shouldFilterItem === false || shouldFilterItem === null) {
    finalShouldFilterItem = undefined;
  } else {
    finalShouldFilterItem = defaultShouldFilterItem;
  }

  return (
    <div key={id} className={cx(`${prefix}--bmrg-select`, { "--disableClear": disableClear })}>
      <ComboBox
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
        onChange={defaultOnChange}
        onInputChange={defaultInputChange}
        shouldFilterItem={finalShouldFilterItem}
        {...restComboBoxProps}
      />
    </div>
  );
}

export default ComboBoxComponent;
