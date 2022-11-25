import React from "react";
import cx from "classnames";
import ReactModal from "react-modal";
import { prefix } from "../../internal/settings";

Modal.defaultProps = {
  appElement: "#app",
  isOpen: false,
};

type OwnProps = {
  appElement?: string;
  children?: any;
  className?: string;
  containerClassName?: string;
  isOpen?: boolean;
};

type Props = OwnProps & typeof Modal.defaultProps;

export function Modal(props: Props) {
  const { appElement, className, containerClassName, children, isOpen, ...rest } = props;

  React.useEffect(() => {
    ReactModal.setAppElement(appElement);
  }, [appElement]);

  return (
    <>
      <ReactModal
        shouldCloseOnOverlayClick
        closeTimeoutMS={240}
        isOpen={isOpen}
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
