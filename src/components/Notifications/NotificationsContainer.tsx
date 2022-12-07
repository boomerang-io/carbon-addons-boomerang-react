import React, { Component } from "react";
import { ToastContainer, Slide } from "react-toastify";
import { Close } from "@carbon/react/icons";
import { prefix } from "../../internal/settings";
import { injectStyle } from "react-toastify/dist/inject-style";

if (typeof window !== "undefined") {
  injectStyle();
}

type CloseButtonProps = {
  closeToast?: (...args: any[]) => any;
};

const CloseButton = ({ closeToast }: CloseButtonProps) => <Close size={20} onClick={closeToast} />;

type OwnNotificationsContainerProps = {
  containerId?: string;
  enableMultiContainer?: boolean;
  transition?: (...args: any[]) => any;
  autoClose?: number;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggablePercent?: number;
  hideProgressBar?: boolean;
};

type NotificationsContainerProps = OwnNotificationsContainerProps & typeof NotificationsContainer.defaultProps;

class NotificationsContainer extends Component<NotificationsContainerProps> {
  static defaultProps = {
    autoClose: 3000,
    closeOnClick: true,
    draggablePercent: 60,
    hideProgressBar: true,
    pauseOnHover: true,
    transition: Slide,
  };

  render() {
    const { autoClose, closeOnClick, draggablePercent, hideProgressBar, pauseOnHover, transition, ...rest } =
      this.props;

    return (
      <ToastContainer
        className={`${prefix}--bmrg-toastify-container`}
        autoClose={autoClose}
        closeButton={<CloseButton />}
        closeOnClick={closeOnClick}
        draggablePercent={draggablePercent}
        hideProgressBar={hideProgressBar}
        pauseOnHover={pauseOnHover}
        transition={transition}
        {...rest}
      />
    );
  }
}

export default NotificationsContainer;
