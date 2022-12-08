import React, { useEffect } from "react";
import useSetState from "../../tools/useSetState";
import cx from "classnames";
import Modal from "../Modal";
import { ModalHeader } from "@carbon/react";
import { prefix } from "../../internal/settings";
import ConfirmModal from "../ConfirmModal";

type Props = {
  appElement?: string;
  children?: (...args: any[]) => any;
  composedModalProps?: any;
  confirmModalProps?: any;
  initialState?: any;
  isOpen?: boolean;
  modalHeaderChildren?: React.ReactElement;
  modalHeaderProps?: any;
  modalTrigger?: (argTypes: { openModal: () => void }) => React.ReactNode;
  onCloseModal?: (...args: any[]) => any;
  size?: "xs" | "sm" | "md" | "lg";
};

export function ComposedModal(props: Props) {
  const { appElement = "#app", composedModalProps = {}, isOpen, modalHeaderProps = {} } = props;
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
  const resetInitialState = (stateUpdate: any) => {
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
  const handleSetShouldConfirmModalClose = (shouldConfirmModalClose: any) => {
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
