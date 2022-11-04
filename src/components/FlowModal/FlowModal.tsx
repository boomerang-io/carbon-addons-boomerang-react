import React, { useEffect } from "react";
import cx from "classnames";
import { ModalHeader, ProgressIndicator, ProgressStep } from "@carbon/react";
import { prefix } from "../../internal/settings";

import Modal from "../Modal";
import useSetState from "../../tools/useSetState";
import ConfirmModal from "../ConfirmModal";

FlowModalContainer.defaultProps = {
  composedModalProps: {},
  isOpen: false,
  modalHeaderProps: {},
  modalTrigger: () => {},
};

type OwnProps = {
  appElement?: string;
  children?: React.ReactNode;
  components?: any[];
  composedModalProps?: any;
  confirmModalProps?: any;
  initialState?: any;
  isOpen?: boolean;
  modalHeaderChildren?: React.ReactElement;
  modalHeaderProps?: any;
  modalTrigger?: (...args: any[]) => any;
  onCloseModal?: (...args: any[]) => any;
  onFormDataChange?: (...args: any[]) => any;
  progressSteps?: {
    label?: string;
  }[];
};

type Props = OwnProps & typeof FlowModalContainer.defaultProps;

export function FlowModalContainer(props: Props) {
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
    // @ts-expect-error TS(2349): This expression is not callable.
    setState({ isOpen: props.isOpen });
  }, [props.isOpen, setState]);

  /**
   * Change step value to the requested value
   * @param {number} stepRequested - requested value
   */
  function goToStep(stepRequested: any) {
    // @ts-expect-error TS(2349): This expression is not callable.
    setState({ step: stepRequested });
  }

  /**
   * Change step to next one
   */
  function requestNextStep() {
    goToStep((state as any).step + 1);
  }

  /**
   * Change step to previous one
   */
  function requestPreviousStep() {
    goToStep((state as any).step - 1);
  }

  /**
   * Save data colected by user input into formData
   * @param {obj} data - the new data to be saved
   */
  function saveValues(data: any) {
    // @ts-expect-error TS(2349): This expression is not callable.
    setState({ formData: { ...(state as any).formData, ...data } });
    // @ts-expect-error TS(2304): Cannot find name 'onFormDataChange'.
    if (typeof onFormDataChange === "function") {
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      props.onFormDataChange((state as any).formData);
    }
  }

  /**
   * Reset to initial state
   * and let parent know
   */
  function resetInitialState(stateUpdate: any) {
    // @ts-expect-error TS(2349): This expression is not callable.
    setState({
      formData: new Map(),
      isConfirmModalOpen: false,
      shouldConfirmModalClose: false,
      step: 0,
      ...props.initialState,
      ...stateUpdate,
    });

    // @ts-expect-error TS(2304): Cannot find name 'onFormDataChange'.
    if (typeof onFormDataChange === "function") {
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      props.onFormDataChange((state as any).formData);
    }
  }

  function handleOpenModal() {
    // @ts-expect-error TS(2349): This expression is not callable.
    setState({ isOpen: true });
  }

  /**
   * Close modal and call event function for parent if provided
   */
  function handleCloseModal() {
    resetInitialState({ isOpen: false });
    if (typeof props.onCloseModal === "function") {
      props.onCloseModal();
    }
  }

  /**
   * Check if should confirm exit with confirm modal or just exit modal flow
   */
  function handleShouldCloseModal() {
    if ((state as any).shouldConfirmModalClose) {
      // @ts-expect-error TS(2349): This expression is not callable.
      setState({ isConfirmModalOpen: true });
    } else {
      handleCloseModal();
    }
  }

  function closeConfirmModal() {
    // @ts-expect-error TS(2349): This expression is not callable.
    setState({ isConfirmModalOpen: false });
  }

  /**
   * Method passed to children components and they determine if should confirm exit of modal
   * @param {bool} shouldConfirmModalClose - boolean of current component
   */
  function handleSetShouldConfirmModalClose(shouldConfirmModalClose: any) {
    // @ts-expect-error TS(2349): This expression is not callable.
    setState({ shouldConfirmModalClose });
  }

  /**
   * Determine which child to render based on the current step in the flow
   */
  function determineChildToRender() {
    // @ts-expect-error TS(2339): Property 'step' does not exist on type '{}'.
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
        containerClassName={cx(
          `${prefix}--bmrg-modal-flow-container`,
          `${prefix}--modal-container`,
          (props as any).size ? `${prefix}--modal-container--${(props as any).size}` : "modal-container-fix-width",
          containerClassName
        )}
        isOpen={(state as any).isOpen}
        onRequestClose={handleShouldCloseModal}
        shouldCloseOnOverlayClick={false}
        {...restComposedModalProps}
      >
        <ModalHeader closeModal={handleShouldCloseModal} {...restModalHeaderProps}>
          {subtitle && <p className={`${prefix}--bmrg-modal-flow-subtitle`}>{subtitle}</p>}
        </ModalHeader>

        {Array.isArray(props.progressSteps) && (
          <ProgressIndicator currentIndex={(state as any).step}>
            {props.progressSteps.map((stepProps, index) => (
              <ProgressStep key={index} {...stepProps} />
            ))}
          </ProgressIndicator>
        )}
        {childToRender &&
          (state as any).isOpen &&
          React.cloneElement(childToRender, {
            closeModal: handleShouldCloseModal,
            forceCloseModal: handleCloseModal,
            formData: (state as any).formData,
            goToStep,
            requestNextStep,
            requestPreviousStep,
            resetInitialState,
            saveValues,
            setShouldConfirmModalClose: handleSetShouldConfirmModalClose,
            shouldConfirmModalClose: (state as any).shouldConfirmModalClose,
            step: (state as any).step,
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

export default FlowModalContainer;
