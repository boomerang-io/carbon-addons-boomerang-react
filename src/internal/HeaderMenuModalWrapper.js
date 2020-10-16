/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, ComposedModal } from 'carbon-components-react';
import FocusTrap from 'react-focus-trap';

export default class HeaderMenuModalWrapper extends React.Component {
  static propTypes = {
    status: PropTypes.string,
    handleOpen: PropTypes.func,
    children: PropTypes.func,
    id: PropTypes.string,
    buttonTriggerText: PropTypes.node,
    buttonTriggerClassName: PropTypes.string,
    disabled: PropTypes.bool,
    onKeyDown: PropTypes.func,
    selectorPrimaryFocus: PropTypes.string,
    renderTriggerButtonIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    secondaryButtonText: PropTypes.string,
    triggerButtonIcon: PropTypes.string,
    triggerButtonIconDescription: PropTypes.string,
    triggerButtonKind: PropTypes.oneOf(['primary', 'secondary', 'danger', 'ghost', 'tertiary']),
  };

  static defaultProps = {
    triggerButtonIconDescription: 'Provide icon description if icon is used',
    triggerButtonKind: 'primary',
    disabled: false,
    selectorPrimaryFocus: '[data-modal-primary-focus]',
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
    this.setState({ isOpen: false }, () => this.triggerButton.current.focus());
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
      selectorPrimaryFocus,
      ...other
    } = this.props;

    const props = {
      ...other,
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
        <FocusTrap onExit={this.handleClose} active={this.state.isOpen}>
          <ComposedModal {...props}>{children({ closeModal: this.handleClose })}</ComposedModal>
        </FocusTrap>
      </div>
    );
  }
}
