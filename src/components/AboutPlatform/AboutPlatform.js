import React from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';
import { ModalHeader, ModalBody } from 'carbon-components-react/es/components/ComposedModal';
import IBMCloudIcon from './assets/IBMCloudIcon';
import HeaderMenuItem from '../HeaderMenuItem';
import KubernetesIcon from './assets/KubernetesIcon';
import MongoDbIcon from './assets/MongoDbIcon';
import NATSIcon from './assets/NATSIcon';
import OpenShiftIcon from './assets/OpenShiftIcon';
import ReactIcon from './assets/ReactIcon';
import SpringIcon from './assets/SpringIcon';
import TektonIcon from './assets/TektonIcon';

const { prefix } = settings;

const AboutPlatformContainer = ({ version, organization, isFlowApp }) => {
  return (
    <HeaderMenuItem
      text="About the Platform"
      iconName="information"
      className={`${prefix}--bmrg-aboutPlatform-container`}
    >
      {({ closeModal }) => {
        return (
          <>
            <ModalHeader
              closeModal={closeModal}
              label={`${organization} ${' '} | ${' '} version ${version}`}
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
                          <TektonIcon
                            alt="Tekton Icon"
                            className={`${prefix}--bmrg-aboutPlatform-images__img`}
                          />
                        </a>
                      </li>
                      <li key="nats-icon">
                        <a href="https://nats.io/" target="_blank" rel="noopener noreferrer">
                          <NATSIcon
                            alt="NATS Icon"
                            className={`${prefix}--bmrg-aboutPlatform-images__img`}
                          />
                        </a>
                      </li>
                    </>
                  ) : (
                    <>
                      <li key="ibm-cloud-icon">
                        <a href="https://www.ibm.com/cloud" target="_blank" rel="noopener noreferrer">
                          <IBMCloudIcon
                            alt="IBM Cloud Icon"
                            className={`${prefix}--bmrg-aboutPlatform-images__img`}
                          />
                        </a>
                      </li>
                      <li key="openshift-icon">
                        <a href="https://www.redhat.com/en/technologies/cloud-computing/openshift" target="_blank" rel="noopener noreferrer">
                          <OpenShiftIcon
                            alt="Openshift Icon"
                            className={`${prefix}--bmrg-aboutPlatform-images__img`}
                          />
                        </a>
                      </li>
                    </>
                  )}
                  <li key="kubernetes-icon">
                    <a href="https://kubernetes.io/" target="_blank" rel="noopener noreferrer">
                      <KubernetesIcon
                        className={`${prefix}--bmrg-aboutPlatform-images__img`}
                      />
                    </a>
                  </li>
                  <li key="spring-icon">
                    <a href="https://spring.io/" target="_blank" rel="noopener noreferrer">
                      <SpringIcon
                        alt="Spring Icon"
                        className={`${prefix}--bmrg-aboutPlatform-images__img`}
                      />
                    </a>
                  </li>
                  <li key="react-icon">
                    <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
                      <ReactIcon
                        alt="React Icon"
                        className={`${prefix}--bmrg-aboutPlatform-images__img`}
                      />
                    </a>
                  </li>
                  <li key="mongodb-icon">
                    <a href="https://www.mongodb.com/" target="_blank" rel="noopener noreferrer">
                      <MongoDbIcon
                        alt="Mongodb Icon"
                        className={`${prefix}--bmrg-aboutPlatform-images__img`}
                      />
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
};

AboutPlatformContainer.propTypes = {
  version: PropTypes.string,
  organization: PropTypes.string,
  isFlowApp: PropTypes.bool,
};

AboutPlatformContainer.defaultProps = {
  organization: 'IBM',
  version: '',
};

export default AboutPlatformContainer;
