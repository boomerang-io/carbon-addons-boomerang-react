import * as React from "react";
import { SVGProps } from "react";

function SpringIcon(props: SVGProps<SVGElement>) {
  return (
    // @ts-expect-error TS(2322): Type '{ children: Element[]; className?: string | ... Remove this comment to see the full error message
    <svg
      width={66}
      height={66}
      viewBox="0 0 66 66"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Spring</title>
      <desc>Spring icon</desc>
      <path
        d="M58.533 3.667a29.546 29.546 0 0 1-3.42 6.07 32.07 32.07 0 0 0-31.253-8.24 32.111 32.111 0 0 0-22.567 23.16 32.149 32.149 0 0 0 9.004 31.07l1.186 1.049a32.053 32.053 0 0 0 33.155 5.023 32.112 32.112 0 0 0 19.514-27.3c.875-8.179-1.524-18.527-5.62-30.833zm-43.67 52.246A2.742 2.742 0 0 1 10 54.472a2.747 2.747 0 0 1 1.421-2.7 2.741 2.741 0 0 1 3.036.28 2.748 2.748 0 0 1 .404 3.861zM58.4 46.295c-7.919 10.56-24.83 6.998-35.672 7.509 0 0-1.921.113-3.856.431 0 0 .729-.312 1.663-.663 7.614-2.654 11.212-3.165 15.838-5.546C45.08 43.595 53.695 33.89 55.484 23.8c-3.313 9.705-13.373 18.05-22.53 21.44-6.276 2.315-17.614 4.57-17.614 4.57l-.458-.245C7.17 45.81 6.93 29.087 20.96 23.694c6.143-2.369 12.02-1.069 18.654-2.654 7.084-1.685 15.282-6.998 18.615-13.93 3.73 11.09 8.223 28.451.165 39.191z"
        fill="#68bd45"
        strokeWidth={0.663}
      />
    </svg>
  );
}

export default SpringIcon;
