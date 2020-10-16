import React from 'react';
import { storiesOf } from '@storybook/react';
import TextInput from '../TextInput';
import { Button, ModalBody, ModalFooter } from 'carbon-components-react';
import ComposedModal from './index';
import ModalForm from '../ModalForm/ModalForm';

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
        <TextInput
          tooltipContent="testing"
          id="testing"
          onChange={() => {}}
          placeholder="This is an input"
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

storiesOf('ComposedModal', module)
  .add('default', () => {
    return (
      <ComposedModal
        appElement="#root"
        composedModalProps={{ selectorPrimaryFocus: 'input[id="testing"]' }}
        confirmModalProps={{
          title: 'Close Composed Modal?',
          children: <div>You will need to start from the first component</div>,
        }}
        modalHeaderProps={{
          title: 'Composed Modal',
          label: 'Single child as a function',
          subtitle: 'Even more info here',
        }}
        modalTrigger={({ openModal }) => <Button onClick={openModal}>Open modal composed</Button>}
      >
        {({ closeModal }) => <Component1 closeModal={closeModal} />}
      </ComposedModal>
    );
  })
  .add('initially open', () => {
    return (
      <ComposedModal
        isOpen
        appElement="#root"
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
        {({ closeModal, setShouldConfirmModalClose }) => (
          <Component2
            closeModal={closeModal}
            setShouldConfirmModalClose={setShouldConfirmModalClose}
          />
        )}
      </ComposedModal>
    );
  });
