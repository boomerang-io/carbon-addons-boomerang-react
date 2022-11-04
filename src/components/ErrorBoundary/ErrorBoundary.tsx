import React, { Component } from "react";
import { prefix } from "../../internal/settings";

import ErrorMessage from "../ErrorMessage";

type OwnProps = {
  className?: string;
  style?: string;
  errorProps?: any;
  errorComponent?: (...args: any[]) => any;
};

type State = any;

type Props = OwnProps & typeof ErrorBoundary.defaultProps;

/**
 * todo: convert this to hooks in the future.
 * As of now getDerivedStateFromError not available via hooks
 */

class ErrorBoundary extends Component<Props, State> {
  state = {
    hasError: false,
    error: {},
  };

  static defaultProps = {
    errorComponent: ErrorMessage,
    className: `${prefix}--bmrg-error-boundary`,
  };

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: any, info: any) {
    // You can also log the error to an error reporting service
    console.error(error, info); //eslint-disable-line
  }

  render() {
    const { errorComponent: ErrorComponent, className, style, errorProps, ...rest } = this.props;
    if (this.state.hasError) {
      return (
        // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
        <div className={className} style={style} {...rest}>
          <ErrorComponent {...this.props.errorProps} />
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
