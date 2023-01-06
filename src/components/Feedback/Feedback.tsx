import React from "react";
import { prefix } from "../../internal/settings";
import { Button, ComposedModal, ModalHeader, ModalBody, ModalFooter } from "@carbon/react";
import FocusTrap from "focus-trap-react";
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
  const ref = React.useRef<HTMLDivElement>(null);

  const handleKeyDownEvent = React.useCallback((event: KeyboardEvent) => {
    console.log(event);
    if (event.key === "Escape") {
      event.stopPropagation();
      event.stopImmediatePropagation();
    }
    return;
  }, []);

  React.useEffect(() => {
    if (ref.current) {
      ref.current?.addEventListener("keydown", handleKeyDownEvent);
    }
    return ref.current?.removeEventListener("keydown", handleKeyDownEvent);
  }, [handleKeyDownEvent]);


  return (
    <div ref={ref}>
      <FocusTrap active={props.isOpen} focusTrapOptions={{ allowOutsideClick: true }}>
        <ComposedModal
          open={props.isOpen}
          className={`${prefix}--bmrg-feedback-container`}
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
                For now, you must have an {props.platformOrganization} email address and you will need to register with
                a password during your first visit.
              </p>
              <p>
                You will have the opportunity to see other public ideas, vote on them and track the status of your idea.
              </p>
              <p>We look forward to your feedback!</p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button kind="primary" onClick={props.closeModal}>
              OK
            </Button>
          </ModalFooter>
        </ComposedModal>
      </FocusTrap>
    </div>
  );
}

function FeedbackMenuItem(props: Omit<Props, "isOpen" | "closeModal">) {
  const menuItemRef = React.useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = () => {
    setIsOpen(false);
    menuItemRef.current?.focus();
  };

  return (
    <>
      <HeaderMenuItem type="button" icon={<Idea />} text="Submit an idea" onClick={() => setIsOpen(!isOpen)} />
      <Feedback isOpen={isOpen} closeModal={handleClose} {...props} />
    </>
  );
}

export { FeedbackMenuItem };

export default Feedback;
