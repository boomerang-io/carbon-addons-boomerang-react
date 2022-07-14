import React from "react";
import { action } from "@storybook/addon-actions";
import { Button } from "@carbon/react";
import ConfirmModal from "./ConfirmModal";

export default {
  title: "Components/ConfirmModal",
  component: ConfirmModal
};


function ExternallyControlled() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
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
    >
      <div>Affirmative action should close modal after 2 seconds and negative after 1 second</div>
    </ConfirmModal>
  );
}

export const Default = () => {
  return (
    <ConfirmModal
      affirmativeAction={action("confirm modal affirmative action")}
      appElement="#root"
      label="do things"
      title="Yeah?"
      modalTrigger={({ openModal }) => <Button onClick={openModal}>Open confirm modal</Button>}
    >
      <div>stuff here</div>
    </ConfirmModal>
  );
};

Default.story = {
  name: "default",
};

export const InitiallyOpen = () => {
  return (
    <ConfirmModal
      affirmativeAction={action("confirm modal affirmative action")}
      appElement="#root"
      label="delete things"
      title="Huh?"
      isOpen
      modalTrigger={({ openModal }) => <Button onClick={openModal}>Open confirm modal</Button>}
    />
  );
};

InitiallyOpen.story = {
  name: "initially open",
};

export const _ExternallyControlled = () => {
  return <ExternallyControlled />;
};

_ExternallyControlled.story = {
  name: "externally controlled",
};
