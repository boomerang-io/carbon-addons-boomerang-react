import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { ModalHeader, ProgressIndicator, ProgressStep } from 'carbon-components-react';
import { settings } from 'carbon-components';

import Modal from '../Modal';
import useSetState from '../../tools/useSetState';
import ConfirmModal from '../ConfirmModal';

const { prefix } = settings;

FlowModalContainer.propTypes = {
  appElement: PropTypes.string,
  children: PropTypes.node,
  components: PropTypes.array,
  composedModalProps: PropTypes.object,
  confirmModalProps: PropTypes.object,
  initialState: PropTypes.object,
  isOpen: PropTypes.bool,
  modalHeaderChildren: PropTypes.element,
  modalHeaderProps: PropTypes.object,
  modalTrigger: PropTypes.func,
  onCloseModal: PropTypes.func,
  onFormDataChange: PropTypes.func,
  progressSteps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
    })
  ),
};

FlowModalContainer.defaultProps = {
  composedModalProps: {},
  isOpen: false,
  modalHeaderProps: {},
  modalTrigger: () => {},
};

export function FlowModalContainer(props) {
  const [state, setState] = useSetState({
    formData: new Map(),
    isConfirmModalOpen: false,
    isOpen: props.isOpen,
    shouldConfirmModalClose: false,
    step: 0,
    ...props.initialState,
  });

  // Let it be externally controlled
  useEffect(() => {
    setState({ isOpen: props.isOpen });
  }, [props.isOpen, setState]);

  /**
   * Change step value to the requested value
   * @param {number} stepRequested - requested value
   */
  function goToStep(stepRequested) {
    setState({ step: stepRequested });
  }

  /**
   * Change step to next one
   */
  function requestNextStep() {
    goToStep(state.step + 1);
  }

  /**
   * Change step to previous one
   */
  function requestPreviousStep() {
    goToStep(state.step - 1);
  }

  /**
   * Save data colected by user input into formData
   * @param {obj} data - the new data to be saved
   */
  function saveValues(data) {
    setState({ formData: { ...state.formData, ...data } });
    if (typeof onFormDataChange === 'function') {
      props.onFormDataChange(state.formData);
    }
  }

  /**
   * Reset to initial state
   * and let parent know
   */
  function resetInitialState(stateUpdate) {
    setState({
      formData: new Map(),
      isConfirmModalOpen: false,
      shouldConfirmModalClose: false,
      step: 0,
      ...props.initialState,
      ...stateUpdate,
    });

    if (typeof onFormDataChange === 'function') {
      props.onFormDataChange(state.formData);
    }
  }

  function handleOpenModal() {
    setState({ isOpen: true });
  }

  /**
   * Close modal and call event function for parent if provided
   */
  function handleCloseModal() {
    resetInitialState({ isOpen: false });
    if (typeof props.onCloseModal === 'function') {
      props.onCloseModal();
    }
  }

  /**
   * Check if should confirm exit with confirm modal or just exit modal flow
   */
  function handleShouldCloseModal() {
    if (state.shouldConfirmModalClose) {
      setState({ isConfirmModalOpen: true });
    } else {
      handleCloseModal();
    }
  }

  function closeConfirmModal() {
    setState({ isConfirmModalOpen: false });
  }

  /**
   * Method passed to children components and they determine if should confirm exit of modal
   * @param {bool} shouldConfirmModalClose - boolean of current component
   */
  function handleSetShouldConfirmModalClose(shouldConfirmModalClose) {
    setState({ shouldConfirmModalClose });
  }

  /**
   * Determine which child to render based on the current step in the flow
   */
  function determineChildToRender() {
    const { step } = state;
    let childToRender;
    if (React.Children.count(props.children) > 0) {
      React.Children.forEach(props.children, (child, index) => {
        if (index === step) {
          childToRender = child;
        }
      });
    }
    return childToRender;
  }

  const { containerClassName, ...restComposedModalProps } = props.composedModalProps;

  const { subtitle, ...restModalHeaderProps } = props.modalHeaderProps;

  const childToRender = determineChildToRender();
  return (
    <>
      {props.modalTrigger({ openModal: handleOpenModal })}
      <Modal
        appElement={props.appElement}
        containerClassName={cx(`${prefix}--bmrg-modal-flow-container`, containerClassName)}
        isOpen={state.isOpen}
        onRequestClose={handleShouldCloseModal}
        shouldCloseOnOverlayClick={false}
        {...restComposedModalProps}
      >
        <ModalHeader closeModal={handleShouldCloseModal} {...restModalHeaderProps}>
          {subtitle && <p className={`${prefix}--bmrg-modal-flow-subtitle`}>{subtitle}</p>}
        </ModalHeader>

        {Array.isArray(props.progressSteps) && (
          <ProgressIndicator currentIndex={state.step}>
            {props.progressSteps.map((stepProps, index) => (
              <ProgressStep key={index} {...stepProps} />
            ))}
          </ProgressIndicator>
        )}
        {childToRender &&
          state.isOpen &&
          React.cloneElement(childToRender, {
            closeModal: handleShouldCloseModal,
            forceCloseModal: handleCloseModal,
            formData: state.formData,
            goToStep,
            requestNextStep,
            requestPreviousStep,
            resetInitialState,
            saveValues,
            setShouldConfirmModalClose: handleSetShouldConfirmModalClose,
            shouldConfirmModalClose: state.shouldConfirmModalClose,
            step: state.step,
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

export default FlowModalContainer;
