import React, { useState, useEffect } from "react";
import cx from "classnames";
import { prefix } from "../../internal/settings";
import { Button, ModalHeader, ModalBody, ModalFooter } from "@carbon/react";

import Modal from "../Modal";

ConfirmModal.defaultProps = {
  affirmativeText: "Yes",
  modalTrigger: () => {},
  negativeText: "No",
  selectorPrimaryFocus: `button[id="${prefix}--bmrg-confirm-modal-primary-button"]`,
  title: "Are you sure?",
};

type OwnProps = {
  affirmativeAction?: (...args: any[]) => any;
  affirmativeButtonProps?: any;
  affirmativeText?: string;
  appElement?: string;
  children?: React.ReactNode;
  containerClassName?: string;
  isExternallyControlled?: boolean;
  isOpen?: boolean;
  label?: string;
  modalProps?: any;
  modalTrigger?: (...args: any[]) => any;
  negativeAction?: (...args: any[]) => any;
  negativeButtonProps?: any;
  negativeText?: string;
  onCloseModal?: (...args: any[]) => any;
  selectorPrimaryFocus?: string;
  title?: string;
};

type Props = OwnProps & typeof ConfirmModal.defaultProps;

function ConfirmModal(props: Props) {
  const {
    affirmativeAction,
    affirmativeButtonProps,
    affirmativeText,
    appElement,
    children,
    containerClassName,
    isExternallyControlled,
    label,
    modalProps,
    modalTrigger,
    negativeAction,
    negativeButtonProps,
    negativeText,
    onCloseModal,
    selectorPrimaryFocus,
    title,
  } = props;

  const [isOpen, setIsOpen] = useState(props.isOpen);

  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);

  function closeModal() {
    if (typeof onCloseModal === "function") {
      onCloseModal();
    }
    setIsOpen(false);
  }

  function handleAffirmativeAction() {
    if (typeof affirmativeAction === "function") {
      affirmativeAction();
    }
    if (!isExternallyControlled) closeModal();
  }

  function handleNegativeAction() {
    if (typeof negativeAction === "function") {
      negativeAction();
    }
    if (!isExternallyControlled) closeModal();
  }

  return (
    <>
      {modalTrigger({ openModal: () => setIsOpen(true) })}
      <Modal
        appElement={appElement}
        containerClassName={cx(`${prefix}--bmrg-confirm-modal-container`, containerClassName)}
        isOpen={isOpen}
        onRequestClose={closeModal}
        closeTimeoutMS={240}
        shouldCloseOnOverlayClick
        selectorPrimaryFocus={selectorPrimaryFocus}
        {...modalProps}
      >
        <ModalHeader closeModal={closeModal} iconDescription="Close" label={label} title={title} />
        <div id="confirm-modal-container">
          <ModalBody>
            <div className={`${prefix}--modal-content__text`}>{children}</div>
          </ModalBody>
        </div>
        <ModalFooter>
          <Button
            id={`${prefix}--bmrg-confirm-modal-secondary-button`}
            kind="secondary"
            onClick={handleNegativeAction}
            {...negativeButtonProps}
          >
            {negativeText}
          </Button>
          <Button
            id={`${prefix}--bmrg-confirm-modal-primary-button`}
            onClick={handleAffirmativeAction}
            {...affirmativeButtonProps}
          >
            {affirmativeText}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ConfirmModal;
