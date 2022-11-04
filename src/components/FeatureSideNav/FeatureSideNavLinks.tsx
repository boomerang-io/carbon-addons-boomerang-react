import React from "react";
import cx from "classnames";
import { ButtonSkeleton } from "@carbon/react";
import { prefix } from "../../internal/settings";

const LoadingSkeleton = () => {
  return (
    <div className={`${prefix}--bmrg-feature-sidenav-links-skeleton`}>
      <ButtonSkeleton style={{ width: "90%" }} small />
      <ButtonSkeleton style={{ width: "90%" }} small />
      <ButtonSkeleton style={{ width: "90%" }} small />
    </div>
  );
};

type FeatureSideNavLinksProps = {
  children?: any;
  className?: string;
};

export function FeatureSideNavLinks(props: FeatureSideNavLinksProps) {
  // @ts-expect-error TS(2339): Property 'isLoading' does not exist on type 'Featu... Remove this comment to see the full error message
  const { children, className, isLoading, ...rest } = props;
  return (
    <section className={cx(`${prefix}--bmrg-feature-sidenav-links`, className)} {...rest}>
      {isLoading ? <LoadingSkeleton /> : children}
    </section>
  );
}

export default FeatureSideNavLinks;
