import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, TextInput, ModalBody, ModalFooter } from 'carbon-components-react';
import FlowModal from './FlowModal';
import FlowModalForm from './FlowModalForm';

const Component1 = (props) => (
  <FlowModalForm title="Testing some text here">
    <ModalBody>
      <TextInput
        id="testing"
        onChange={(e) => props.saveValues({ text: e.target.value })}
        placeholder="The second component will know what you write here"
      />
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
      <div style={{ height: '30rem' }}>I cause an y overflow. Try scrolling</div>
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
    this.props.setShouldConfirmModalClose(true);
  }

  render() {
    return (
      <FlowModalForm>
        <ModalBody>
          <p>
            This component will ask if you really wanna close the modal when pressing the close
            modal button
          </p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.props.requestPreviousStep}>Previous</Button>
          <Button onClick={this.props.forceCloseModal}>Force Close Modal</Button>
        </ModalFooter>
      </FlowModalForm>
    );
  }
}

storiesOf('FlowModal', module)
  .add('default', () => {
    return (
      <FlowModal
        appElement="#root"
        composedModalProps={{ selectorPrimaryFocus: 'input[id="testing"]' }}
        confirmModalProps={{
          title: 'Close Modal Flow?',
          children: <div>You will need to start from the first component</div>,
        }}
        modalHeaderProps={{
          title: 'MODAL FLOW',
          label: 'Change between components and persisted data',
        }}
        modalTrigger={({ openModal }) => <Button onClick={openModal}>Open modal flow</Button>}
      >
        <Component1 />
        <Component2 />
        <Component3 />
      </FlowModal>
    );
  })
  .add('initially open', () => {
    return (
      <FlowModal
        isOpen
        appElement="#root"
        progressSteps={[
          { label: 'Source' },
          { label: 'Repo' },
          { label: 'App Type' },
          { label: 'Name' },
          { label: 'Confirm' },
        ]}
        composedModalProps={{ selectorPrimaryFocus: 'input[id="testing"]' }}
        confirmModalProps={{
          title: 'Close Create Component?',
          children: <div>Your current progress will not be saved.</div>,
        }}
        modalHeaderProps={{
          subTitle: 'Create a new component for IBM Services Engineering',
          title: 'Create Component',
        }}
        modalTrigger={({ openModal }) => <Button onClick={openModal}>Open modal flow</Button>}
      >
        <Component1 />
        <Component2 />
        <Component2 />
        <Component2 />
        <Component3 />
      </FlowModal>
    );
  });
