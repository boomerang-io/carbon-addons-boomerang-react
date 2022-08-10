import React from "react";
import TextInput from "../TextInput";
import { Button, ModalBody, ModalFooter } from "@carbon/react";
import ComposedModal from "./index";
import ModalForm from "../ModalForm/ModalForm";

export default {
  title: "Components/ComposedModal",
  component: ComposedModal,
};

function Component1(props) {
  return (
    <ModalForm title="Testing some text here">
      <ModalBody>
        <TextInput
          label="Lorem"
          tooltipContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id pellentesque risus, in dapibus odio. Etiam massa orci, porttitor in neque quis, iaculis aliquam elit. Ut et laoreet mi, ac mattis ipsum. Proin congue consequat purus. Vestibulum eget neque vel est ullamcorper commodo nec a nulla"
          id="testing"
          onChange={() => {}}
          placeholder="This is an input"
        />
        <TextInput
          label="Ipsum"
          tooltipContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id pellentesque risus, in dapibus odio. Etiam massa orci, porttitor in neque quis, iaculis aliquam elit. Ut et laoreet mi, ac mattis ipsum. Proin congue consequat purus. Vestibulum eget neque vel est ullamcorper commodo nec a nulla"
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

export const Default = (args) => {
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
      {...args}
    >
      {({ closeModal }) => <Component1 closeModal={closeModal} />}
    </ComposedModal>
  );
};
