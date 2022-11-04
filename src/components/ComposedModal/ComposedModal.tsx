import React, { useEffect } from "react";
import useSetState from "../../tools/useSetState";
import cx from "classnames";
import Modal from "../Modal";
import { ModalHeader } from "@carbon/react";
import { prefix } from "../../internal/settings";
import ConfirmModal from "../ConfirmModal";

ComposedModal.defaultProps = {
  appElement: "#app",
  composedModalProps: {},
  isOpen: false,
  modalHeaderProps: {},
  modalTrigger: () => {},
};

type OwnProps = {
  appElement?: string;
  children?: (...args: any[]) => any;
  composedModalProps?: any;
  confirmModalProps?: any;
  initialState?: any;
  isOpen?: boolean;
  modalHeaderChildren?: React.ReactElement;
  modalHeaderProps?: any;
  modalTrigger?: (...args: any[]) => any;
  onCloseModal?: (...args: any[]) => any;
  size?: "xs" | "sm" | "md" | "lg";
};

type Props = OwnProps & typeof ComposedModal.defaultProps;

export function ComposedModal(props: Props) {
  const [state, setState] = useSetState({
    isConfirmModalOpen: false,
    isOpen: props.isOpen,
    shouldConfirmModalClose: false,
    step: 0,
    ...props.initialState,
  });

  // Let it be externally controlled
  const { isOpen } = props;
  useEffect(() => {
    // @ts-expect-error TS(2349): This expression is not callable.
    setState({ isOpen });
    // eslint-disable-next-line
  }, [isOpen]);

  /**
   * Reset to initial state
   * and let parent know
   */
  const resetInitialState = (stateUpdate: any) => {
    // @ts-expect-error TS(2349): This expression is not callable.
    setState({
      isConfirmModalOpen: false,
      shouldConfirmModalClose: false,
      ...props.initialState,
      ...stateUpdate,
    });
  };

  const handleOpenModal = () => {
    // @ts-expect-error TS(2349): This expression is not callable.
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
    if ((state as any).shouldConfirmModalClose) {
      // @ts-expect-error TS(2349): This expression is not callable.
      setState({ isConfirmModalOpen: true });
    } else {
      handleCloseModal();
    }
  };

  const closeConfirmModal = () => {
    // @ts-expect-error TS(2349): This expression is not callable.
    setState({ isConfirmModalOpen: false });
  };

  /**
   * Method passed to children components and they determine if should confirm exit of modal
   * @param {bool} shouldConfirmModalClose - boolean of current component
   */
  const handleSetShouldConfirmModalClose = (shouldConfirmModalClose: any) => {
    // @ts-expect-error TS(2349): This expression is not callable.
    setState({ shouldConfirmModalClose });
  };

  const { containerClassName, ...restComposedModalProps } = props.composedModalProps;

  const { subtitle, ...restModalHeaderProps } = props.modalHeaderProps;

  return (
    <>
      {props.modalTrigger({ openModal: handleOpenModal })}
      <Modal
        appElement={props.appElement}
        containerClassName={cx(
          `${prefix}--bmrg-modal-composed-container`,
          `${prefix}--modal-container`,
          props.size ? `${prefix}--modal-container--${props.size}` : "modal-container-fix-width",
          containerClassName
        )}
        isOpen={(state as any).isOpen}
        onRequestClose={handleShouldCloseModal}
        shouldCloseOnOverlayClick={false}
        {...restComposedModalProps}
      >
        <ModalHeader closeModal={handleShouldCloseModal} {...restModalHeaderProps}>
          {subtitle && <p className={`${prefix}--bmrg-modal-composed-subtitle`}>{subtitle}</p>}
        </ModalHeader>
        {(state as any).isOpen &&
          typeof props.children === "function" &&
          props.children({
            closeModal: handleShouldCloseModal,
            forceCloseModal: handleCloseModal,
            resetInitialState: resetInitialState,
            setShouldConfirmModalClose: handleSetShouldConfirmModalClose,
            shouldConfirmModalClose: (state as any).shouldConfirmModalClose,
          })}
        <ConfirmModal
          affirmativeAction={handleCloseModal}
          appElement={props.appElement}
          negativeAction={closeConfirmModal}
          isOpen={(state as any).isConfirmModalOpen}
          onCloseModal={closeConfirmModal}
          {...props.confirmModalProps}
        />
      </Modal>
    </>
  );
}

export default ComposedModal;
