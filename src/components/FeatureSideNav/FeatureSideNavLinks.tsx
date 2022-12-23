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
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
};

export function FeatureSideNavLinks(props: FeatureSideNavLinksProps) {
  const { children, className, isLoading, ...rest } = props;
  return (
    <section className={cx(`${prefix}--bmrg-feature-sidenav-links`, className)} {...rest}>
      {isLoading ? <LoadingSkeleton /> : children}
    </section>
  );
}

export default FeatureSideNavLinks;
