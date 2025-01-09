/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import TextInput from "../TextInput";
import { Button, ModalBody, ModalFooter } from "@carbon/react";
import ComposedModal from "./index";
import ModalForm from "../ModalForm/ModalForm";

export default {
  title: "Components/ComposedModal",
  component: ComposedModal,
  parameters: {
    docs: {
      description: {
        component:
          "A pre-built modal that has built in state management, modal header, exposed trigger component, confirm modal, and renders content with function-as-a-child pattern.",
      },
    },
  },
};

function Component1(props) {
  return (
    <ModalForm title="Enter details">
      <ModalBody>
        <TextInput
          label="Name"
          tooltipContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          id="testing"
          onChange={() => {}}
          placeholder="e.g. Button"
        />
        <TextInput
          label="Version"
          tooltipContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          id="testing2"
          onChange={() => {}}
          placeholder="e.g. 1.0.0"
        />
      </ModalBody>
      <ModalFooter>
        <Button kind="secondary" onClick={props.closeModal}>
          Cancel
        </Button>
        <Button onClick={props.closeModal}>Create</Button>
      </ModalFooter>
    </ModalForm>
  );
}

export const Default = (args) => {
  return (
    <ComposedModal
      appElement="#root"
      composedModalProps={{ selectorPrimaryFocus: 'input[id="testing"]' }}
      confirmModalProps={{
        title: "Close Composed ?",
        children: <div>You will need to start from the first component</div>,
      }}
      modalHeaderProps={{
        title: "Create Component",
        label: "Use the form",
        subtitle: "Create a reusable component",
      }}
      modalTrigger={({ openModal }) => <Button onClick={openModal}>Open modal composed</Button>}
      {...args}
    >
      {({ closeModal }) => <Component1 closeModal={closeModal} />}
    </ComposedModal>
  );
};
