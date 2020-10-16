import React from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';
import { ModalHeader, ModalBody } from 'carbon-components-react/lib/components/ComposedModal';
import IBMCloudIcon from './assets/IBMCloudIcon';
import HeaderMenuItem from '../HeaderMenuItem';
import KubernetesIcon from './assets/KubernetesIcon';
import MongoDbIcon from './assets/MongoDbIcon';
import OpenShiftIcon from './assets/OpenShiftIcon';
import ReactIcon from './assets/ReactIcon';
import SpringIcon from './assets/SpringIcon';

const { prefix } = settings;

const AboutPlatformContainer = ({ version, organization }) => {
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
                  <li key="ibm-cloud-icon">
                    <IBMCloudIcon
                      alt="IBM Cloud Icon"
                      className={`${prefix}--bmrg-aboutPlatform-images__img`}
                    />
                  </li>
                  <li key="openshift-icon">
                    <OpenShiftIcon
                      alt="Openshift Icon"
                      className={`${prefix}--bmrg-aboutPlatform-images__img`}
                    />
                  </li>
                  <li key="kubernetes-icon">
                    <KubernetesIcon
                      alt="Kubernetes Icon"
                      className={`${prefix}--bmrg-aboutPlatform-images__img`}
                    />
                  </li>
                  <li key="spring-icon">
                    <SpringIcon
                      alt="Spring Icon"
                      className={`${prefix}--bmrg-aboutPlatform-images__img`}
                    />
                  </li>
                  <li key="react-icon">
                    <ReactIcon
                      alt="React Icon"
                      className={`${prefix}--bmrg-aboutPlatform-images__img`}
                    />
                  </li>
                  <li key="mongodb-icon">
                    <MongoDbIcon
                      alt="Mongodb Icon"
                      className={`${prefix}--bmrg-aboutPlatform-images__img`}
                    />
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
  closeModal: PropTypes.func,
};

AboutPlatformContainer.defaultProps = {
  organization: 'IBM',
  version: '',
};

export default AboutPlatformContainer;
