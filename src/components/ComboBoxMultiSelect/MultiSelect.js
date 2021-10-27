import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import isEqual from 'lodash.isequal';
import { settings } from 'carbon-components';
import { WarningFilled16 } from '@carbon/icons-react';
import { Tag } from 'carbon-components-react';
import ListBox, {
  PropTypes as ListBoxPropTypes,
} from 'carbon-components-react/lib/components/ListBox';
import { isAccessibleKeyDownEvent } from '../../tools/accessibility';
import { mapDownshiftProps } from '../../tools/createPropAdapter';
import setupGetInstanceId from '../../tools/setupGetInstanceId';

const { prefix } = settings;

const defaultItemToString = (item) => {
  if (typeof item === 'string') {
    return item;
  }

  return item && item.label;
};

const defaultShouldFilterItem = ({ item, selectedItems, itemToString, inputValue }) => {
  let keepItem = true;
  const itemString = itemToString(item);
  if (
    selectedItems.some((selectedItem) => itemString === itemToString(selectedItem)) ||
    !itemString.toLowerCase().includes(inputValue.toLowerCase())
  ) {
    keepItem = false;
  }

  return keepItem;
};

const getInputValue = (state) => {
  return state.inputValue || '';
};

const getInstanceId = setupGetInstanceId();

export default class MultiSelectComboBox extends React.Component {
  static propTypes = {
    ariaLabel: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
    initialSelectedItems: PropTypes.array,
    selectedItems: PropTypes.array,
    items: PropTypes.array.isRequired,
    itemToString: PropTypes.func,
    itemToElement: PropTypes.func,
    titleText: PropTypes.any,
    helperText: PropTypes.string,
    tagProps: PropTypes.object,
    onInputBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    open: PropTypes.bool,
    placeholder: PropTypes.string.isRequired,
    shouldFilterItem: PropTypes.func,
    invalid: PropTypes.bool,
    invalidText: PropTypes.string,
    translateWithId: PropTypes.func,
    onInputChange: PropTypes.func,
    type: ListBoxPropTypes.ListBoxType,
    light: PropTypes.bool,
    downshiftProps: PropTypes.shape(Downshift.propTypes),
  };

  static defaultProps = {
    disabled: false,
    itemToString: defaultItemToString,
    shouldFilterItem: defaultShouldFilterItem,
    initialSelectedItems: [],
    itemToElement: null,
    type: 'default',
    ariaLabel: 'Choose an item',
    light: false,
  };

  constructor(props) {
    super(props);

    this.textInput = React.createRef();

    this.comboBoxInstanceId = getInstanceId();

    this.state = {
      inputValue: getInputValue({}),
      isOpen: props.open,
      stateSelectedItems: props.initialSelectedItems || props.selectedItems,
    };
  }

  //eslint disable-next-line
  static getDerivedStateFromProps(nextProps, state) {
    /**
     * programmatically control this `open` prop
     */
    const { open } = nextProps;
    const { prevOpen } = state;
    return prevOpen === open
      ? { inputValue: getInputValue(state) }
      : {
          isOpen: open,
          prevOpen: open,
          inputValue: getInputValue(state),
        };
  }

  filterItems = (items, selectedItems, itemToString, inputValue) => {
    const { shouldFilterItem } = this.props;

    return shouldFilterItem
      ? items.filter((item) =>
          shouldFilterItem({
            item,
            selectedItems,
            itemToString,
            inputValue,
          })
        )
      : items;
  };

  handleOnInputKeyDown = (event) => {
    event.stopPropagation();
  };

