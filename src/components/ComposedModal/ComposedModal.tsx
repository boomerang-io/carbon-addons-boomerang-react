/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React, { useEffect } from "react";
import { ModalHeader } from "@carbon/react";
import cx from "classnames";
import Modal from "../Modal";
import ConfirmModal from "../ConfirmModal";
import { prefix } from "../../internal/settings";
import useSetState from "../../tools/useSetState";
import type { ModalTrigger } from "types";

type Props = {
  appElement?: string;
  children?: (args: {
    closeModal: () => void;
    forceCloseModal: () => void;
    resetInitialState: (arg: Record<string, any>) => void;
    setShouldConfirmModalClose: (shouldConfirmModalClose: boolean) => void;
    shouldConfirmModalClose: boolean;
  }) => React.ReactNode;
  composedModalProps?: Record<string, any>;
  confirmModalProps?: Record<string, any>;
  initialState?: Record<string, any>;
  isOpen?: boolean;
  modalHeaderChildren?: React.ReactNode;
  modalHeaderProps?: Record<string, any>;
  modalTrigger?: ModalTrigger;
  onCloseModal?: () => void;
  size?: "xs" | "sm" | "md" | "lg";
};

export function ComposedModal(props: Props) {
  const { appElement = "#app", composedModalProps = {}, isOpen = false, modalHeaderProps = {} } = props;
  const [state, setState] = useSetState<{
    isConfirmModalOpen: boolean;
    isOpen: boolean;
    shouldConfirmModalClose: boolean;
    step: number;
    [key: string]: any;
  }>({
    isConfirmModalOpen: false,
    isOpen: isOpen,
    shouldConfirmModalClose: false,
    step: 0,
    ...props.initialState,
  });

  // Let it be externally controlled

  useEffect(() => {
    setState({ isOpen });
    // eslint-disable-next-line
  }, [isOpen]);

  /**
   * Reset to initial state
   * and let parent know
   */
  const resetInitialState = (stateUpdate: Record<string, any>) => {
    setState({
      isConfirmModalOpen: false,
      shouldConfirmModalClose: false,
      ...props.initialState,
      ...stateUpdate,
    });
  };

  const handleOpenModal = () => {
    setState({ isOpen: true });
  };

  /**
   * Close modal and call event function for parent if provided
   */
  const handleCloseModal = () => {
    resetInitialState({ isOpen: false });
    if (typeof props.onCloseModal === "function") {
      props.onCloseModal();
    }
  };

  /**
   * Check if should confirm exit with confirm modal or just exit modal flow
   */
  const handleShouldCloseModal = () => {
    if (state.shouldConfirmModalClose) {
      setState({ isConfirmModalOpen: true });
    } else {
      handleCloseModal();
    }
  };

  const closeConfirmModal = () => {
    setState({ isConfirmModalOpen: false });
  };

  /**
   * Method passed to children components and they determine if should confirm exit of modal
   * @param {bool} shouldConfirmModalClose - boolean of current component
   */
  const handleSetShouldConfirmModalClose = (shouldConfirmModalClose: boolean) => {
    setState({ shouldConfirmModalClose });
  };

  const { containerClassName, ...restComposedModalProps } = composedModalProps;

  const { subtitle, ...restModalHeaderProps } = modalHeaderProps;

  return (
    <>
      {props.modalTrigger && props.modalTrigger({ openModal: handleOpenModal })}
      <Modal
        appElement={appElement}
        containerClassName={cx(
          `${prefix}--bmrg-modal-composed-container`,
          `${prefix}--modal-container`,
          props.size ? `${prefix}--modal-container--${props.size}` : "modal-container-fix-width",
          containerClassName
        )}
        isOpen={state.isOpen}
        onRequestClose={handleShouldCloseModal}
        shouldCloseOnOverlayClick={false}
        {...restComposedModalProps}
      >
        <ModalHeader closeModal={handleShouldCloseModal} {...restModalHeaderProps}>
          {subtitle && <p className={`${prefix}--bmrg-modal-composed-subtitle`}>{subtitle}</p>}
        </ModalHeader>
        {state.isOpen &&
          typeof props.children === "function" &&
          props.children({
            closeModal: handleShouldCloseModal,
            forceCloseModal: handleCloseModal,
            resetInitialState: resetInitialState,
            setShouldConfirmModalClose: handleSetShouldConfirmModalClose,
            shouldConfirmModalClose: state.shouldConfirmModalClose,
          })}
        <ConfirmModal
          affirmativeAction={handleCloseModal}
          appElement={appElement}
          negativeAction={closeConfirmModal}
          isOpen={state.isConfirmModalOpen}
          onCloseModal={closeConfirmModal}
          {...props.confirmModalProps}
        />
      </Modal>
    </>
  );
}

export default ComposedModal;
