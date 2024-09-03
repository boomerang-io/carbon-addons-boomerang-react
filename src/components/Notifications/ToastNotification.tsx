// eslint-disable no-unused-vars
import React from "react";
import { ToastNotification as CarbonToastNotification } from "@carbon/react";
import { prefix } from "../../internal/settings";

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

type OwnProps = {
  children?: React.ReactNode;
  className?: string;
  closeToast?: (...args: any[]) => any;
  kind: "error" | "info" | "success" | "warning";
  title: string;
  subtitle: React.ReactNode;
  role: string;
  caption?: React.ReactNode;
  lowContrast?: boolean;
  onCloseButtonClick?: (...args: any[]) => any;
  iconDescription: string;
  notificationType?: string;
  hideCloseButton?: boolean;
  timeout?: number;
  toastProps?: any;
  [index: string]: any;
};

type Props = OwnProps & typeof ToastNotification.defaultProps;

function ToastNotification({ iconDescription, closeToast, toastProps, notificationType, ...rest }: Props) {
  return (
    <div className={`${prefix}--bmrg-toast-notification-container`}>
      <CarbonToastNotification {...rest} />
    </div>
  );
}

export default ToastNotification;