  handleOnInputValueChange = (inputValue) => {
    const { onInputChange } = this.props;
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

  handleOnChange = (item) => {
    if (!item) {
      return;
    }

    const selectedItems = [...this.state.stateSelectedItems];

    let selectedIndex;
    selectedItems.forEach((selectedItem, index) => {
      if (isEqual(selectedItem, item)) {
        selectedIndex = index;
      }
    });

    if (selectedIndex === undefined) {
      selectedItems.push(item);
    } else {
      selectedItems.splice(selectedIndex, 1);
    }

    this.setState({ stateSelectedItems: selectedItems });

    if (typeof this.props.onChange === 'function') {
      this.props.onChange({ selectedItems });
    }
  };

  onToggleClick = (isOpen) => (event) => {
    if (this.props.onToggleClick) {
      this.props.onToggleClick(event);
    }

    if (event.target === this.textInput.current && isOpen) {
      event.preventDownshiftDefault = true;
      event.persist();
    }
  };

  openMenu = () => {
    this.setState({ isOpen: true });
  };

  closeMenu = () => {
    this.setState({ isOpen: false });
  };

  handleClearSelection = () => {
    this.setState({ stateSelectedItems: [] });

    if (typeof this.props.onChange === 'function') {
      this.props.onChange({ selectedItems: [] });
    }
  };

  handleInputBlur = (e) => {
    this.props.onInputBlur && this.props.onInputBlur(e);
    this.closeMenu();
  };

  handleOnStateChange = (changes) => {
    const { type } = changes;
    switch (type) {
      case Downshift.stateChangeTypes.keyDownEscape:
      case Downshift.stateChangeTypes.mouseUp:
        this.setState({ isOpen: false });
        break;
      // Opt-in to some cases where we should be toggling the menu based on
      // a given key press or mouse handler
      // Reference: https://github.com/paypal/downshift/issues/206
      case Downshift.stateChangeTypes.clickButton:
      case Downshift.stateChangeTypes.keyDownSpaceButton:
        this.setState(() => {
          let nextIsOpen = changes.isOpen || false;

          if (changes.isOpen === false) {
            // If Downshift is trying to close the menu, but we know the input
            // is the active element in the document, then keep the menu open
            if (this.inputNode === document.activeElement) {
              nextIsOpen = true;
            }
          }

          return {
            isOpen: nextIsOpen,
          };
        });
        break;
      default:
        break;
    }
  };

  render() {
    const {
      className: containerClassName,
      disabled,
      id,
      items,
      itemToString,
      itemToElement,
      titleText,
      helperText,
      placeholder,
      selectedItems: propsSelectedItems,
      ariaLabel,
      translateWithId,
      invalid,
      invalidText,
      light,
      initialSelectedItems, // eslint-disable-line no-unused-vars
      type, // eslint-disable-line no-unused-vars
      size,
      shouldFilterItem, // eslint-disable-line no-unused-vars
      onChange, // eslint-disable-line no-unused-vars
      onInputBlur,
      onInputChange, // eslint-disable-line no-unused-vars
      downshiftProps,
      tagProps,
      direction,
      ...rest
    } = this.props;
    const { stateSelectedItems, isOpen } = this.state;
    const { Field, Selection, Menu, MenuItem, MenuIcon } = ListBox;

    const selectedItems = propsSelectedItems || stateSelectedItems; // externally controlled if selectedItems props exist

    const className = cx(`${prefix}--combo-box`, containerClassName, {
      [`${prefix}--list-box--up`]: direction === 'top',
    });
    const titleClasses = cx(`${prefix}--label`, {
      [`${prefix}--label--disabled`]: disabled,
    });
    const comboBoxHelperId = !helperText
      ? undefined
      : `combobox-helper-text-${this.comboBoxInstanceId}`;
    const helperClasses = cx(`${prefix}--form__helper-text`, {
      [`${prefix}--form__helper-text--disabled`]: disabled,
    });
    const wrapperClasses = cx(`${prefix}--list-box__wrapper`);
    const inputClasses = cx(`${prefix}--text-input`, {
      [`${prefix}--text-input--empty`]: !this.state.inputValue,
    });
    const ItemToElement = itemToElement; // Capitalize

    return (
      <Downshift
        {...mapDownshiftProps(downshiftProps)}
        onChange={this.handleOnChange}
        onInputValueChange={this.handleOnInputValueChange}
        inputValue={this.state.inputValue || ''}
        isOpen={isOpen}
        itemToString={itemToString}
        onStateChange={this.handleOnStateChange}
        onOuterClick={this.closeMenu}
        selectedItem={selectedItems}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          getToggleButtonProps,
          isOpen,
          inputValue,
          selectedItem,
          highlightedIndex,
          clearSelection,
        }) => (
          <div className={wrapperClasses}>
            {titleText && (
              <label htmlFor={id} className={titleClasses} {...getLabelProps()}>
                {titleText}
              </label>
            )}
            <ListBox
              className={className}
              disabled={disabled}
              invalid={invalid}
              aria-label={ariaLabel}
              invalidText={invalidText}
              isOpen={isOpen}
              light={light}
              size={size}
            >
              <div className={`${prefix}--bmrg-multi-select-selected`}>
                {Array.isArray(selectedItems) &&
                  selectedItems.map((item, index) => {
                    const itemString = itemToString(item);
                    return (
                      <Tag
                        key={`${itemString}-${index}`}
                        disabled={disabled}
                        type="teal"
                        onClick={() => this.handleOnChange(item)}
                        onKeyDown={(e) => isAccessibleKeyDownEvent(e) && this.handleOnChange(item)}
                        filter
                        {...tagProps}
                      >
                        {itemString}
                      </Tag>
                    );
                  })}
              </div>
              <Field
                id={id}
                disabled={disabled}
                translateWithId={translateWithId}
                {...getToggleButtonProps({
                  disabled,
                  onClick: this.onToggleClick(isOpen),
                })}
              >
                <input
                  className={inputClasses}
                  aria-label={ariaLabel}
                  aria-controls={`${id}__menu`}
                  aria-autocomplete="list"
                  tabIndex="0"
                  ref={this.textInput}
                  {...rest}
                  {...getInputProps({
                    disabled,
                    id,
                    placeholder,
                    onKeyDown: this.handleOnInputKeyDown,
                    onFocus: this.openMenu,
                    onBlur: this.handleInputBlur,
                  })}
                />
                {invalid && <WarningFilled16 className={`${prefix}--list-box__invalid-icon`} />}
                {(inputValue || selectedItems.length > 0) && (
                  <Selection
                    clearSelection={clearSelection}
                    onClearSelection={this.handleClearSelection}
                    disabled={disabled}
                    translateWithId={translateWithId}
                  />
                )}
                <MenuIcon isOpen={isOpen} translateWithId={translateWithId} />
              </Field>
              {isOpen && (
                <Menu id={id} {...getMenuProps({ 'aria-label': ariaLabel })}>
                  {this.filterItems(items, selectedItem, itemToString, inputValue).map(
                    (item, index) => {
                      const itemProps = getItemProps({ item, index });
                      return (
                        <MenuItem
                          key={itemProps.id}
                          isHighlighted={highlightedIndex === index}
                          title={itemToElement ? item.text : itemToString(item)}
                          {...itemProps}
                        >
                          {itemToElement ? (
                            <ItemToElement key={itemToString(item)} {...item} />
                          ) : (
                            itemToString(item)
                          )}
                        </MenuItem>
                      );
                    }
                  )}
                </Menu>
              )}
            </ListBox>
            {helperText && !invalid && (
              <div id={comboBoxHelperId} className={helperClasses}>
                {helperText}
              </div>
            )}
          </div>
        )}
      </Downshift>
    );
  }
}
