/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { Button, TextInput, ModalBody, ModalFooter, Tooltip } from "@carbon/react";
import FlowModal from "./FlowModal";
import FlowModalForm from "./FlowModalForm";

export default {
  title: "Components/FlowModal",
  component: FlowModal,
  parameters: {
    docs: {
      description: {
        component: "Multi-step modal that display children as steps in a flow. Useful for long, multi-part forms.",
      },
    },
  },
};

const Component1 = (props) => (
  <FlowModalForm title="Testing some text here">
    <ModalBody>
      <TextInput
        id="testing"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.saveValues({ text: e.target.value })}
        placeholder="The second component will know what you write here"
      />
      <Tooltip description="Hello">
        <p>Test Tooltip</p>
      </Tooltip>
    </ModalBody>
    <ModalFooter>
      <Button kind="secondary" onClick={props.closeModal}>
        Cancel
      </Button>
      <Button onClick={props.requestNextStep}>Next</Button>
    </ModalFooter>
  </FlowModalForm>
);

const Component2 = (props) => (
  <FlowModalForm element="div" title="Another title here">
    <ModalBody>
      <p>Value wrote in previous component: {props.formData.text}</p>
      <div style={{ height: "30rem" }}>I cause an y overflow. Try scrolling</div>
    </ModalBody>
    <ModalFooter>
      <Button kind="secondary" onClick={props.requestPreviousStep}>
        Previous
      </Button>
      <Button onClick={props.requestNextStep}>Next</Button>
    </ModalFooter>
  </FlowModalForm>
);

class Component3 extends React.Component {
  componentDidMount() {
    (this.props as any).setShouldConfirmModalClose(true);
  }

  render() {
    return (
      <FlowModalForm>
        <ModalBody>
          <p>This component will ask if you really wanna close the modal when pressing the close modal button</p>
        </ModalBody>
        <ModalFooter>
          <Button kind="secondary" onClick={(this.props as any).requestPreviousStep}>Previous</Button>
          <Button onClick={(this.props as any).forceCloseModal}>Force Close Modal</Button>
        </ModalFooter>
      </FlowModalForm>
    );
  }
}

export const Default = (args) => {
  return (
    <FlowModal
      appElement="#root"
      composedModalProps={{ selectorPrimaryFocus: 'input[id="testing"]' }}
      confirmModalProps={{
        title: "Close Modal Flow?",
        children: <div>You will need to start from the first component</div>,
      }}
      modalHeaderProps={{
        title: "Modal Flow",
        label: "Change between components and persisted data",
      }}
      modalTrigger={({ openModal }) => <Button onClick={openModal}>Open modal flow</Button>}
      {...args}
    >
      <Component1 />
      <Component2 />
      <Component3 />
    </FlowModal>
  );
};
