import React from "react";
import cx from "classnames";
import Downshift from "downshift";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import isEqual from "lodash.isequal";
import { prefix } from "../../internal/settings";
import { WarningFilled } from "@carbon/react/icons";
import { Tag } from "@carbon/react";
import ListBox, { PropTypes as ListBoxPropTypes } from "../../internal/ListBox";
import { isAccessibleKeyDownEvent } from "../../tools/accessibility";
import { mapDownshiftProps } from "../../tools/createPropAdapter";
import setupGetInstanceId from "../../tools/setupGetInstanceId";

const defaultItemToString = (item: any) => {
  if (typeof item === "string") {
    return item;
  }

  return item && item.label;
};

const defaultShouldFilterItem = ({ item, selectedItems, itemToString, inputValue }: any) => {
  let keepItem = true;
  const itemString = itemToString(item);
  if (
    selectedItems.some((selectedItem: any) => itemString === itemToString(selectedItem)) ||
    !itemString.toLowerCase().includes(inputValue.toLowerCase())
  ) {
    keepItem = false;
  }

  return keepItem;
};

const getInputValue = (state: any) => {
  return state.inputValue || "";
};

const getInstanceId = setupGetInstanceId();

type OwnMultiSelectComboBoxProps = {
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  id: string;
  initialSelectedItems?: any[];
  selectedItems?: any[];
  items: any[];
  itemToString?: (...args: any[]) => any;
  itemToElement?: (...args: any[]) => any;
  titleText?: any;
  helperText?: string;
  tagProps?: any;
  onInputBlur?: (...args: any[]) => any;
  onChange: (...args: any[]) => any;
  open?: boolean;
  placeholder: string;
  shouldFilterItem?: (...args: any[]) => any;
  invalid?: boolean;
  invalidText?: string;
  translateWithId?: (...args: any[]) => any;
  onInputChange?: (...args: any[]) => any;
  type?: ListBoxPropTypes.ListBoxType;
  light?: boolean;
  downshiftProps?: any; // TODO: PropTypes.shape(Downshift.propTypes)
};

type MultiSelectComboBoxState = any;

type MultiSelectComboBoxProps = OwnMultiSelectComboBoxProps & typeof MultiSelectComboBox.defaultProps;

export default class MultiSelectComboBox extends React.Component<MultiSelectComboBoxProps, MultiSelectComboBoxState> {
  static defaultProps = {
    disabled: false,
    itemToString: defaultItemToString,
    shouldFilterItem: defaultShouldFilterItem,
    initialSelectedItems: [],
    itemToElement: null,
    type: "default",
    ariaLabel: "Choose an item",
    light: false,
  };

  comboBoxInstanceId: any;
  inputNode: any;
  textInput: any;

  constructor(props: MultiSelectComboBoxProps) {
    super(props);

    this.textInput = React.createRef();

    this.comboBoxInstanceId = getInstanceId();

    this.state = {
      inputValue: getInputValue({}),
      isOpen: (props as any).open ?? false,
      stateSelectedItems: (props as any).initialSelectedItems || (props as any).selectedItems,
    };
  }

