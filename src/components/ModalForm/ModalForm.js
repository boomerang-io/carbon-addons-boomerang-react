import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { settings } from 'carbon-components';
const { prefix } = settings;

const ModalForm = React.forwardRef(function ModalForm(
  { children, className, element: Element, title, ...rest },
  ref
) {
  return (
    <Element className={cx(`${prefix}--bmrg-modal-form`, className)} {...rest} ref={ref}>
      {title && <p className={`${prefix}--bmrg-modal-form__title`}>{title}</p>}
      {children}
    </Element>
  );
});

ModalForm.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  element: PropTypes.elementType,
  title: PropTypes.string,
};

ModalForm.defaultProps = {
  element: 'form',
};

export default ModalForm;
