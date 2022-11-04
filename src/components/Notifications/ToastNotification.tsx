// eslint-disable no-unused-vars
import React from "react";
import { ToastNotification as CarbonToastNotification } from "@carbon/react";
import { prefix } from "../../internal/settings";

type OwnProps = {
    children?: React.ReactNode;
    className?: string;
    closeToast?: (...args: any[]) => any;
    kind: "error" | "info" | "success" | "warning";
    title: string;
    subtitle: React.ReactNode;
    role: string;
    caption?: React.ReactNode;
    onCloseButtonClick?: (...args: any[]) => any;
    iconDescription: string;
    notificationType?: string;
    hideCloseButton?: boolean;
    timeout?: number;
};

// @ts-expect-error TS(2456): Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof ToastNotification.defaultProps;



// @ts-expect-error TS(7022): 'ToastNotification' implicitly has type 'any' beca... Remove this comment to see the full error message
const ToastNotification = ({ iconDescription, closeToast, toastProps, notificationType, ...rest }: Props) => {
  return (
    <div className={`${prefix}--bmrg-toast-notification-container`}>
      <CarbonToastNotification {...rest} />
    </div>
  );
};

ToastNotification.defaultProps = {
  kind: "info", // altered
  title: "", // altered
  subtitle: "", // altered
  caption: undefined, // altered
  role: "alert",
  notificationType: "toast",
  iconDescription: "closes notification",
  onCloseButtonClick: () => {},
  hideCloseButton: true, // altered
  timeout: 1000000,
};

export default ToastNotification;
