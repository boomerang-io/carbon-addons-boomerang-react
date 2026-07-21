/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2025
*/

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { ComposedModal, Loading, ModalHeader, ModalBody } from "@carbon/react";
import { Information } from "@carbon/react/icons";
import HeaderMenuItem from "../Header/HeaderMenuItem";
import ErrorMessage from "../ErrorMessage";
import TooltipHover from "../TooltipHover";
import { resolver, serviceUrl } from "../../config/servicesConfig";
import { prefix } from "../../internal/settings";

const isValidVersion = (version?: string) =>
  Boolean(version) && !version!.toLowerCase().includes("cannot retrieve");

type Props = {
  baseServicesUrl: string;
  closeModal: () => void;
  isOpen: boolean;
  name: string;
};

function AboutPlatform({ baseServicesUrl, closeModal, isOpen = false, name }: Props) {
  const platformVersioUrl = serviceUrl.getPlatformVersion({ baseServicesUrl });
  const {
    data: platformVersionData,
    isLoading: isPlatformVersionLoading,
    isError: isPlatformVersionError,
  } = useQuery({
    queryKey: [platformVersioUrl],
    queryFn: resolver.query(platformVersioUrl, null),
    enabled: isOpen,
  });

  const currentYear = new Date().getFullYear();

  const components = [
    { label: "Advantage Core", value: platformVersionData?.version },
    { label: "Assistants", value: platformVersionData?.assistantVersion },
    { label: "Agents", value: platformVersionData?.agentsVersion },
    { label: "Scribeflow", value: platformVersionData?.scribeFlowVersion },
  ].filter((component) => isValidVersion(component.value));

  return (
    <ComposedModal
      open={isOpen}
      className={`${prefix}--bmrg-aboutPlatform-container ${prefix}--bmrg-header-modal ${prefix}--bmrg-aboutPlatform-modalheader`}
      onClose={closeModal}
    >
      <ModalHeader
        className={`${prefix}--bmrg-aboutPlatform-modaltitle`}
        title={`About ${name}`}
        closeModal={closeModal}
      />
      {isPlatformVersionLoading ? (
        <ModalBody style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Loading withOverlay={false} />
        </ModalBody>
      ) : isPlatformVersionError ? (
        <ModalBody style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ErrorMessage />
        </ModalBody>
      ) : platformVersionData ? (
        <ModalBody>
          <div>
            <div className={`${prefix}--bmrg-aboutPlatform-platform-version`}>
              <p
                className={`${prefix}--bmrg-aboutPlatform-platform-version-text`}
              >{`Version ${platformVersionData.platformVersion}`}</p>
              {platformVersionData.platformVersionError ? (
                <TooltipHover
                  direction="right"
                  tooltipText={`Failed to retrieve the versioning of one or more components. Displaying only the ${name} platform version.`}
                >
                  <Information size={16} fill="currentColor" />
                </TooltipHover>
              ) : null}
            </div>
            <h5 className={`${prefix}--bmrg-aboutPlatform-component-header`}>Components</h5>
            <ul>
              {components.map((component, index) => (
                <li
                  key={component.label}
                  className={`${prefix}--bmrg-aboutPlatform-li-${
                    index === components.length - 1 ? "between-last" : "between"
                  }`}
                >
                  <span className={`${prefix}--bmrg-aboutPlatform-li`}>{component.label}</span>
                  <span className={`${prefix}--bmrg-aboutPlatform-li-version`}>{component.value}</span>
                </li>
              ))}
            </ul>
            <h1 className={`${prefix}--bmrg-aboutPlatform-footer__header`}>Copyright IBM Corp. 2022, {currentYear}</h1>
          </div>
        </ModalBody>
      ) : null}
    </ComposedModal>
  );
}

export default AboutPlatform;

function AboutPlatformMenuItem(props: Omit<Props, "isOpen" | "closeModal">) {
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
        icon={<Information />}
        onClick={() => setIsOpen(!isOpen)}
        ref={menuItemRef}
        text={`About ${props.name}`}
        type="button"
      />
      <AboutPlatform isOpen={isOpen} closeModal={handleClose} {...props} />
    </>
  );
}

export { AboutPlatformMenuItem };
