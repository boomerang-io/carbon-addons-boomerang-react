/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { settings } from 'carbon-components';
// import WarningFilled16 from '@carbon/icons-react/lib/warning--filled/16';
import { WarningFilled16 } from '@carbon/icons-react';
import ListBox, {
  PropTypes as ListBoxPropTypes,
} from 'carbon-components-react/lib/components/ListBox';

const { prefix } = settings;

const defaultItemToString = (item) => {
  if (typeof item === 'string') {
    return item;
  }

  return item && item.label;
};

const defaultShouldFilterItem = ({ item, inputValue }) => {
  if (typeof item === 'string') {
    return item.toLowerCase().includes(inputValue.toLowerCase());
  }
  if (item && item.label) {
    return item.label.toLowerCase().includes(inputValue.toLowerCase());
  }
  return item;
};

const getInputValue = (props, state) => {
  if (props.initialSelectedItem) {
    return props.itemToString(props.initialSelectedItem);
  }

  return state.inputValue || '';
};

const findHighlightedIndex = ({ items, itemToString }, inputValue) => {
  if (!inputValue) {
    return -1;
  }

  const searchValue = inputValue.toLowerCase();

  for (let i = 0; i < items.length; i++) {
    const item = itemToString(items[i]).toLowerCase();
    if (item.indexOf(searchValue) !== -1) {
      return i;
    }
  }

  return -1;
};

export default class ComboBox extends React.Component {
  static propTypes = {
    /**
     * 'aria-label' of the ListBox component.
     */
    ariaLabel: PropTypes.string,

    /**
     * An optional className to add to the container node
     */
    className: PropTypes.string,

    /**
     * Specify if the control should be disabled, or not
     */
    disabled: PropTypes.bool,
    helperText: PropTypes.string,

    /**
     * Specify a custom `id` for the input
     */
    id: PropTypes.string.isRequired,

    /**
     * Allow users to pass in an arbitrary item or a string (in case their items are an array of strings)
     * from their collection that are pre-selected
     */
    initialSelectedItem: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),

    /**
     * We try to stay as generic as possible here to allow individuals to pass
     * in a collection of whatever kind of data structure they prefer
     */
    items: PropTypes.array.isRequired,

    /**
     * Helper function passed to downshift that allows the library to render a
     * given item to a string label. By default, it extracts the `label` field
     * from a given item to serve as the item label in the list
     */
    itemToString: PropTypes.func,

    /**
     * Optional function to render items as custom components instead of strings.
     * Defaults to null and is overriden by a getter
     */
    itemToElement: PropTypes.func,

    /**
     * `onChange` is a utility for this controlled component to communicate to a
     * consuming component when a specific dropdown item is selected.
     * @param {{ selectedItem }}
     */
    onChange: PropTypes.func.isRequired,
    onSelectItem: PropTypes.func,

    /**
     * Used to provide a placeholder text node before a user enters any input.
     * This is only present if the control has no items selected
     */
    placeholder: PropTypes.string.isRequired,

    /**
     * Specify your own filtering logic by passing in a `shouldFilterItem`
     * function that takes in the current input and an item and passes back
     * whether or not the item should be filtered.
     */
    shouldFilterItem: PropTypes.func,

    /**
     * Specify if the currently selected value is invalid.
     */
    invalid: PropTypes.bool,

    /**
     * Message which is displayed if the value is invalid.
     */
    invalidText: PropTypes.string,

    /**
     * Specify a custom translation function that takes in a message identifier
     * and returns the localized string for the message
     */
    translateWithId: PropTypes.func,

    titleText: PropTypes.node,
    /**
     * Currently supports either the default type, or an inline variant
     */
    type: ListBoxPropTypes.ListBoxType,

    /**
     * Callback function to notify consumer when the text input changes.
     * This provides support to change available items based on the text.
     * @param {string} inputText
     */
    onInputChange: PropTypes.func,