  //eslint disable-next-line
  static getDerivedStateFromProps(nextProps: any, state: any) {
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

  filterItems = (items: any, selectedItems: any, itemToString: any, inputValue: any) => {
    const { shouldFilterItem } = this.props;

    return shouldFilterItem
      ? // @ts-expect-error TS(2349): This expression is not callable.
        items.filter((item: any) =>
          shouldFilterItem({
            item,
            selectedItems,
            itemToString,
            inputValue,
          })
        )
      : items;
  };

  handleOnInputKeyDown = (event: any) => {
    event.stopPropagation();
  };

  handleOnInputValueChange = (inputValue: any) => {
    const { onInputChange } = this.props;
    this.setState(
      () => ({
        // Default to empty string if we have a false-y `inputValue`
        inputValue: inputValue || "",
      }),
      () => {
        if (onInputChange) {
          // @ts-expect-error TS(2349): This expression is not callable.
          onInputChange(inputValue);
        }
      }
    );
  };

  handleOnChange = (item: any) => {
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

    if (typeof (this.props as any).onChange === "function") {
      (this.props as any).onChange({ selectedItems });
    }
  };

  onToggleClick = (isOpen: any) => (event: any) => {
    if ((this.props as any).onToggleClick) {
      (this.props as any).onToggleClick(event);
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

    if (typeof (this.props as any).onChange === "function") {
      (this.props as any).onChange({ selectedItems: [] });
    }
  };

  handleInputBlur = (e: any) => {
    (this.props as any).onInputBlur && (this.props as any).onInputBlur(e);
    this.closeMenu();
  };

  handleOnStateChange = (changes: any) => {
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
      // @ts-expect-error TS(2700): Rest types may only be created from object types.
      ...rest
    } = this.props;
    const { stateSelectedItems, isOpen } = this.state;
    // @ts-expect-error TS(2339): Property 'Field' does not exist on type 'ForwardRe... Remove this comment to see the full error message
    const { Field, Selection, Menu, MenuItem, MenuIcon } = ListBox;

    const selectedItems = propsSelectedItems || stateSelectedItems; // externally controlled if selectedItems props exist

    const className = cx(`${prefix}--combo-box`, containerClassName, {
      [`${prefix}--list-box--up`]: direction === "top",
    });
    const titleClasses = cx(`${prefix}--label`, {
      [`${prefix}--label--disabled`]: disabled,
    });
    const comboBoxHelperId = !helperText ? undefined : `combobox-helper-text-${this.comboBoxInstanceId}`;
    const helperClasses = cx(`${prefix}--form__helper-text`, {
      [`${prefix}--form__helper-text--disabled`]: disabled,
    });
    const wrapperClasses = cx(`${prefix}--list-box__wrapper`);
    const inputClasses = cx(`${prefix}--text-input`, {
      [`${prefix}--text-input--empty`]: !this.state.inputValue,
    });
    const ItemToElement = itemToElement;
    return (
      <Downshift
        {...mapDownshiftProps(downshiftProps)}
        onChange={this.handleOnChange}
        onInputValueChange={this.handleOnInputValueChange}
        inputValue={this.state.inputValue || ""}
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
            {/* @ts-expect-error TS(2741): Property 'type' is missing in type '{ children: (f... Remove this comment to see the full error message */}
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
                  (selectedItems as any).map((item: any, index: any) => {
                    // @ts-expect-error TS(2349): This expression is not callable.
                    const itemString = itemToString(item);
                    // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
                    return (
                      <Tag
                        key={`${itemString}-${index}`}
                        disabled={disabled}
                        type="teal"
                        onClick={() => this.handleOnChange(item)}
                        onKeyDown={(e: any) => isAccessibleKeyDownEvent(e) && this.handleOnChange(item)}
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
                {invalid && <WarningFilled size={16} className={`${prefix}--list-box__invalid-icon`} />}
                {(inputValue || (selectedItems as any).length > 0) && (
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
                <Menu id={id} {...getMenuProps({ "aria-label": ariaLabel })}>
                  {this.filterItems(items, selectedItem, itemToString, inputValue).map((item: any, index: any) => {
                    const itemProps = getItemProps({ item, index });
                    // @ts-expect-error TS(2349): This expression is not callable.
                    return (
                      <MenuItem
                        key={itemProps.id}
                        isHighlighted={highlightedIndex === index}
                        title={itemToElement ? item.text : itemToString(item)}
                        {...itemProps}
                      >
                        {/* @ts-expect-error TS(2604): JSX element type 'ItemToElement' does not have any... Remove this comment to see the full error message */}
                        {itemToElement ? <ItemToElement key={itemToString(item)} {...item} /> : itemToString(item)}
                      </MenuItem>
                    );
                  })}
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
