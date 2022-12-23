import React, { Component } from "react";
import { ComposedModal, Button, ModalHeader, ModalBody, ModalFooter } from "@carbon/react";
import { prefix } from "../../internal/settings";
import { USER_STATUS } from "./constants";
import type { User } from "types";

type OwnProps = {
  isOpen?: boolean;
  baseLaunchEnvUrl: string;
  user: User;
  platformName?: string;
};

type Props = OwnProps & typeof GdprRedirectModal.defaultProps;

class GdprRedirectModal extends Component<Props> {
  static defaultProps = {
    isOpen: false,
    platformName: "the platform",
  };

  node: any;

  handleOnSubmit = () => {
    const { baseLaunchEnvUrl, user } = this.props;
    const pendingDeletion = user.status === USER_STATUS.PENDING_DELETION;
    if (pendingDeletion) {
      window.location.assign(`${baseLaunchEnvUrl}/launchpad`); // There is no marketing site so TBD where this links to
    } else {
      window.location.assign(`${baseLaunchEnvUrl}/launchpad?rd=${document.URL}`);
    }
  };

  render() {
    const { isOpen, user, platformName } = this.props;

    const pendingDeletion = user?.status === USER_STATUS.PENDING_DELETION;
    const contentText = pendingDeletion
      ? `We’re working on removing your account and personal information from ${platformName}. Please allow up to 1 month (as mandated by GDPR regulations) for us to complete your request.`
      : "Before continuing, we need you to consent to the Privacy Statement.";

    const buttonText = pendingDeletion ? "Launchpad" : "View Privacy Statement";

    return (
      <div className={`${prefix}--bmrg-redirect-container`}>
        <ComposedModal
          open={isOpen}
          onClose={() => {
            return false;
          }}
        >
          <div ref={(node) => (this.node = node)}>
            <ModalHeader title="Our Privacy Statement" />
            <ModalBody>
              <span className={`${prefix}--bmrg-redirect__body`}>{contentText}</span>
            </ModalBody>
            <ModalFooter>
              <Button kind="primary" onClick={this.handleOnSubmit}>
                {buttonText}
              </Button>
            </ModalFooter>
          </div>
        </ComposedModal>
      </div>
    );
  }
}

export default GdprRedirectModal;
