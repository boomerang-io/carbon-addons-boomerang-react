import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from "classnames";
import { settings } from 'carbon-components';
import { ErrorBoundary } from 'react-error-boundary';
import { Button } from 'carbon-components-react';
import ErrorMessage from '../ErrorMessage';

const { prefix } = settings;

/**
 * todo: convert this to hooks in the future.
 * As of now getDerivedStateFromError not available via hooks
 */

export function RecoverErrorBoundary(props) {
  const { children, className, style, errorProps, errorComponent, onResetError, resetButtonText, resetButtonProps } = props;
  const containerClassName = cx(`${prefix}--bmrg-error-boundary-poc`, className);
  const buttonClassName = cx(`${prefix}--bmrg-error-boundary-poc-restore`, resetButtonProps?.className);

  resetButtonProps["className"] = buttonClassName;
  const [ error, setError ] = useState(false);

  const errorHandler = (newError, info) => {
    setError(newError);
    console.log(error, info); //eslint-disable-line
  }

  const ErrorFallback = ({error, resetErrorBoundary}) => {
    const handleResetError = () => {
      onResetError && onResetError();
      resetErrorBoundary();
    }
    return (
      <div className={containerClassName} role="alert" style={style} {...props}>
        <ErrorComponent {...errorProps} />
        <Button onClick={handleResetError} {...resetButtonProps}>
          {resetButtonText}
        </Button>
      </div>
    )
  }

  const ErrorComponent = errorComponent;
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => setError(false)} onError={errorHandler}>
      { children }
    </ErrorBoundary>
  );
}

RecoverErrorBoundary.defaultProps = {
  errorComponent: ErrorMessage,
  resetButtonText: "Restore page",
  resetButtonProps: {},
};

RecoverErrorBoundary.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.string,
  errorProps: PropTypes.object,
  errorComponent: PropTypes.func,
  onResetError: PropTypes.func,
  resetButtonText: PropTypes.string,
  resetButtonProps: PropTypes.object,
};

export default RecoverErrorBoundary;
