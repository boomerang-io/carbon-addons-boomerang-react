import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import dompurify from 'dompurify';
import { Accordion, AccordionItem, Button } from 'carbon-components-react';
import { ModalHeader, ModalBody, ModalFooter } from 'carbon-components-react';
import { settings } from 'carbon-components';
import window from 'window-or-global';

import HeaderMenuModalWrapper from '../../internal/HeaderMenuModalWrapper';
import HeaderMenuItem from '../HeaderMenuItem';
import notify from '../Notifications/notify';
import ToastNotification from '../Notifications/ToastNotification';

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
  platformName: PropTypes.string,
  platformEmail: PropTypes.string,
};

PrivacyStatement.defaultProps = {
  platformName: 'the platform',
  platformEmail: 'isesupp@us.ibm.com',
};

function PrivacyStatement({ baseServiceUrl, platformName, platformEmail }) {
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
              label={`Effective as of ${statement ? formatDateTimestamp(statement.effectiveDate) : ''
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
                  {`For any questions or concerns about business and personal information captured on
                  ${platformName}, please contact${' '}`}
                  <a href={`mailto:${platformEmail}?subject=${platformName} Privacy Statement`}>
                    {platformEmail}
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
                            <p className={`${prefix}--bmrg-privacy-statement-delete__desc`}>
                              By selecting to delete your account, your account will be deleted along with all of your user data from our system and we will notify your team(s) that you are no longer a memeber of the platform. Are you sure you want to delete your account?
                            </p>
                          </>
                        </ModalBody>
                        <ModalFooter style={{ marginTop: '1.125rem' }}>
                          <Button
                            kind="danger"
                            type="submit"
                            onClick={() => {
                              handleSubmit({ closeAlertModal, closeModal });
                            }}
                          >
                            Yes, Delete my account
                          </Button>
                          <Button kind="secondary" onClick={closeAlertModal}>
                            No, go back to Privacy Statement
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
