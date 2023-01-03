import React from "react";
import { prefix } from "../../internal/settings";
import { Button, ComposedModal } from "@carbon/react";
import { ModalHeader, ModalBody, ModalFooter } from "@carbon/react";

type Props = {
  signOutLink: string;
};

function closeModal() {
  return void 0;
}

function SignOutContainer({ signOutLink }: Props) {
  return (
    <ComposedModal open className={`${prefix}--bmrg-signout-container`}>
      <ModalHeader title="Sign out" closeModal={closeModal} />
      <ModalBody>
        <div className={`${prefix}--bmrg-signout`}>
          <p className={`${prefix}--bmrg-signout__message`}>{"Are you sure you'd like to leave us?"}</p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button kind="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button kind="primary" role="link" href={signOutLink}>
          Sign Out
        </Button>
      </ModalFooter>
    </ComposedModal>
  );
}

export default SignOutContainer;
