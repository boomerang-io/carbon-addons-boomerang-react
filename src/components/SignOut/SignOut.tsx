import React from "react";
import { prefix } from "../../internal/settings";
import { Button } from "@carbon/react";
import { ModalHeader, ModalBody, ModalFooter } from "@carbon/react";

import HeaderMenuItem from "../HeaderMenuItem";

SignOutContainer.defaultProps = {};

type OwnProps = {
  signOutLink: string;
};

type Props = OwnProps & typeof SignOutContainer.defaultProps;

function SignOutContainer({ signOutLink }: Props) {
  return (
    <HeaderMenuItem text="Sign out" iconName="power" className={`${prefix}--bmrg-signout-container`}>
      {({ closeModal }: any) => {
        return (
          <>
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
          </>
        );
      }}
    </HeaderMenuItem>
  );
}

export default SignOutContainer;
