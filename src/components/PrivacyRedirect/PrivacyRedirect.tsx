/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { ComposedModal, Button, ModalHeader, ModalBody, ModalFooter } from "@carbon/react";
import { prefix } from "../../internal/settings";
import type { User } from "types";

type Props = {
  baseEnvUrl: string;
  isOpen?: boolean;
  platformName?: string;
  user?: User;
};

function PrivacyRedirect(props: Props) {
  const { baseEnvUrl, isOpen = false, user, platformName = "the platform" } = props;

  const handleOnSubmit = () => {
    const pendingDeletion = user?.status === "pending_deletion";
    if (pendingDeletion) {
      window.location.assign(`${baseEnvUrl}/launchpad`); // There is no marketing site so TBD where this links to
    } else {
      window.location.assign(`${baseEnvUrl}/launchpad?rd=${document.URL}`);
    }
  };

  const pendingDeletion = user?.status === "pending_deletion";
  const contentText = pendingDeletion
    ? `We’re working on removing your account and personal information from ${platformName}. Please allow up to 1 month (as mandated by GDPR regulations) for us to complete your request.`
    : "Before continuing, we need you to consent to the Privacy Statement.";

  const buttonText = pendingDeletion ? "Go to Launchpad" : "View Privacy Statement";

  return (
    <div className={`${prefix}--bmrg-redirect-container ${prefix}--bmrg-header-modal`}>
      <ComposedModal
        aria-label="GDPR Modal"
        open={isOpen}
        onClose={() => {
          return false;
        }}
      >
        <ModalHeader title="Our Privacy Statement" />
        <ModalBody>
          <span className={`${prefix}--bmrg-redirect__body`}>{contentText}</span>
        </ModalBody>
        <ModalFooter>
          <Button data-modal-primary-focus kind="primary" onClick={handleOnSubmit}>
            {buttonText}
          </Button>
        </ModalFooter>
      </ComposedModal>
    </div>
  );
}

export default PrivacyRedirect;
