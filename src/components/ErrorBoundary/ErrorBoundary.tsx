import React, { Component } from "react";
import { prefix } from "../../internal/settings";
import ErrorMessage from "../ErrorMessage";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  errorProps?: any;
  [key: string]: any;
  errorComponent?: React.FC<Pick<Props, "errorProps">>;
}

type State = { hasError: boolean, error: any}

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
    className: `${prefix}--bmrg-error-boundary`,
  };

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: any, info: any) {
    console.error(error, info); //eslint-disable-line
  }

  render() {
    const { errorComponent: ErrorComponent = ErrorMessage, className, style, errorProps, ...rest } = this.props;
    if (this.state.hasError) {
      return (
        <div className={className} style={style} {...rest}>
          <ErrorComponent {...this.props.errorProps} />
        </div>
      );
    }
    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
