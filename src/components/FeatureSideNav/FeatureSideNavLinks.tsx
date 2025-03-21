/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";
import { ButtonSkeleton } from "@carbon/react";
import cx from "classnames";
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
