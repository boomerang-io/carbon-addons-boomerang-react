import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Warning16 } from '@carbon/icons-react';
import { settings } from 'carbon-components';

const { prefix } = settings;

const Error = ({ status, statusText, className, style, ...rest }) => {
  let message;
  if (status && statusText) {
    message = (
      <div
        className={`${prefix}--bmrg-error-message__status`}
      >{`Status: ${status} ${statusText}`}</div>
    );
  } else if (status) {
    message = <div className={`${prefix}--bmrg-error-message__status`}>{`Status: ${status}`}</div>;
  } else if (statusText) {
    message = <div className={`${prefix}--bmrg-error-message__status`}>{`${statusText}`}</div>;
  }

  const classNames = classnames(`${prefix}--bmrg-error-message`, className);

  return (
    <div className={classNames} style={style} {...rest}>
      <div className={`${prefix}--bmrg-error-message`}>
        <Warning16 className={`${prefix}--bmrg-error-message__img`} alt="Warning" />
        <h2 className={`${prefix}--bmrg-error-message__text`}>Oops, something went wrong.</h2>
        {message}
        <p className={`${prefix}--bmrg-error-message__subtext`}>
          Try reloading the page. And if you could be so kind, please send us an issue report.
        </p>
      </div>
    </div>
  );
};

Error.defaultProps = {
  className: '',
};

Error.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  status: PropTypes.string,
  statusText: PropTypes.string,
};

export default Error;
