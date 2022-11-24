import * as React from "react";
import { SVGProps } from "react";

function NATSIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 63 65"
      fill="#fff"
      fillRule="evenodd"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>NATS</title>
      <desc>NATS icon</desc>
      <use href="#A" x=".5" y=".5" />
      <symbol id="A" overflow="visible">
        <g stroke="none" fillRule="nonzero">
          <path
            d="M0 50h26.374l15.125 14V50h20.187V0H0zm9.937-38.312H21.5l22.25 20.75v-20.75h7.375V38.5H39.938L17.314 17.375V38.5H9.939z"
            fill="#8dc63f"
          />
          <path d="M17.314 17.375L39.938 38.5h11.186V11.687H43.75v20.75L21.5 11.687H9.938V38.5h7.375z" />
          <path d="M0 0h61.687v50H0z" fill="#27aae1" />
          <path d="M30.844 0h30.844v25H30.844z" fill="#34a574" />
          <path d="M30.844 25h30.844v25H30.844z" fill="#8dc63f" />
          <path d="M0 0h30.844v25H0z" fill="#27aae1" />
          <g fill="#375c93">
            <path d="M0 25h30.844v25H0z" />
            <path d="M30.844 50l.154 4.303L26.374 50z" />
          </g>
          <path d="M15.211 15.83l26.758 24.984h13.23V9.102h-8.722v24.54L20.164 9.102H6.488v31.7h8.722z" />
        </g>
      </symbol>
    </svg>
  );
}

export default NATSIcon;
