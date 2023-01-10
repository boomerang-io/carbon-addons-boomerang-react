import React from "react";
import { Accordion, AccordionItem, Button, ComposedModal, ModalHeader, ModalBody, ModalFooter } from "@carbon/react";
import { Locked } from "@carbon/react/icons";
import dompurify from "dompurify";
import ErrorMessage from "../ErrorMessage";
import HeaderMenuItem from "../Header/HeaderMenuItem";
import ToastNotification from "../Notifications/ToastNotification";
import Loading from "../Loading";
import notify from "../Notifications/notify";
import { useQuery, useMutation } from "react-query";
import { serviceUrl, resolver } from "../../config/servicesConfig";
import { prefix } from "../../internal/settings";

function formatDateTimestamp(timestamp: string) {
  return new Date(timestamp).toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

type Props = {
  baseServicesUrl: string;
  closeModal: () => void;
  isOpen: boolean;
  organization?: string;
  platformEmail?: string;
};

function PrivacyStatement({
  baseServicesUrl,
  closeModal,
  isOpen,
  organization = "the platform",
  platformEmail = "isesupp@us.ibm.com",
}: Props) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = React.useState(false);
  const statementUrl = serviceUrl.getStatement({ baseServicesUrl });
  const statementQuery = useQuery({
    queryKey: statementUrl,
    queryFn: resolver.query(statementUrl),
  });

  const { mutateAsync, error: mutateUserConsentError } = useMutation(resolver.putUserConsent);

  async function handleSubmit({
    closeAlertModal,
    closeModal,
  }: {
    closeAlertModal: () => void;
    closeModal: () => void;
  }) {
    const body = {
      hasConsented: false,
      version: statementQuery.data.version,
    };

    try {
      await mutateAsync({ baseServicesUrl, body });
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
      <ComposedModal aria-label="Privacy Statement" open={isOpen} className={`${prefix}--bmrg-privacy-statement-container ${prefix}--bmrg-header-modal`} onClose={closeModal}>
        <ModalHeader
          closeModal={closeModal}
          label={`Effective as of ${statementQuery.data ? formatDateTimestamp(statementQuery.data.effectiveDate) : ""}`}
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
                    <a href={`mailto:${platformEmail}?subject=${organization} Privacy Statement`}>{platformEmail}</a>.
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
            <Button data-modal-primary-focus kind="danger" onClick={() => setIsConfirmModalOpen(true)}>
              Request account deletion
            </Button>
            <ComposedModal open={isConfirmModalOpen}>
              <ModalHeader
                closeModal={() => setIsConfirmModalOpen(false)}
                label="Delete Account"
                title="Request account deletion"
              />
              <ModalBody>
                <p className={`${prefix}--bmrg-privacy-statement-delete__desc`}>
                  By selecting to delete your account, your account will be deleted along with all of your user data
                  from our system and we will notify your team(s) that you are no longer a memeber of the platform. Are
                  you sure you want to delete your account?
                </p>
              </ModalBody>
              <ModalFooter style={{ marginTop: "1.125rem" }}>
                <Button data-modal-primary-focus kind="secondary" onClick={() => setIsConfirmModalOpen(false)}>
                  No, go back to Privacy Statement
                </Button>
                <Button
                  kind="danger"
                  type="submit"
                  onClick={() => {
                    handleSubmit({ closeAlertModal: () => setIsConfirmModalOpen(false), closeModal });
                  }}
                >
                  Yes, delete my account
                </Button>
              </ModalFooter>
            </ComposedModal>
          </div>
        </ModalFooter>
      </ComposedModal>
  );
}

function PrivacyStatementMenuItem(props: Omit<Props, "isOpen" | "closeModal">) {
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
        icon={<Locked />}
        onClick={() => setIsOpen(!isOpen)}
        ref={menuItemRef}
        text="Privacy Statement"
        type="button"
      />
      <PrivacyStatement isOpen={isOpen} closeModal={handleClose} {...props} />
    </>
  );
}

export default PrivacyStatement;

export { PrivacyStatementMenuItem };
