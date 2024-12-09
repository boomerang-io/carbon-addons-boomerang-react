import React from "react";
import { Button, ComposedModal, ModalHeader, ModalBody, ModalFooter, Checkbox} from "@carbon/react";
import { HelpDesk } from "@carbon/react/icons";
import HeaderMenuItem from "../Header/HeaderMenuItem";
import { useMutation ,useQueryClient } from "react-query";
import { resolver, serviceUrl } from "../../config/servicesConfig";
import { prefix } from "../../internal/settings";

type Props = {
    closeModal: () => void;
    supportRedirect: () => void;
    isOpen: boolean;
    platformName?: string;
    platformOrganization?: string;
    supportLink?: string;
    baseServicesUrl: string;
};


function SupportCenter({closeModal, isOpen, supportRedirect ,baseServicesUrl}: Props) {
    const [doNotAskAgain, setDoNotAskAgain] = React.useState(false);
    const queryClient = useQueryClient();
    const profileUrl = serviceUrl.resourceUserProfile({ baseServicesUrl });

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const shouldNotAskAgain = event.target.checked;
        setDoNotAskAgain(shouldNotAskAgain);
        handleSubmit(!shouldNotAskAgain);
    };
    const {mutateAsync: mutateUserProfile,} = useMutation(resolver.patchUserProfile, {
        onSuccess: () => {
          queryClient.invalidateQueries(profileUrl);
        },
      });

      async function handleSubmit(showSupport: boolean) {
        const body = {
            showSupport
        };
    
        try {
          await mutateUserProfile({ baseServicesUrl, body });
        } catch (e) {
          // noop
        }
      }

    return (
        <ComposedModal
            aria-label="Feedback"
            open={isOpen}
            className={`${prefix}--bmrg-feedback-container ${prefix}--bmrg-header-modal`}
            onClose={closeModal}
            onKeyDown={(e: any) => e.stopPropagation()}
        >
            <ModalHeader title="IBM Support Overview" closeModal={closeModal} />
            <ModalBody>
                <div className={`${prefix}--bmrg-feedback`}>
                    <p>
                        Review your open cases or open a new case at IBM Support For support tickets related to IBM Consulting Advantage, use Product "Consulting Advantage".
                    </p>
                    <Checkbox
                        id="supportCheckboxId"
                        labelText="Don't show again. Always proceed to IBM Support Center."
                        invalidText="Error message goes here"
                        onChange={handleCheckboxChange}
                        checked={doNotAskAgain}
                        warnText="Warning message goes here"
                    />
                </div>
            </ModalBody>
            <ModalFooter>
                <Button data-modal-secondary-focus kind="secondary" onClick={closeModal}>
                    Cancel
                </Button>
                <Button data-modal-primary-focus kind="primary" onClick={supportRedirect}>
                    Continue to IBM Support
                </Button>
            </ModalFooter>
        </ComposedModal>
    );
}

function SupportCenterMenuItem(props: Omit<Props, "isOpen" | "closeModal" | "supportRedirect">) {
    const menuItemRef = React.useRef<HTMLLinkElement>(null);
    const [isOpen, setIsOpen] = React.useState(false);




    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => {
            menuItemRef.current?.focus();
        }, 0);
    };
    const supportHandle = () => {
        window.open(props?.supportLink, '_blank', 'noopener,noreferrer');
        handleClose();
    };

    return (
        <>
            <HeaderMenuItem
                icon={<HelpDesk />}
                onClick={() => setIsOpen(!isOpen)}
                ref={menuItemRef}
                text="Support Center"
                type="button"
            />
            <SupportCenter isOpen={isOpen} closeModal={handleClose} supportRedirect={supportHandle}  {...props} />
        </>
    );
}

export { SupportCenterMenuItem };

export default SupportCenter;