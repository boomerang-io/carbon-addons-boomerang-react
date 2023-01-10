import React from "react";
import { prefix } from "../../internal/settings";
import { Button, ComposedModal, ModalHeader, ModalBody, ModalFooter } from "@carbon/react";
import HeaderMenuItem from "../Header/HeaderMenuItem";
import { Idea } from "@carbon/react/icons";

type Props = {
  closeModal: () => void;
  isOpen: boolean;
  platformName?: string;
  platformOrganization?: string;
  sendIdeasUrl?: string;
};

function Feedback(props: Props) {
  return (
    <ComposedModal
      aria-label="Feedback"
      open={props.isOpen}
      className={`${prefix}--bmrg-feedback-container ${prefix}--bmrg-header-modal`}
      onClose={props.closeModal}
      onKeyDown={(e: any) => e.stopPropagation()}
    >
      <ModalHeader title="Submit an Idea" closeModal={props.closeModal} />
      <ModalBody>
        <div className={`${prefix}--bmrg-feedback`}>
          <p>
            Share your thoughts and ideas on what we can do to improve the {props.platformName} platform and our
            onboarding process.
          </p>
          <p>
            To submit your idea, visit our portal at
            {" " /* We need to force a space before the link tag */}
            <a
              aria-describedby="new-window-aria-desc-0"
              href={props.sendIdeasUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {props.sendIdeasUrl}
            </a>
            .
          </p>
          <p>
            For now, you must have an {props.platformOrganization} email address and you will need to register with a
            password during your first visit.
          </p>
          <p>
            You will have the opportunity to see other public ideas, vote on them and track the status of your idea.
          </p>
          <p>We look forward to your feedback!</p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button data-modal-primary-focus kind="primary" onClick={props.closeModal}>
          OK
        </Button>
      </ModalFooter>
    </ComposedModal>
  );
}

function FeedbackMenuItem(props: Omit<Props, "isOpen" | "closeModal">) {
  const menuItemRef = React.useRef<HTMLLinkElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      menuItemRef.current?.focus();
    }, 0);
  };

  return (
    <>
      <HeaderMenuItem
        icon={<Idea />}
        onClick={() => setIsOpen(!isOpen)}
        ref={menuItemRef}
        text="Submit an idea"
        type="button"
      />
      <Feedback isOpen={isOpen} closeModal={handleClose} {...props} />
    </>
  );
}

export { FeedbackMenuItem };

export default Feedback;
