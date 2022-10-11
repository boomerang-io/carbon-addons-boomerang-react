import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import ReactModal from "react-modal";
import { prefix } from "../../internal/settings";

Modal.propTypes = {
  /**
   * The selector for the element that the modal attaches to, usually the #id of the document body
   */
  appElement: PropTypes.string,
  children: PropTypes.any,
  /**
   * Classname to apply to the modal
   */
  className: PropTypes.string,
  /**
   * Classname to apply to the full-screen container element that the modal is inside
   */
  containerClassName: PropTypes.string,
  isOpen: PropTypes.bool,
};

Modal.defaultProps = {
  appElement: "#app",
  isOpen: false,
};

export function Modal(props) {
  const { appElement, className, containerClassName, children, ...rest } = props;

  React.useEffect(() => {
    ReactModal.setAppElement(appElement);
  }, [appElement]);

  return (
    <>
      <ReactModal
        shouldCloseOnOverlayClick
        closeTimeoutMS={240}
        isOpen={props.isOpen}
        htmlOpenClassName={`${prefix}--bmrg-html-modal-is-open`}
        bodyOpenClassName={`${prefix}--bmrg-body-modal-is-open`}
        className={{
          base: cx(`${prefix}--bmrg-modal-container`, containerClassName),
          afterOpen: "--is-open",
          beforeClose: "--is-closed",
        }}
        portalClassName={`${prefix}--bmrg-modal-portal`}
        overlayClassName={{
          base: cx(`${prefix}--bmrg-modal-overlay`, className),
          afterOpen: "--is-open",
          beforeClose: "--is-closed",
        }}
        {...rest}
      >
        {children}
      </ReactModal>
    </>
  );
}

export default Modal;
