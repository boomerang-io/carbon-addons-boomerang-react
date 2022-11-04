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
    // @ts-expect-error TS(2786): 'DelayedRender' cannot be used as a JSX component.
    <DelayedRender delay={delay}>
      <CarbonLoading {...rest} />
    </DelayedRender>
  );
}

export default Loading;
