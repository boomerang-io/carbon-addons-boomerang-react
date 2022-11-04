/// <reference types="vite/client" />

declare module "@carbon/react";
declare module "@carbon/react/icons";
declare module "*.svg" {
  import { ReactElement, SVGProps } from "react";
  const content: (props: SVGProps<SVGElement>) => ReactElement;
  export default content;
}
