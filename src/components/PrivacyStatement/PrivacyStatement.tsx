import React from "react";
import { useQuery, useMutation } from "react-query";
import dompurify from "dompurify";
import { Accordion, AccordionItem, Button, ModalHeader, ModalBody, ModalFooter } from "@carbon/react";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import { prefix } from "../../internal/settings";
import HeaderMenuModalWrapper from "../../internal/HeaderMenuModalWrapper";
import { serviceUrl, resolver } from "../../config/servicesConfig";
import HeaderMenuItem from "../HeaderMenuItem";
import notify from "../Notifications/notify";
import ToastNotification from "../Notifications/ToastNotification";

/**
 * Helper to format date timestamp
 * @param {string} timestamp
 * @returns formatted date string
 */
function formatDateTimestamp(timestamp: any) {
  return new Date(timestamp).toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

PrivacyStatement.defaultProps = {
  organization: "the platform",
  platformEmail: "isesupp@us.ibm.com",
};

type OwnProps = {
  baseServiceUrl: string;
  organization?: string;
  platformEmail?: string;
};

type Props = OwnProps & typeof PrivacyStatement.defaultProps;

function PrivacyStatement({ baseServiceUrl, organization, platformEmail }: Props) {
  const statementUrl = serviceUrl.getStatement({ baseServiceUrl });
  const statementQuery = useQuery({
    queryKey: statementUrl,
    queryFn: resolver.query(statementUrl),
  });

  const { mutateAsync, error: mutateUserConsentError } = useMutation(resolver.putUserConsent);

  async function handleSubmit({ closeAlertModal, closeModal }: any) {
    const body = {
      hasConsented: false,
      version: statementQuery.data.version,
    };

    try {
      await mutateAsync({ baseServiceUrl, body });
      notify(
        <ToastNotification subtitle="Successfully requested account deletion" title="Delete Account" kind="success" />,
        { containerId: `${prefix}--bmrg-header-notifications` }
      );
      closeAlertModal();
      closeModal();
      if (window.location) {
        window.location.reload();
      }
    } catch (e) {
      closeAlertModal();
    }
  }

  return (
    <HeaderMenuItem
      aria-label="Privacy Statement"
      className={`${prefix}--bmrg-privacy-statement-container`}
      iconName="locked"
      text="Privacy Statement"
    >
      {({ closeModal }: any) => {
        return (
          <>
            <ModalHeader
              closeModal={closeModal}
              label={`Effective as of ${
                statementQuery.data ? formatDateTimestamp(statementQuery.data.effectiveDate) : ""
              }`}
              title="Privacy Statement"
            />

            <ModalBody>
              <div className={`${prefix}--bmrg-privacy-statement`}>
                {statementQuery.isLoading ? (
                  <Loading />
                ) : statementQuery.error ? (
                  <ErrorMessage style={{ color: "#F2F4F8" }} />
                ) : (
                  statementQuery.data?.formContent?.sections?.length > 0 && (
                    <>
                      <Accordion>
                        {statementQuery.data.formContent.sections.map((section: any) => {
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
                      <p className={`${prefix}--bmrg-privacy-statement__message`}>
                        {`For any questions or concerns about business and personal information captured on
                  ${organization}, please contact${" "}`}
                        <a href={`mailto:${platformEmail}?subject=${organization} Privacy Statement`}>
                          {platformEmail}
                        </a>
                        .
                      </p>
                    </>
                  )
                )}

                {mutateUserConsentError && (
                  <p className={`${prefix}--bmrg-privacy-statement__error`}>
                    Failed to receive deletion request. Please try again.
                  </p>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <div className={`${prefix}--bmrg-privacy-statement-delete`}>
                <HeaderMenuModalWrapper buttonTriggerText="Request account deletion" triggerButtonKind="danger">
                  {({ closeModal: closeAlertModal }: any) => {
                    return (
                      <>
                        <ModalHeader
                          closeModal={closeAlertModal}
                          label="Delete Account"
                          title="Request account deletion"
                        />
                        <ModalBody>
                          <p className={`${prefix}--bmrg-privacy-statement-delete__desc`}>
                            By selecting to delete your account, your account will be deleted along with all of your
                            user data from our system and we will notify your team(s) that you are no longer a memeber
                            of the platform. Are you sure you want to delete your account?
                          </p>
                        </ModalBody>
                        <ModalFooter style={{ marginTop: "1.125rem" }}>
                          <Button kind="secondary" onClick={closeAlertModal}>
                            No, go back to Privacy Statement
                          </Button>
                          <Button
                            kind="danger"
                            type="submit"
                            onClick={() => {
                              handleSubmit({ closeAlertModal, closeModal });
                            }}
                          >
                            Yes, Delete my account
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
