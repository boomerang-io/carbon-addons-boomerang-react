/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { Button, ComposedModal } from "@carbon/react";

type OwnProps = {
    status?: string;
    handleOpen?: (...args: any[]) => any;
    id?: string;
    buttonTriggerText?: React.ReactNode;
    buttonTriggerClassName?: string;
    disabled?: boolean;
    onKeyDown?: (...args: any[]) => any;
    selectorPrimaryFocus?: string;
    renderTriggerButtonIcon?: ((...args: any[]) => any) | any;
    secondaryButtonText?: string;
    triggerButtonIcon?: string;
    triggerButtonIconDescription?: string;
    triggerButtonKind?: "primary" | "secondary" | "danger" | "ghost" | "tertiary";
};

type State = any;

type Props = OwnProps & typeof HeaderMenuModalWrapper.defaultProps;

export default class HeaderMenuModalWrapper extends React.Component<Props, State> {

  static defaultProps = {
    triggerButtonIconDescription: "Provide icon description if icon is used",
    triggerButtonKind: "primary",
    disabled: false,
    selectorPrimaryFocus: "[data-modal-primary-focus]",
    onKeyDown: () => {},
  };

  triggerButton = React.createRef();

  state = {
    isOpen: false,
  };

  handleOpen = () => {
    this.setState({
      isOpen: true,
    });
  };

  handleClose = () => {
    this.setState({ isOpen: false }, () => (this as any).triggerButton.current.focus());
  };

  render() {
    const {
      children,
      onKeyDown,
      buttonTriggerText,
      buttonTriggerClassName,
      renderTriggerButtonIcon,
      triggerButtonIcon,
      triggerButtonIconDescription,
      triggerButtonKind,
      disabled,
      // @ts-expect-error TS(2339): Property 'preventCloseOnClickOutside' does not exi... Remove this comment to see the full error message
      preventCloseOnClickOutside,
      selectorPrimaryFocus,
      ...other
    } = this.props;

    const props = {
      ...other,
      preventCloseOnClickOutside,
      selectorPrimaryFocus,
      onClose: this.handleClose,
      open: this.state.isOpen,
    };

    return (
      <div
        role="presentation"
        onKeyDown={(evt) => {
          if (evt.which === 27) {
            this.handleClose();
            onKeyDown(evt);
          }
        }}
      >
        <Button
          className={buttonTriggerClassName}
          disabled={disabled}
          kind={triggerButtonKind}
          renderIcon={renderTriggerButtonIcon}
          icon={triggerButtonIcon}
          iconDescription={triggerButtonIconDescription}
          onClick={this.handleOpen}
          ref={this.triggerButton}
        >
          {buttonTriggerText}
        </Button>
        {/* @ts-expect-error TS(2349): This expression is not callable. */}
        <ComposedModal {...props}>{children({ closeModal: this.handleClose })}</ComposedModal>
      </div>
    );
  }
}
