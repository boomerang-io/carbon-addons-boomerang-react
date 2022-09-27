import React, { Component } from "react";
import PropTypes from "prop-types";
import { ToastContainer, Slide } from "react-toastify";
import { Close } from "@carbon/react/icons";
import { prefix } from "../../internal/settings";
import { injectStyle } from "react-toastify/dist/inject-style";
injectStyle();

// eslint-disable-next-line
const CloseButton = ({ closeToast }) => <Close size={20} onClick={closeToast} />;
CloseButton.propTypes = { closeToast: PropTypes.func };

class NotificationsContainer extends Component {
  static propTypes = {
    transition: PropTypes.func,
    autoClose: PropTypes.number,
    closeOnClick: PropTypes.bool,
    pauseOnHover: PropTypes.bool,
    draggablePercent: PropTypes.number,
    hideProgressBar: PropTypes.bool,
  };

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
