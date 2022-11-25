import React from "react";
import cx from "classnames";
import { prefix } from "../../internal/settings";

type Props = {
  children?: React.ReactNode;
  className?: string;
  element?: any;
  title?: string;
};

const FlowModalForm = React.forwardRef<any, Props>(function FlowModalForm(
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

FlowModalForm.defaultProps = {
  element: "form",
};

export default FlowModalForm;
