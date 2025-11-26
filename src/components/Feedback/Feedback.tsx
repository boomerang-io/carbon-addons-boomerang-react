/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { Button, ComposedModal, ModalHeader, ModalBody, ModalFooter } from "@carbon/react";
import { Idea } from "@carbon/react/icons";
import HeaderMenuItem from "../Header/HeaderMenuItem";
import { prefix } from "../../internal/settings";

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
            Have an idea on how we can improve Consulting Advantage? Submit your idea  
            {" " /* We need to force a space before the link tag */}
            <a
              aria-describedby="new-window-aria-desc-0"
              href={props.sendIdeasUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>.
             You’ll be able to see other public ideas, vote on them, and track the status of your idea.
          </p>
          <p>
           Have an innovative new asset, assistant, or automation you've built outside of ICA? 
            {" " /* We need to force a space before the link tag */}
           Submit your idea  <a
              aria-describedby="new-window-aria-desc-0"
              href={props.sendIdeasUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a> and you could win a BluePoints award.
          </p>
          <p>We look forward to your feedback and ideas!"</p>
         
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
