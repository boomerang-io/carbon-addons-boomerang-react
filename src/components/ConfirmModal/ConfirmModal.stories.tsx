import React from "react";
import { action } from "@storybook/addon-actions";
import { Button } from "@carbon/react";
import ConfirmModal from "./ConfirmModal";

export default {
  title: "Components/ConfirmModal",
  component: ConfirmModal,
  parameters: {
    docs: {
      description: {
        component:
          "A pre-built confirm modal that has built in state management, modal header, exposed trigger and renders children.",
      },
    },
  },
};

export const Default = (args) => {
  return (
    <div id="root">
      <ConfirmModal
        affirmativeAction={action("confirm modal affirmative action")}
        appElement="#root"
        label="do things"
        title="Yeah?"
        modalTrigger={({ openModal }) => <Button onClick={openModal}>Open confirm modal</Button>}
        {...args}
      >
        <div>Welcome to the World Wide Web</div>
      </ConfirmModal>
    </div>
  );
};

export const ExternallyControlled = (args) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div id="root">
      <ConfirmModal
        affirmativeAction={() =>
          setTimeout(function () {
            setIsOpen(false);
          }, 2000)
        }
        negativeAction={() =>
          setTimeout(function () {
            setIsOpen(false);
          }, 1000)
        }
        onCloseModal={() => setIsOpen(false)}
        isExternallyControlled
        appElement="#root"
        label="do things"
        title="Yeah?"
        modalTrigger={() => <Button onClick={() => setIsOpen(true)}>Open confirm modal</Button>}
        isOpen={isOpen}
        {...args}
      >
        <div>Affirmative action should close modal after 2 seconds and negative after 1 second</div>
      </ConfirmModal>
    </div>
  );
};
