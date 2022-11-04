import React from "react";
import cx from "classnames";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
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
  const { appElement, className, containerClassName, children, ...rest } = props;

  React.useEffect(() => {
    ReactModal.setAppElement(appElement);
  }, [appElement]);

  return (
    <>
      <ReactModal
        shouldCloseOnOverlayClick
        closeTimeoutMS={240}
        // @ts-expect-error TS(2783): 'isOpen' is specified more than once, so this usag... Remove this comment to see the full error message
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
