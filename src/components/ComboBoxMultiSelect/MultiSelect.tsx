import React from "react";
import cx from "classnames";
import Downshift, { DownshiftProps } from "downshift";
import isEqual from "lodash.isequal";
import { prefix } from "../../internal/settings";
import { WarningFilled } from "@carbon/react/icons";
import { Tag } from "@carbon/react";
import * as ListBoxComponents from "../../internal/ListBox";
import type { ListBoxType, ListBoxSize } from "../../internal/ListBox/ListBoxTypes";
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

export type MultiSelectComboBoxProps = {
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  direction?: "top" | "bottom";
  id: string;
  initialSelectedItems?: any[];
  selectedItems?: any[];
  items?: any[];
  itemToString?: (...args: any[]) => any;
  itemToElement?: React.FC;
  titleText?: any;
  helperText?: string;
  tagProps?: any;
  onChange?: (...args: any[]) => any;
  onKeyUp?: (...args: any[]) => any;
  onInputBlur?: (...args: any[]) => any;
  onToggleClick?: (event: any) => any;
  open?: boolean;
  placeholder: string;
  shouldFilterItem?: (...args: any[]) => any;
  invalid?: boolean;
  invalidText?: string;
  translateWithId?: (...args: any[]) => any;
  onInputChange?: (...args: any[]) => any;
  type?: ListBoxType;
  light?: boolean;
  downshiftProps?: DownshiftProps<any>;
  size?: ListBoxSize;
};
export default class MultiSelectComboBox extends React.Component<MultiSelectComboBoxProps, any> {
  static defaultProps = {
    itemToString: defaultItemToString,
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
      isOpen: props.open ?? false,
      stateSelectedItems: props.initialSelectedItems || props.selectedItems || [],
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
    const { shouldFilterItem = defaultShouldFilterItem } = this.props;

    return shouldFilterItem
      ? items.filter((item: any) =>
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

    if (typeof this.props.onChange === "function") {
      this.props.onChange({ selectedItems });
    }
  };

  onToggleClick = (isOpen: any) => (event: any) => {
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

    if (typeof this.props.onChange === "function") {
      this.props.onChange({ selectedItems: [] });
    }
  };

  handleInputBlur = (e: any) => {
    this.props.onInputBlur && this.props.onInputBlur(e);
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
      ariaLabel = "Choose an item",
      className: containerClassName,
      disabled = false,
      direction,
      downshiftProps,
      id,
      invalid,
      invalidText,
      items,
      itemToString = defaultItemToString,
      itemToElement,
      initialSelectedItems,
      titleText,
      helperText,
      placeholder,
      onChange,
      onInputBlur,
      onInputChange,
      light = false,
      selectedItems: propsSelectedItems,
      size,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      shouldFilterItem = defaultShouldFilterItem,
      tagProps,
      translateWithId,
      type = "default",
      ...rest
    } = this.props;
    const { stateSelectedItems, isOpen } = this.state;
    const {
      ListBox,
      ListBoxField: Field,
      ListBoxSelection: Selection,
      ListBoxMenu: Menu,
      ListBoxMenuItem: MenuItem,
      ListBoxMenuIcon: MenuIcon,
    } = ListBoxComponents;

    // externally controlled if selectedItems props exist
    const selectedItems = propsSelectedItems || stateSelectedItems;

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
            <ListBox
              className={className}
              disabled={disabled}
              invalid={invalid}
              aria-label={ariaLabel}
              invalidText={invalidText}
              isOpen={isOpen}
              light={light}
              type={type}
              size={size}
            >
              <div className={`${prefix}--bmrg-multi-select-selected`}>
                {Array.isArray(selectedItems) &&
                  (selectedItems as any).map((item: any, index: any) => {
                    const itemString = itemToString(item);
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
                  tabIndex={0}
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
                    return (
                      <MenuItem
                        key={itemProps.id}
                        isHighlighted={highlightedIndex === index}
                        title={itemToElement ? item.text : itemToString(item)}
                        {...itemProps}
                      >
                        {typeof ItemToElement !== "undefined" ? (
                          <ItemToElement key={itemToString(item)} {...item} />
                        ) : (
                          itemToString(item)
                        )}
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
