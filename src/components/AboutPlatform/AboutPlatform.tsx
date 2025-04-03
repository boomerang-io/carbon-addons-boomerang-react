/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2025
*/


import React from "react";
import { ComposedModal, ModalHeader, ModalBody } from "@carbon/react";
import { Information } from "@carbon/react/icons";
import HeaderMenuItem from "../Header/HeaderMenuItem";
import { prefix } from "../../internal/settings";

type Props = {
  closeModal: () => void;
  isOpen: boolean;
  name: string;
  version: string;
};

function AboutPlatform({ closeModal, isOpen = false, version, name }: Props) {
  return (
    <ComposedModal
      open={isOpen}
      className={`${prefix}--bmrg-aboutPlatform-container ${prefix}--bmrg-header-modal`}
      onClose={closeModal}
    >
      <ModalHeader label={`${name}  |  Version ${version}`} title="About the Platform" closeModal={closeModal} />
      <ModalBody>
        <footer className={`${prefix}--bmrg-aboutPlatform-footer`}>
          <h1 className={`${prefix}--bmrg-aboutPlatform-footer__header`}>Copyright IBM Corp. 2022, 2025</h1>
        </footer>
      </ModalBody>
    </ComposedModal>
  );
}

export default AboutPlatform;

function AboutPlatformMenuItem(props: Omit<Props, "isOpen" | "closeModal">) {
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
        icon={<Information />}
        onClick={() => setIsOpen(!isOpen)}
        ref={menuItemRef}
        text="About Platform"
        type="button"
      />
      <AboutPlatform isOpen={isOpen} closeModal={handleClose} {...props} />
    </>
  );
}

export { AboutPlatformMenuItem };
