/// <reference types="vite/client" />

declare module "@carbon/react";
declare module "@carbon/react/icons";
declare module "dompurify";
declare module "history";
declare module "jest-axe";
declare module "lodash.get";
declare module "lodash.isequal";
declare module "lodash.sortby";
declare module "mock-socket";
declare module "react-autosuggest";
declare module "react-modal";
declare module "react-router-dom";

declare module "*.svg" {
  import { ReactElement, SVGProps } from "react";
  const content: (props: SVGProps<SVGElement>) => ReactElement;
  export default content;
}
