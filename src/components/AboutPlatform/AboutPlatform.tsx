import React from "react";
import { prefix } from "../../internal/settings";
import { ModalHeader, ModalBody } from "@carbon/react";
import IBMCloudIcon from "./assets/IBMCloudIcon";
import HeaderMenuItem from "../HeaderMenuItem";
import KubernetesIcon from "./assets/KubernetesIcon";
import MongoDbIcon from "./assets/MongoDbIcon";
import NATSIcon from "./assets/NATSIcon";
import OpenShiftIcon from "./assets/OpenShiftIcon";
import ReactIcon from "./assets/ReactIcon";
import SpringIcon from "./assets/SpringIcon";
import TektonIcon from "./assets/TektonIcon";
import { ModalFunctionChildrenProps } from "../../types";

const iconClassName = `${prefix}--bmrg-aboutPlatform-images__img`;

interface AboutPlatformContainerProps {
  isFlowApp?: boolean;
  version?: string;
  organization?: string;
}

function AboutPlatformContainer({ version = "", organization = "IBM", isFlowApp }: AboutPlatformContainerProps) {
  return (
    <HeaderMenuItem
      text="About the Platform"
      iconName="information"
      className={`${prefix}--bmrg-aboutPlatform-container`}
    >
      {({ closeModal }: ModalFunctionChildrenProps) => {
        return (
          <>
            <ModalHeader
              closeModal={closeModal}
              label={`${organization} ${" "} | ${" "} Version ${version}`}
              title="About the Platform"
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
          </>
        );
      }}
    </HeaderMenuItem>
  );
}

export default AboutPlatformContainer;
