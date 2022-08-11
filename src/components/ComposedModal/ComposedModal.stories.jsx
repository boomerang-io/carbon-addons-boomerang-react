import React from "react";
import TextInput from "../TextInput";
import { Button, ModalBody, ModalFooter } from "@carbon/react";
import ComposedModal from "./index";
import ModalForm from "../ModalForm/ModalForm";
import RadioGroup from "../RadioGroup";

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
    <ModalForm title="Testing some text here">
      <ModalBody>
        <TextInput
          label="test"
          tooltipContent="testing testingtestingtestingtestingtesting testing testingtestingtestingtestingtestingtesting testingtestingtestingtestingtestingtesting testingtestingtestingtestingtestingtesting testingtestingtestingtestingtestingtesting testingtestingtestingtestingtesting"
          id="testing"
          onChange={() => {}}
          placeholder="This is an input"
        />
        <TextInput
          label="test"
          tooltipContent="testing testingtestingtestingtestingtesting testing testingtestingtestingtestingtestingtesting testingtestingtestingtestingtestingtesting testingtestingtestingtestingtestingtesting testingtestingtestingtestingtestingtesting testingtestingtestingtestingtesting"
          id="testing2"
          onChange={() => {}}
          placeholder="This is another input"
        />
      </ModalBody>
      <ModalFooter>
        <Button kind="secondary" onClick={props.closeModal}>
          Cancel
        </Button>
        <Button onClick={props.closeModal}>Done</Button>
      </ModalFooter>
    </ModalForm>
  );
}

function Component2(props) {
  React.useEffect(() => {
    props.setShouldConfirmModalClose(true);
    // eslint-disable-next-line
  }, []);

  return (
    <ModalForm title="Testing some text here">
      <ModalBody>
        <TextInput tooltipContent="testing" id="testing" onChange={() => {}} placeholder="This is an input" />
      </ModalBody>
      <ModalFooter>
        <Button kind="secondary" onClick={props.closeModal}>
          Cancel
        </Button>
        <Button onClick={props.closeModal}>Done</Button>
      </ModalFooter>
    </ModalForm>
  );
}

export const Default = () => {
  return (
    <ComposedModal
      appElement="#root"
      composedModalProps={{ selectorPrimaryFocus: 'input[id="testing"]' }}
      confirmModalProps={{
        title: "Close Composed Modal?",
        children: <div>You will need to start from the first component</div>,
      }}
      modalHeaderProps={{
        title: "Composed Modal",
        label: "Single child as a function",
        subtitle: "Even more info here",
      }}
      modalTrigger={({ openModal }) => <Button onClick={openModal}>Open modal composed</Button>}
    >
      {({ closeModal }) => <Component1 closeModal={closeModal} />}
    </ComposedModal>
  );
};

export const InitiallyOpen = () => {
  return (
    <ComposedModal
      isOpen
      appElement="#root"
      composedModalProps={{ selectorPrimaryFocus: 'input[id="testing"]' }}
      confirmModalProps={{
        title: "Close Create Component?",
        children: <div>Your current progress will not be saved.</div>,
      }}
      modalHeaderProps={{
        subTitle: "Create a new component for IBM Services Engineering",
        title: "Create Component",
      }}
      modalTrigger={({ openModal }) => <Button onClick={openModal}>Open modal flow</Button>}
    >
      {({ closeModal, setShouldConfirmModalClose }) => (
        <Component2 closeModal={closeModal} setShouldConfirmModalClose={setShouldConfirmModalClose} />
      )}
    </ComposedModal>
  );
};

InitiallyOpen.story = {
  name: "Initially open",
};

export const Size = () => {
  const [size, setSize] = React.useState("");
  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <RadioGroup
          id="testSize"
          //defaultSelected={"md"}
          labelText={"Size"}
          onChange={(value) => setSize(value)}
          options={[
            { labelText: "xs", value: "xs" },
            { labelText: "sm", value: "sm" },
            { labelText: "md", value: "md" },
            { labelText: "lg", value: "lg" },
          ]}
          orientation="horizontal"
        />
      </div>
      <ComposedModal
        size={size}
        appElement="#root"
        composedModalProps={{ selectorPrimaryFocus: 'input[id="testing"]' }}
        confirmModalProps={{
          title: "Close Composed Modal?",
          children: <div>You will need to start from the first component</div>,
        }}
        modalHeaderProps={{
          title: "Composed Modal",
          label: "Single child as a function",
          subtitle: "Even more info here",
        }}
        modalTrigger={({ openModal }) => <Button onClick={openModal}>Open modal composed</Button>}
      >
        {({ closeModal }) => <Component1 closeModal={closeModal} />}
      </ComposedModal>
    </div>
  );
};

Size.story = {
  name: "Size",
};
