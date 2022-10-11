import React from "react";
import PropTypes from "prop-types";
import Downshift from "downshift";
import { PropTypes as ListBoxPropTypes } from "../../internal/ListBox";
import cx from "classnames";
import TooltipHover from "../TooltipHover";
import { Information } from "@carbon/react/icons";
import { prefix } from "../../internal/settings";
import { ComboBox } from "@carbon/react";

ComboBoxComponent.propTypes = {
  /**
   * Disable the ability to clear the selection
   */
  disableClear: PropTypes.bool,
  /**
   * Alias for titleText
   */
  labelText: PropTypes.node,
  /**
   * Alias for titleText
   */
  label: PropTypes.node,
  /**
   * Specify your own filtering logic by passing in a `shouldFilterItem`
   * function that takes in the current input and an item and passes back
   * whether or not the item should be filtered. False will disable sorting
   */
  shouldFilterItem: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
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
  //**Carbon ComboBox proptypes */
  /**
   * 'aria-label' of the ListBox component.
   */
  ariaLabel: PropTypes.string,

  /**
   * An optional className to add to the container node
   */
  className: PropTypes.string,

  /**
   * Specify the direction of the combobox dropdown. Can be either top or bottom.
   */
  direction: PropTypes.oneOf(["top", "bottom"]),

  /**
   * Specify if the control should be disabled, or not
   */
  disabled: PropTypes.bool,

  /**
   * Additional props passed to Downshift
   */
  downshiftProps: PropTypes.shape(Downshift.propTypes),

  /**
   * Provide helper text that is used alongside the control label for
   * additional help
   */
  helperText: PropTypes.string,

  /**
   * Specify a custom `id` for the input
   */
  id: PropTypes.string.isRequired,

  /**
   * Allow users to pass in an arbitrary item or a string (in case their items are an array of strings)
   * from their collection that are pre-selected
   */
  initialSelectedItem: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),

  /**
   * Specify if the currently selected value is invalid.
   */
  invalid: PropTypes.bool,

  /**
   * Message which is displayed if the value is invalid.
   */
  invalidText: PropTypes.node,

  /**
   * Optional function to render items as custom components instead of strings.
   * Defaults to null and is overridden by a getter
   */
  itemToElement: PropTypes.func,

  /**
   * Helper function passed to downshift that allows the library to render a
   * given item to a string label. By default, it extracts the `label` field
   * from a given item to serve as the item label in the list
   */
  itemToString: PropTypes.func,

  /**
   * We try to stay as generic as possible here to allow individuals to pass
   * in a collection of whatever kind of data structure they prefer
   */
  items: PropTypes.array.isRequired,

  /**
   * should use "light theme" (white background)?
   */
  light: PropTypes.bool,

  /**
   * `onChange` is a utility for this controlled component to communicate to a
   * consuming component when a specific dropdown item is selected.
   * @param {{ selectedItem }}
   */
  onChange: PropTypes.func.isRequired,

  /**
   * Callback function to notify consumer when the text input changes.
   * This provides support to change available items based on the text.
   * @param {string} inputText
   */
  onInputChange: PropTypes.func,

  /**
   * Helper function passed to Downshift that allows the user to observe internal
   * state changes
   */
  onStateChange: PropTypes.func,

  /**
   * Callback function that fires when the combobox menu toggle is clicked
   * @param {MouseEvent} event
   */
  onToggleClick: PropTypes.func,

  /**
   * Used to provide a placeholder text node before a user enters any input.
   * This is only present if the control has no items selected
   */
  placeholder: PropTypes.string,

  /**
   * For full control of the selection
   */
  selectedItem: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]),

  /**
   * Specify the size of the ListBox. Currently supports either `sm`, `md` or `lg` as an option.
   */
  size: ListBoxPropTypes.ListBoxSize,

  /**
   * Provide text to be used in a `<label>` element that is tied to the
   * combobox via ARIA attributes.
   */
  titleText: PropTypes.node,

  /**
   * Specify a custom translation function that takes in a message identifier
   * and returns the localized string for the message
   */
  translateWithId: PropTypes.func,

  /**
   * Currently supports either the default type, or an inline variant
   */
  type: ListBoxPropTypes.ListBoxType,

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};

ComboBoxComponent.defaultProps = {
  disableClear: false,
  tooltipClassName: `${prefix}--bmrg-select__tooltip`,
  tooltipProps: { direction: "top" },
};

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
}) {
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
  const defaultInputChange = (input) => {
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
  const defaultShouldFilterItem = ({ item, inputValue }) => {
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
