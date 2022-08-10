import React from "react";
import PropTypes from "prop-types";
import { InlineNotification as CarbonInlineNotification } from "@carbon/react";
import { prefix } from "../../internal/settings";

PlatformBanner.propTypes = {
  kind: PropTypes.oneOf(["error", "info", "success", "warning"]),
  message: PropTypes.string,
  title: PropTypes.string,
};

function PlatformBanner({ kind, message, title }) {
  return (
    <div className={`${prefix}--bmrg-banner-container`}>
      <CarbonInlineNotification kind={kind} subtitle={message} title={title} />
    </div>
  );
}

export default PlatformBanner;
