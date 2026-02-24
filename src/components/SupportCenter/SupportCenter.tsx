/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/

import React from "react";
import { Button, ComposedModal, ModalHeader, ModalBody, ModalFooter, Checkbox } from "@carbon/react";
import { HelpDesk } from "@carbon/react/icons";
import HeaderMenuItem from "../Header/HeaderMenuItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resolver, serviceUrl } from "../../config/servicesConfig";
import { prefix } from "../../internal/settings";

type Props = {
  closeModal: () => void;
  supportRedirect: () => void;
  isOpen: boolean;
  platformName?: string;
  platformOrganization?: string;
  supportLink?: string;
  enablePartner?: boolean;
  partnerEmailId?: string;
  baseServicesUrl: string;
};

function SupportCenter({ closeModal, isOpen, supportRedirect, baseServicesUrl, enablePartner, partnerEmailId }: Props) {
  const [doNotAskAgain, setDoNotAskAgain] = React.useState(false);
  const queryClient = useQueryClient();
  const profileUrl = serviceUrl.resourceUserProfile({ baseServicesUrl });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const shouldNotAskAgain = event.target.checked;
    setDoNotAskAgain(shouldNotAskAgain);
    handleSubmit(!shouldNotAskAgain);
  };
  const { mutateAsync: mutateUserProfile } = useMutation({
    mutationFn: resolver.patchUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [profileUrl] });
    },
  });

  async function handleSubmit(showSupport: boolean) {
    const body = {
      showSupport,
    };

    try {
      await mutateUserProfile({ baseServicesUrl, body });
    } catch (e) {
      // noop
    }
  }

  return (
    <ComposedModal
      aria-label="SupportCenter"
      open={isOpen}
      className={`${prefix}--support-description-modal`}
      onClose={closeModal}
      onKeyDown={(e: any) => e.stopPropagation()}
      data-testid="composed-modal-supportcenter"
    >
      <ModalHeader data-testid="supportcenter-modal-header" title="Having an issue?" closeModal={closeModal} />
      <ModalBody>
        {enablePartner ? (
          <div className={`${prefix}--bmrg-feedback`}>
            <p>
              Please email any issues with a description and images to
              {" " /* We need to force a space before the link tag */}
              <a href="mailto:ica-support@ibm.com">{partnerEmailId}</a>
              {"."}
            </p>
          </div>
        ) : (
          <div className={`${prefix}--bmrg-feedback`}>
            <p>
              Review your open cases or open a new case at IBM Support Center. For support tickets related to IBM
              Consulting Advantage, use Product "Consulting Advantage".
            </p>
            &nbsp;
            <Checkbox
              id="supportCheckboxId"
              data-testid="supportcenter-modal-checkbox"
              labelText="Don't show again. Always proceed to IBM Support Center."
              invalidText="Error message goes here"
              onChange={handleCheckboxChange}
              checked={doNotAskAgain}
              warnText="Warning message goes here"
            />
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        {enablePartner ? (
          ""
        ) : (
          <Button kind="secondary" data-testid="supportcenter-modal-cancel-button" onClick={closeModal}>
            Cancel
          </Button>
        )}
        {enablePartner ? (
          <Button
            data-modal-primary-focus
            kind="primary"
            data-testid="supportcenter-modal-close-button"
            onClick={closeModal}
          >
            Close
          </Button>
        ) : (
          <Button
            data-modal-primary-focus
            kind="primary"
            data-testid="supportcenter-modal-continue-button"
            onClick={supportRedirect}
          >
            Continue to IBM Support Center
          </Button>
        )}
      </ModalFooter>
    </ComposedModal>
  );
}

function SupportCenterMenuItem(props: Omit<Props, "isOpen" | "closeModal" | "supportRedirect">) {
  const menuItemRef = React.useRef<HTMLLinkElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      menuItemRef.current?.focus();
    }, 0);
  };
  const supportHandle = () => {
    window.open(props?.supportLink, "_blank", "noopener,noreferrer");
    handleClose();
  };

  return (
    <>
      <HeaderMenuItem
        icon={<HelpDesk />}
        onClick={() => setIsOpen(!isOpen)}
        ref={menuItemRef}
        text="Support Center"
        data-testid="supportcenter-modal-headermenuitem"
        type="button"
      />
      <SupportCenter isOpen={isOpen} closeModal={handleClose} supportRedirect={supportHandle} {...props} />
    </>
  );
}

export { SupportCenterMenuItem };

export default SupportCenter;