    /**
     * should use "light theme" (white background)?
     */
    light: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
    itemToElement: null,
    itemToString: defaultItemToString,
    type: 'default',
    ariaLabel: 'Choose an item',
    light: false,
    shouldFilterItem: defaultShouldFilterItem,
  };

  constructor(props) {
    super(props);

    this.textInput = React.createRef();

    this.state = {
      inputValue: getInputValue(props, {}),
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState((state) => ({
      inputValue: getInputValue(nextProps, state),
    }));
  }

  // TB: added here only use the filter if the user has entered a value
  // removed default prop for filter so component can easily know when to filter or not
  filterItems = (items, itemToString, inputValue) => {
    const { hasEnteredSearchValue } = this.state;
    const { shouldFilterItem } = this.props;

    return shouldFilterItem && hasEnteredSearchValue
      ? items.filter((item) =>
          shouldFilterItem({
            item,
            itemToString,
            inputValue,
          })
        )
      : items;
  };

  handleOnChange = (selectedItem) => {
    if (this.props.onChange) {
      this.props.onChange({ selectedItem });
    }
  };

  handleOnSelectItem = (selectedItem) => {
    if (this.props.onSelectItem) {
      this.props.onSelectItem({ selectedItem });
    }
  };

  // TB: Set has entered value to true so the filter is used
  // clear out the input value so they are typing a new word. The selected item remains as is.
  // Adding in the selectedItem here just to show that it isn't changing
  handleOnInputKeyDown = (event) => {
    event.stopPropagation();
    const { onInputChange, shouldFilterItem } = this.props;
    if (onInputChange || shouldFilterItem) {
      if (this.state.isFirstKeyDownEvent) {
        this.setState(() => ({
          hasEnteredSearchValue: true,
          isFirstKeyDownEvent: false,
        }));
      } else {
        this.setState(() => ({ hasEnteredSearchValue: true }));
      }
    }
  };

  handleOnInputValueChange = (inputValue, { setHighlightedIndex }) => {
    const { onInputChange, shouldFilterItem } = this.props;

    // If you are filtering down the results we can assume you want the first one to be hightlighted by default
    // The current highlight matching function doesn't work well for filtered components
    setHighlightedIndex(
      onInputChange || shouldFilterItem ? 0 : findHighlightedIndex(this.props, inputValue)
    );

    this.setState(
      () => ({
        // Default to empty string if we have a false-y `inputValue`
        inputValue: inputValue || '',
      }),
      () => {
        if (onInputChange) {
          onInputChange(inputValue);
        }
      }
    );
  };

  onToggleClick = (isOpen) => (event) => {
    if (event.target === this.textInput.current && isOpen) {
      event.preventDownshiftDefault = true;
      event.persist();
    }
    const { hasEnteredSearchValue } = this.state;

    // TB: need to emit event for a controlled component to update if they are
    // filtering the options based on the input
    const { onInputChange, shouldFilterItem } = this.props;
    if (onInputChange) {
      onInputChange(''); // Could move this to the keydown if you don't want to clear until typing starts or remove if we don't want to support
    }

    // TB: added here. If they did start typing to filter, reset things when toggling menu
    if (onInputChange || shouldFilterItem) {
      if (hasEnteredSearchValue) {
        this.setState(() => ({
          hasEnteredSearchValue: false,
          isFirstKeyDownEvent: true,
        }));
      } else {
        this.setState(() => ({
          inputValue: '', // Could move this to the keydown if you don't want to clear until typing starts
        }));
      }
    }
  };

  render() {
    const {
      className: containerClassName,
      disabled,
      id,
      items,
      itemToElement,
      itemToString,
      titleText,
      helperText,
      placeholder,
      initialSelectedItem,
      ariaLabel,
      translateWithId,
      invalid,
      invalidText,
      light,
      type, // eslint-disable-line no-unused-vars
      shouldFilterItem, // eslint-disable-line no-unused-vars
      onChange, // eslint-disable-line no-unused-vars
      onInputChange, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;
    const className = cx(`${prefix}--combo-box`, containerClassName);
    const titleClasses = cx(`${prefix}--label`, {
      [`${prefix}--label--disabled`]: disabled,
    });
    const title = titleText ? (
      <label htmlFor={id} className={titleClasses}>
        {titleText}
      </label>
    ) : null;
    const helperClasses = cx(`${prefix}--form__helper-text`, {
      [`${prefix}--form__helper-text--disabled`]: disabled,
    });
    const helper = helperText ? <div className={helperClasses}>{helperText}</div> : null;
    const wrapperClasses = cx(`${prefix}--list-box__wrapper`);

    // needs to be Capitalized for react to render it correctly
    const ItemToElement = itemToElement;
    const input = (
      <Downshift
        onChange={this.handleOnChange}
        onSelectItem={this.handleOnSelectItem}
        onInputValueChange={this.handleOnInputValueChange}
        inputValue={this.state.inputValue || ''}
        itemToString={itemToString}
        defaultSelectedItem={initialSelectedItem}
      >
        {({
          getButtonProps,
          getInputProps,
          getItemProps,
          getRootProps,
          isOpen,
          inputValue,
          selectedItem,
          highlightedIndex,
          clearSelection,
        }) => (
          <ListBox
            className={className}
            disabled={disabled}
            invalid={invalid}
            invalidText={invalidText}
            isOpen={isOpen}
            light={light}
            {...getRootProps({ refKey: 'innerRef' })}
          >
            <ListBox.Field
              id={id}
              {...getButtonProps({
                disabled,
                onClick: this.onToggleClick(isOpen),
              })}
            >
              {invalid && <WarningFilled16 className={`${prefix}--list-box__invalid-icon`} />}
              <input
                className={`${prefix}--text-input`}
                aria-label={ariaLabel}
                aria-controls={`${id}__menu`}
                aria-autocomplete="list"
                ref={this.textInput}
                // onClick={clearSelection} //TB: Causes what I presume is an undesired render w/ the value cleared
                {...rest}
                {...getInputProps({
                  disabled,
                  id,
                  placeholder,
                  onKeyDown: this.handleOnInputKeyDown,
                })}
              />
              {inputValue && (
                <ListBox.Selection
                  clearSelection={clearSelection}
                  translateWithId={translateWithId}
                />
              )}
              <ListBox.MenuIcon isOpen={isOpen} translateWithId={translateWithId} />
            </ListBox.Field>
            {isOpen && (
              <ListBox.Menu aria-label={ariaLabel} id={id}>
                {this.filterItems(items, itemToString, inputValue).map((item, index) => {
                  const itemProps = getItemProps({ item, index });
                  return (
                    <ListBox.MenuItem
                      key={itemToString(item)}
                      isActive={selectedItem === item}
                      isHighlighted={highlightedIndex === index || false}
                      title={itemToElement ? item.text : itemToString(item)}
                      {...itemProps}
                    >
                      {itemToElement ? (
                        <ItemToElement key={itemProps.id} {...item} />
                      ) : (
                        itemToString(item)
                      )}
                    </ListBox.MenuItem>
                  );
                })}
              </ListBox.Menu>
            )}
          </ListBox>
        )}
      </Downshift>
    );

    return (
      <div className={wrapperClasses}>
        {title}
        {helper}
        {input}
      </div>
    );
  }
}
