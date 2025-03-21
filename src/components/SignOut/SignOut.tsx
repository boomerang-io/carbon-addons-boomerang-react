/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { Button, ComposedModal, ModalHeader, ModalBody, ModalFooter } from "@carbon/react";
import { Power } from "@carbon/react/icons";
import HeaderMenuItem from "../Header/HeaderMenuItem";
import { prefix } from "../../internal/settings";

type Props = {
  closeModal: () => void;
  isOpen: boolean;
  signOutLink: string;
};

function SignOut({ closeModal, isOpen, signOutLink }: Props) {
  return (
    <ComposedModal
      aria-label="Sign out"
      open={isOpen}
      className={`${prefix}--bmrg-signout-container ${prefix}--bmrg-header-modal`}
      onClose={closeModal}
    >
      <ModalHeader title="Sign out" closeModal={closeModal} />
      <ModalBody>
        <div className={`${prefix}--bmrg-signout`}>
          <p className={`${prefix}--bmrg-signout__message`}>{"Are you sure you'd like to leave us?"}</p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button data-modal-primary-focus kind="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button kind="primary" role="link" href={signOutLink}>
          Sign Out
        </Button>
      </ModalFooter>
    </ComposedModal>
  );
}

export default SignOut;

function SignOutMenuItem(props: Omit<Props, "isOpen" | "closeModal">) {
  const menuItemRef = React.useRef<HTMLLinkElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      menuItemRef.current?.focus();
    }, 0);
  };

  return (
    <>
      <HeaderMenuItem
        icon={<Power />}
        onClick={() => setIsOpen(!isOpen)}
        ref={menuItemRef}
        style={{ color: "red" }}
        text="Sign Out"
        type="button"
        variant="danger"
      />
      <SignOut isOpen={isOpen} closeModal={handleClose} {...props} />
    </>
  );
}

export { SignOutMenuItem };
