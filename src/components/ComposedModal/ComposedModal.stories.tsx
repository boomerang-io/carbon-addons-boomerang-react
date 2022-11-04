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

function Component1(props: any) {
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

function Component2(props: any) {
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
      // @ts-expect-error TS(2322): Type '({ openModal }: any) => Element' is not assi... Remove this comment to see the full error message
      modalTrigger={({ openModal }) => <Button onClick={openModal}>Open modal composed</Button>}
    >
      {({ closeModal }) => <Component1 closeModal={closeModal} />}
    </ComposedModal>
  );
};


export const Size = () => {
  const [size, setSize] = React.useState("");
  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        {/* @ts-expect-error TS(2741): Property 'name' is missing in type '{ id: string; ... Remove this comment to see the full error message */}
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
        // @ts-expect-error TS(2322): Type 'string' is not assignable to type '"xs" | "s... Remove this comment to see the full error message
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
        // @ts-expect-error TS(2322): Type '({ openModal }: any) => Element' is not assi... Remove this comment to see the full error message
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
