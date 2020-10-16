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

function ErrorBoundaryPoc(props) {
  const { children, className, style, errorProps, errorComponent, resetButtonText, resetButtonProps } = props;
  const containerClassName = cx(`${prefix}--bmrg-error-boundary-poc`, className);
  const buttonClassName = cx(`${prefix}--bmrg-error-boundary-poc-restore`, resetButtonProps?.className);

  resetButtonProps["className"] = buttonClassName;

  const [ error, setError ] = useState(false);

  const errorHandler = (newError, info) => {
    setError(newError);
    console.log(error, info); //eslint-disable-line
  }

  const ErrorFallback = ({error, resetErrorBoundary}) => {
    return (
      <div className={containerClassName} role="alert" style={style} {...props}>
        <ErrorComponent {...errorProps} />
        <Button onClick={resetErrorBoundary} {...resetButtonProps}>
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

ErrorBoundaryPoc.defaultProps = {
  errorComponent: ErrorMessage,
  resetButtonText: "Restore page",
  resetButtonProps: {},
};

ErrorBoundaryPoc.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.string,
  errorProps: PropTypes.object,
  errorComponent: PropTypes.func,
  resetButtonText: PropTypes.string,
  resetButtonProps: PropTypes.object,
};

export default ErrorBoundaryPoc;
