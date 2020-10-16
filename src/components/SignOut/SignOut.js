import React from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';
import { Button } from 'carbon-components-react';
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'carbon-components-react/lib/components/ComposedModal';

import HeaderMenuItem from '../HeaderMenuItem';

const { prefix } = settings;

SignOutContainer.propTypes = {
  signOutLink: PropTypes.string,
};

SignOutContainer.defaultProps = {};

function SignOutContainer({ signOutLink }) {
  return (
    <HeaderMenuItem
      text="Sign out"
      iconName="power"
      className={`${prefix}--bmrg-signout-container`}
    >
      {({ closeModal }) => {
        return (
          <>
            <ModalHeader title="Sign out?" closeModal={closeModal} />
            <ModalBody>
              <div className={`${prefix}--bmrg-signout`}>
                <p className={`${prefix}--bmrg-signout__message`}>
                  {"Are you sure you'd like to leave us?"}
                </p>
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
