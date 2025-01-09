/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { InlineNotification as CarbonInlineNotification } from "@carbon/react";
import { prefix } from "../../internal/settings";

type Props = {
  kind?: "error" | "info" | "success" | "warning";
  message?: string;
  title?: string;
};

function PlatformBanner({ kind, message, title }: Props) {
  return (
    <div className={`${prefix}--bmrg-banner-container`}>
      <CarbonInlineNotification kind={kind} subtitle={message} title={title} />
    </div>
  );
}

export default PlatformBanner;
