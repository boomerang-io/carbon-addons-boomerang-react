import React, { useState, useEffect } from "react";
import { Button, ModalHeader, ModalBody, ModalFooter } from "@carbon/react";
import cx from "classnames";
import Modal from "../Modal";
import { prefix } from "../../internal/settings";
import type { ModalTrigger } from "types";
import type { Props as ModalProps } from "../Modal";

export type Props = {
  affirmativeAction?: () => any;
  affirmativeButtonProps?: React.ComponentPropsWithRef<"button">;
  affirmativeText?: React.ReactNode;
  appElement?: string;
  children?: React.ReactNode;
  containerClassName?: string;
  isExternallyControlled?: boolean;
  isOpen?: boolean;
  label?: string;
  modalProps?: Omit<ModalProps, "isOpen">;
  modalTrigger?: ModalTrigger;
  negativeAction?: () => any;
  negativeButtonProps?: React.ComponentPropsWithRef<"button">;
  negativeText?: React.ReactNode;
  onCloseModal?: () => any;
  selectorPrimaryFocus?: string;
  title?: string;
};

function ConfirmModal(props: Props) {
  const {
    affirmativeAction,
    affirmativeButtonProps,
    affirmativeText = "Yes",
    appElement,
    children,
    containerClassName,
    isExternallyControlled,
    label,
    modalProps,
    modalTrigger = () => void 0,
    negativeAction,
    negativeButtonProps,
    negativeText = "No",
    onCloseModal,
    selectorPrimaryFocus = `button[id="${prefix}--bmrg-confirm-modal-primary-button"]`,
    title = "Are you sure?",
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
        closeTimeoutMS={240}
        //@ts-ignore
        isOpen={isOpen}
        onRequestClose={closeModal}
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
