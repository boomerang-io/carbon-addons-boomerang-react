/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import ReactModal from "react-modal";
import cx from "classnames";
import { prefix } from "../../internal/settings";

export type Props = Omit<ReactModal.Props, "appElement"> & {
  appElement?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  isOpen?: boolean;
};

export function Modal(props: Props) {
  const { appElement = "#app", className, containerClassName, children, isOpen = false, ...rest } = props;

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
