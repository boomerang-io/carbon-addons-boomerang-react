import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import dompurify from 'dompurify';
import { Accordion, AccordionItem, Button } from 'carbon-components-react';
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'carbon-components-react/lib/components/ComposedModal';
import { settings } from 'carbon-components';
import window from 'window-or-global';

import HeaderMenuModalWrapper from '../../internal/HeaderMenuModalWrapper';
import HeaderMenuItem from '../HeaderMenuItem';
import notify from '../Notifications/notify';
import ToastNotification from '../Notifications/ToastNotification';

import CastleImg from './assets/x_castle_drawbridge.js';

const { prefix } = settings;

/**
 * Helper to format date timestamp
 * @param {string} timestamp
 * @returns formatted date string
 */
function formatDateTimestamp(timestamp) {
  return new Date(timestamp).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

PrivacyStatement.propTypes = {
  baseServiceUrl: PropTypes.string.isRequired,
};

function PrivacyStatement({ baseServiceUrl }) {
  const [statement, setStatement] = useState();
  const [error, setError] = useState();
  const [alertError, setAlertError] = useState();

  useEffect(() => {
    axios(`${baseServiceUrl}/users/consents`)
      .then((response) => setStatement(response.data))
      .catch((err) => setError(err));
  }, [baseServiceUrl]);

  function handleSubmit({ closeAlertModal, closeModal }) {
    axios
      .put(`${baseServiceUrl}/users/consent`, {
        version: statement.version,
        hasConsented: false,
      })
      .then(() => {
        notify(
          <ToastNotification
            subtitle="Successfully requested account deletion"
            title="Delete Account"
            kind="success"
          />,
          { containerId: `${prefix}--bmrg-header-notifications` }
        );
        // want to clear out any error state
        setError(false);
        setAlertError(false);
        closeAlertModal();
        closeModal();
        if (window.location) {
          window.location.reload(true);
        }
      })
      .catch((err) => {
        setAlertError(err);
        closeAlertModal();
      });
  }

  // TOOD: decide to do something if there is an error or not
  if (error) {
    // noop
  }

  return (
    <HeaderMenuItem
      className={`${prefix}--bmrg-privacy-statement-container`}
      iconName="locked"
      text="Privacy Statement"
    >
      {({ closeModal }) => {
        return (
          <>
            <ModalHeader
              closeModal={() => {
                closeModal();
                setError('');
                setAlertError('');
              }}
              label={`Effective as of ${
                statement ? formatDateTimestamp(statement.effectiveDate) : ''
              }`}
              title="Privacy Statement"
            />

            <ModalBody>
              <div className={`${prefix}--bmrg-privacy-statement`}>
                {statement && statement.formContent && statement.formContent.sections.length > 0 && (
                  <Accordion>
                    {statement.formContent.sections.map((section) => {
                      return (
                        <AccordionItem title={section.title} key={section.title}>
                          <p
                            className={`${prefix}--bmrg-privacy-statement__content`}
                            dangerouslySetInnerHTML={{
                              __html: dompurify.sanitize(section.content),
                            }}
                          />
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                )}
                <p className={`${prefix}--bmrg-privacy-statement__message`}>
                  For any questions or concerns about business and personal information captured on
                  IBM Boomerang, please contact{' '}
                  <a href="mailto:boomrng@us.ibm.com?subject=Boomerang Privacy Statement">
                    boomrng@us.ibm.com
                  </a>
                  .
                </p>
                {alertError && (
                  <p className={`${prefix}--bmrg-privacy-statement__error`}>
                    Failed to recieve deletion request. Please try again.
                  </p>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <div className={`${prefix}--bmrg-privacy-statement-delete`}>
                <HeaderMenuModalWrapper
                  buttonTriggerText="Request account deletion"
                  triggerButtonKind="danger"
                >
                  {({ closeModal: closeAlertModal }) => {
                    return (
                      <>
                        <ModalHeader
                          closeModal={closeAlertModal}
                          // label="Delete Account"
                          title="Request account deletion"
                        />
                        <ModalBody>
                          <>
                            <CastleImg />
                            <p className={`${prefix}--bmrg-privacy-statement-delete__desc`}>
                              We will happily delete your account and all corresponding data from
                              our systems. Your account will cease to exist, and we will notify your
                              teams that you are no longer a member of Boomerang. This process can
                              take up to 1 month, which is in accordance with GDPR.
                            </p>
                          </>
                        </ModalBody>
                        <ModalFooter
                          style={{
                            marginTop: '1.125rem',
                            // display: 'flex',
                            // justifyContent: 'space-evenly',
                          }}
                        >
                          <Button kind="secondary" onClick={closeAlertModal}>
                            Cancel
                          </Button>
                          <Button
                            kind="primary"
                            type="submit"
                            onClick={() => {
                              handleSubmit({ closeAlertModal, closeModal });
                            }}
                          >
                            Delete my account
                          </Button>
                        </ModalFooter>
                      </>
                    );
                  }}
                </HeaderMenuModalWrapper>
              </div>
            </ModalFooter>
          </>
        );
      }}
    </HeaderMenuItem>
  );
}

export default PrivacyStatement;
