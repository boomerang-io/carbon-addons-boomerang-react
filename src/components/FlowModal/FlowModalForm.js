import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { settings } from 'carbon-components';
const { prefix } = settings;

const FlowModalForm = React.forwardRef(function FlowModalForm(
  { children, className, element: Element, title, ...rest },
  ref
) {
  return (
    <Element className={cx(`${prefix}--bmrg-modal-flow-form`, className)} {...rest} ref={ref}>
      {title && <p className={`${prefix}--bmrg-modal-flow-form__title`}>{title}</p>}
      {children}
    </Element>
  );
});

FlowModalForm.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  element: PropTypes.elementType,
  title: PropTypes.string,
};

FlowModalForm.defaultProps = {
  element: 'form',
};

export default FlowModalForm;
