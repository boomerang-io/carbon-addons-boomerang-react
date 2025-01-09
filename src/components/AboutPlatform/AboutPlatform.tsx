/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { ComposedModal, ModalHeader, ModalBody } from "@carbon/react";
import { Information } from "@carbon/react/icons";
import HeaderMenuItem from "../Header/HeaderMenuItem";
import IBMCloudIcon from "./assets/IBMCloudIcon";
import KubernetesIcon from "./assets/KubernetesIcon";
import MongoDbIcon from "./assets/MongoDbIcon";
import OpenShiftIcon from "./assets/OpenShiftIcon";
import ReactIcon from "./assets/ReactIcon";
import SpringIcon from "./assets/SpringIcon";
import { prefix } from "../../internal/settings";

const iconClassName = `${prefix}--bmrg-aboutPlatform-images__img`;

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
          <h1 className={`${prefix}--bmrg-aboutPlatform-footer__header`}>Powered by</h1>
          <ul className={`${prefix}--bmrg-aboutPlatform-images`}>
            <li key="ibm-cloud-icon">
              <a href="https://www.ibm.com/cloud" target="_blank" rel="noopener noreferrer" title="IBM Cloud">
                <IBMCloudIcon className={iconClassName} />
              </a>
            </li>
            <li key="openshift-icon">
              <a
                href="https://www.redhat.com/en/technologies/cloud-computing/openshift"
                target="_blank"
                rel="noopener noreferrer"
                title="OpenShift"
              >
                <OpenShiftIcon className={iconClassName} />
              </a>
            </li>
            <li key="kubernetes-icon">
              <a href="https://kubernetes.io/" target="_blank" rel="noopener noreferrer" title="Kubernetes">
                <KubernetesIcon className={iconClassName} />
              </a>
            </li>
            <li key="spring-icon">
              <a href="https://spring.io/" target="_blank" rel="noopener noreferrer" title="Spring">
                <SpringIcon className={iconClassName} />
              </a>
            </li>
            <li key="react-icon">
              <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer" title="React">
                <ReactIcon className={iconClassName} />
              </a>
            </li>
            <li key="mongodb-icon">
              <a href="https://www.mongodb.com/" target="_blank" rel="noopener noreferrer" title="MongoDB">
                <MongoDbIcon className={iconClassName} />
              </a>
            </li>
          </ul>
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
