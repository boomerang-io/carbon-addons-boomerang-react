import React from "react";
import { ComposedModal, ModalHeader, ModalBody } from "@carbon/react";
import FocusTrap from "focus-trap-react";
import HeaderMenuItem from "../HeaderMenuItem";
import { Information } from "@carbon/react/icons";
import IBMCloudIcon from "./assets/IBMCloudIcon";
import KubernetesIcon from "./assets/KubernetesIcon";
import MongoDbIcon from "./assets/MongoDbIcon";
import NATSIcon from "./assets/NATSIcon";
import OpenShiftIcon from "./assets/OpenShiftIcon";
import ReactIcon from "./assets/ReactIcon";
import SpringIcon from "./assets/SpringIcon";
import TektonIcon from "./assets/TektonIcon";
import { prefix } from "../../internal/settings";

const iconClassName = `${prefix}--bmrg-aboutPlatform-images__img`;

type Props = {
  closeModal: () => void;
  name?: string;
  isOpen: boolean;
  isFlowApp?: boolean;
  version?: string;
};

function AboutPlatform({ closeModal, isOpen = false, version = "", name, isFlowApp }: Props) {
  return (
    <FocusTrap active={isOpen} focusTrapOptions={{ allowOutsideClick: true }}>
      <ComposedModal open={isOpen} className={`${prefix}--bmrg-aboutPlatform-container`} onClose={closeModal}>
        <ModalHeader
          label={`${name} ${" "} | ${" "} Version ${version}`}
          title="About the Platform"
          closeModal={closeModal}
        />
        <ModalBody>
          <footer className={`${prefix}--bmrg-aboutPlatform-footer`}>
            <h1 className={`${prefix}--bmrg-aboutPlatform-footer__header`}>Powered by</h1>
            <ul className={`${prefix}--bmrg-aboutPlatform-images`}>
              {isFlowApp ? (
                <>
                  <li key="tekton-icon">
                    <a href="https://tekton.dev/" target="_blank" rel="noopener noreferrer">
                      <TektonIcon className={iconClassName} />
                    </a>
                  </li>
                  <li key="nats-icon">
                    <a href="https://nats.io/" target="_blank" rel="noopener noreferrer">
                      <NATSIcon className={iconClassName} />
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li key="ibm-cloud-icon">
                    <a href="https://www.ibm.com/cloud" target="_blank" rel="noopener noreferrer">
                      <IBMCloudIcon className={iconClassName} />
                    </a>
                  </li>
                  <li key="openshift-icon">
                    <a
                      href="https://www.redhat.com/en/technologies/cloud-computing/openshift"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <OpenShiftIcon className={iconClassName} />
                    </a>
                  </li>
                </>
              )}
              <li key="kubernetes-icon">
                <a href="https://kubernetes.io/" target="_blank" rel="noopener noreferrer">
                  <KubernetesIcon className={iconClassName} />
                </a>
              </li>
              <li key="spring-icon">
                <a href="https://spring.io/" target="_blank" rel="noopener noreferrer">
                  <SpringIcon className={iconClassName} />
                </a>
              </li>
              <li key="react-icon">
                <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
                  <ReactIcon className={iconClassName} />
                </a>
              </li>
              <li key="mongodb-icon">
                <a href="https://www.mongodb.com/" target="_blank" rel="noopener noreferrer">
                  <MongoDbIcon className={iconClassName} />
                </a>
              </li>
            </ul>
          </footer>
        </ModalBody>
      </ComposedModal>
    </FocusTrap>
  );
}

export default AboutPlatform;

function AboutPlatformMenuItem(props: Omit<Props, "isOpen" | "closeModal">) {
  const menuItemRef = React.useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = () => {
    setIsOpen(false);
    menuItemRef.current?.focus();
  };

  return (
    <>
      <HeaderMenuItem kind="button" icon={<Information />} text="About Platform" onClick={() => setIsOpen(!isOpen)} />
      <AboutPlatform isOpen={isOpen} closeModal={handleClose} {...props} />
    </>
  );
}

export { AboutPlatformMenuItem };
