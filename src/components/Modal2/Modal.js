import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ReactModal from 'react-modal';
import { settings } from 'carbon-components';

const { prefix } = settings;

Modal.propTypes = {
  appElement: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  isOpen: PropTypes.bool,
};

Modal.defaultProps = {
  appElement: '#app',
  isOpen: false,
};

export function Modal(props) {
  const { appElement, className, containerClassName, children, ...rest } = props;

  React.useEffect(() => {
    ReactModal.setAppElement(appElement);
  }, [appElement]);

  return (
    <>
      <ReactModal
        shouldCloseOnOverlayClick
        closeTimeoutMS={240}
        isOpen={props.isOpen}
        htmlOpenClassName={`${prefix}--bmrg-html-modal-is-open`}
        bodyOpenClassName={`${prefix}--bmrg-body-modal-is-open`}
        className={{
          base: cx(`${prefix}--bmrg-modal-container`, containerClassName),
          afterOpen: '--is-open',
          beforeClose: '--is-closed',
        }}
        portalClassName={`${prefix}--bmrg-modal-portal`}
        overlayClassName={{
          base: cx(`${prefix}--bmrg-modal-overlay`, className),
          afterOpen: '--is-open',
          beforeClose: '--is-closed',
        }}
        {...rest}
      >
        {children}
      </ReactModal>
    </>
  );
}

export default Modal;
