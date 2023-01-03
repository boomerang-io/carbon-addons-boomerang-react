import React from "react";
import { prefix } from "../../internal/settings";
import { Button } from "@carbon/react";
import { ComposedModal, ModalHeader, ModalBody, ModalFooter } from "@carbon/react";

type Props = {
  platformName?: string;
  platformOrganization?: string;
  sendIdeasUrl?: string;
};

function closeModal() {
  return void 0;
}

function Feedback(props: Props) {
  return (
    <ComposedModal open={true} className={`${prefix}--bmrg-feedback-container`}>
      <ModalHeader title="Submit an Idea" closeModal={closeModal} />
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
              href={props.sendIdeasUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-describedby="new-window-aria-desc-0"
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
        <Button kind="primary" onClick={closeModal}>
          OK
        </Button>
      </ModalFooter>
    </ComposedModal>
  );
}

export default Feedback;
