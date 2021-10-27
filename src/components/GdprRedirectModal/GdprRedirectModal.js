import React, { Component } from 'react';
import { ComposedModal, Button } from 'carbon-components-react';
import PropTypes from 'prop-types';
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'carbon-components-react/lib/components/ComposedModal';
import { settings } from 'carbon-components';

import { USER_STATUS } from './constants';
import CastleDrawBridge from './assets/CastleDrawBridge';
import CastleNoDoor from './assets/castle_nodoor';

const { prefix } = settings;

class GdprRedirectModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    baseLaunchEnvUrl: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
  };

  static defaultProps = {
    isOpen: false,
  };

  handleOnSubmit = () => {
    const { baseLaunchEnvUrl, user } = this.props;
    const pendingDeletion = user.status === USER_STATUS.PENDING_DELETION;
    if (pendingDeletion) {
      window.location.assign(`${baseLaunchEnvUrl}/launchpad`); // There is no marketing site so TBD where this links to
    } else {
      window.location.assign(`${baseLaunchEnvUrl}/launchpad?rd=${document.URL}`);
    }
  };

  render() {
    const { isOpen, user } = this.props;

    const pendingDeletion = user.status === USER_STATUS.PENDING_DELETION;
    const contentText = pendingDeletion
      ? 'We’re working on removing your account and personal information from our systems.'
      : 'We’re sorry to interrupt, but we need you to agree to our new privacy statement.';
    const smallText = pendingDeletion
      ? 'Please allow up to 1 month (as mandated by GDPR regulations) for us to process your request.'
      : 'We’ll bring you back right here after.';
    const contentImg = pendingDeletion ? (
      <CastleNoDoor className={`${prefix}--bmrg-redirect__img`} alt="redirect" />
    ) : (
      <CastleDrawBridge className={`${prefix}--bmrg-redirect__img`} alt="redirect" />
    );

    const buttonText = pendingDeletion ? 'Boomerang' : 'View Consent Form';

    return (
      <div className={`${prefix}--bmrg-redirect-container`}>
        <ComposedModal
          open={isOpen}
          onClose={() => {
            return false;
          }}
        >
          <div ref={(node) => (this.node = node)}>
            <ModalHeader title="Hi Mate," />
            <ModalBody>
              <span className={`${prefix}--bmrg-redirect__body`}>
                {contentText} {smallText}
              </span>
              {contentImg}
            </ModalBody>
            <ModalFooter>
              <Button kind="primary" onClick={this.handleOnSubmit}>
                {buttonText}
              </Button>
            </ModalFooter>
          </div>
        </ComposedModal>
      </div>
    );
  }
}

export default GdprRedirectModal;
