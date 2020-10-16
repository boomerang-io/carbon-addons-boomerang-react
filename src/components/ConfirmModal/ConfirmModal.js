import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { settings } from 'carbon-components';
import { Button, ModalHeader, ModalBody, ModalFooter } from 'carbon-components-react';

import Modal from '../Modal';

const { prefix } = settings;

ConfirmModal.propTypes = {
  affirmativeAction: PropTypes.func,
  affirmativeButtonProps: PropTypes.object,
  affirmativeText: PropTypes.string,
  appElement: PropTypes.string,
  children: PropTypes.node,
  containerClassName: PropTypes.string,
  isOpen: PropTypes.bool,
  label: PropTypes.string,
  modalProps: PropTypes.object,
  modalTrigger: PropTypes.func,
  negativeAction: PropTypes.func,
  negativeButtonProps: PropTypes.object,
  negativeText: PropTypes.string,
  onCloseModal: PropTypes.func,
  selectorPrimaryFocus: PropTypes.string,
  title: PropTypes.string,
};

ConfirmModal.defaultProps = {
  affirmativeText: 'Yes',
  modalTrigger: () => {},
  negativeText: 'No',
  selectorPrimaryFocus: 'button[id="bx--bmrg-confirm-modal-primary-button"]',
  title: 'Are you sure?',
};

function ConfirmModal(props) {
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
    if (typeof onCloseModal === 'function') {
      onCloseModal();
    }
    setIsOpen(false);
  }

  function handleAffirmativeAction() {
    if (typeof affirmativeAction === 'function') {
      affirmativeAction();
    }
    if (!isExternallyControlled) closeModal();
  }

  function handleNegativeAction() {
    if (typeof negativeAction === 'function') {
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
