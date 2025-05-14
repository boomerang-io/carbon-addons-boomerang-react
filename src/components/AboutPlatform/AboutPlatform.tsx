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
  assistantVersion:string;
  agentsVersion:string;
  scribeFlowVersion:string
};

function AboutPlatform({ closeModal, isOpen = false, version, name, assistantVersion, agentsVersion, scribeFlowVersion }: Props) {
  return (
    <ComposedModal
      open={isOpen}
      className={`${prefix}--bmrg-aboutPlatform-container ${prefix}--bmrg-header-modal ${prefix}--bmrg-aboutPlatform-modalheader`}
      onClose={closeModal}
    >
      <ModalHeader className={`${prefix}--bmrg-aboutPlatform-modaltitle`} title="About the Platform" closeModal={closeModal} />
      <ModalBody>
        <div>
          <h5 className={`${prefix}--bmrg-aboutPlatform-component-header`}>Components</h5>
          <ul >
            <li className={`${prefix}--bmrg-aboutPlatform-li-between-first`} >
              <div className={`${prefix}--bmrg-aboutPlatform-li`}>IBM Consulting Advantage </div>
              <div className={`${prefix}--bmrg-aboutPlatform-li-version`}>{version}</div>
            </li>
            <li className={`${prefix}--bmrg-aboutPlatform-li-between`}>
              <div className={`${prefix}--bmrg-aboutPlatform-li`}>Assistants </div>
              <span className={`${prefix}--bmrg-aboutPlatform-li-version`}>{assistantVersion}</span>
            </li>
            <li className={`${prefix}--bmrg-aboutPlatform-li-between`}>
              <div className={`${prefix}--bmrg-aboutPlatform-li`}>Agents</div>
              <span className={`${prefix}--bmrg-aboutPlatform-li-version`}>{agentsVersion}</span>
            </li>
            <li className={`${prefix}--bmrg-aboutPlatform-li-between-last`} >
              <div className={`${prefix}--bmrg-aboutPlatform-li`}>Scribeflow</div>
              <span className={`${prefix}--bmrg-aboutPlatform-li-version`}>{scribeFlowVersion}</span>
            </li>
          </ul>
          <h1 className={`${prefix}--bmrg-aboutPlatform-footer__header`}>Copyright IBM Corp. 2022, 2025</h1>
        </div>
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
        text="About the Platform"
        type="button"
      />
      <AboutPlatform isOpen={isOpen} closeModal={handleClose} {...props} />
    </>
  );
}

export { AboutPlatformMenuItem };
