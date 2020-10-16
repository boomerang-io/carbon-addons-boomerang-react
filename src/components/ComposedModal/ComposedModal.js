import React, { useEffect } from 'react';
import useSetState from '../../tools/useSetState';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Modal from '../Modal';
import { ModalHeader } from 'carbon-components-react';
import { settings } from 'carbon-components';
import ConfirmModal from '../ConfirmModal';

const { prefix } = settings;

ComposedModal.propTypes = {
  appElement: PropTypes.string,
  children: PropTypes.func,
  composedModalProps: PropTypes.object,
  confirmModalProps: PropTypes.object,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
  modalHeaderChildren: PropTypes.element,
  modalHeaderProps: PropTypes.object,
  modalTrigger: PropTypes.func,
  onCloseModal: PropTypes.func,
};

ComposedModal.defaultProps = {
  composedModalProps: {},
  isOpen: false,
  modalHeaderProps: {},
  modalTrigger: () => {},
};

export function ComposedModal(props) {
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
    setState({ isOpen });
    // eslint-disable-next-line
  }, [isOpen]);

  /**
   * Reset to initial state
   * and let parent know
   */
  const resetInitialState = (stateUpdate) => {
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
    if (typeof props.onCloseModal === 'function') {
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
  const handleSetShouldConfirmModalClose = (shouldConfirmModalClose) => {
    setState({ shouldConfirmModalClose });
  };

  const { containerClassName, ...restComposedModalProps } = props.composedModalProps;

  const { subtitle, ...restModalHeaderProps } = props.modalHeaderProps;

  return (
    <>
      {props.modalTrigger({ openModal: handleOpenModal })}
      <Modal
        appElement={props.appElement}
        containerClassName={cx(`${prefix}--bmrg-modal-composed-container`, containerClassName)}
        isOpen={state.isOpen}
        onRequestClose={handleShouldCloseModal}
        shouldCloseOnOverlayClick={false}
        {...restComposedModalProps}
      >
        <ModalHeader closeModal={handleShouldCloseModal} {...restModalHeaderProps}>
          {subtitle && <p className={`${prefix}--bmrg-modal-composed-subtitle`}>{subtitle}</p>}
        </ModalHeader>
        {state.isOpen &&
          typeof props.children === 'function' &&
          props.children({
            closeModal: handleShouldCloseModal,
            forceCloseModal: handleCloseModal,
            resetInitialState: resetInitialState,
            setShouldConfirmModalClose: handleSetShouldConfirmModalClose,
            shouldConfirmModalClose: state.shouldConfirmModalClose,
          })}
        <ConfirmModal
          affirmativeAction={handleCloseModal}
          appElement={props.appElement}
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
