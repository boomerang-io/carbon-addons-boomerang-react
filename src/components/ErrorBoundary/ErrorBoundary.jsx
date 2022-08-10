import React, { Component } from "react";
import PropTypes from "prop-types";
import { prefix } from "../../internal/settings";

import ErrorMessage from "../ErrorMessage";

/**
 * todo: convert this to hooks in the future.
 * As of now getDerivedStateFromError not available via hooks
 */

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: {},
  };

  static defaultProps = {
    errorComponent: ErrorMessage,
    className: `${prefix}--bmrg-error-boundary`,
  };

  static propTypes = {
    /**
     * Component to place the error boundary around
     */
    children: PropTypes.node,
    /**
     * Classname for error boundary wrapper div
     */
    className: PropTypes.string,
    /**
     * Style for error boundary wrapper div
     */
    style: PropTypes.string,
    /**
     * Props to pass to error component
     */
    errorProps: PropTypes.object,
    /**
     * Error component to render on error
     */
    errorComponent: PropTypes.func,
  };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.error(error, info); //eslint-disable-line
  }

  render() {
    const { errorComponent: ErrorComponent, className, style, errorProps, ...rest } = this.props;
    if (this.state.hasError) {
      return (
        <div className={className} style={style} {...rest}>
          <ErrorComponent {...this.props.errorProps} />
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
