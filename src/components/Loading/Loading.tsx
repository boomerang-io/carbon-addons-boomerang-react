/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2026
*/


import React from "react";
import { Loading as CarbonLoading } from "@carbon/react";
import DelayedRender from "../DelayedRender";

interface LoadingProps {
  /** Time to delay in milliseconds before rendering the component */
  delay?: number;
  [k: string]: any;
}

function Loading({ delay, ...rest }: LoadingProps) {
  return (
    <DelayedRender delay={delay}>
      <CarbonLoading {...rest} />
    </DelayedRender>
  );
}

export default Loading;
