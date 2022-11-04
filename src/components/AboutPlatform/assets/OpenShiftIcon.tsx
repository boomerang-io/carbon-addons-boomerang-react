import * as React from "react";
import { SVGProps } from "react";

function OpenShiftIcon(props: SVGProps<SVGElement>) {
  return (
    // @ts-expect-error TS(2322): Type '{ children: Element[]; className?: string | ... Remove this comment to see the full error message
    <svg id="prefix__icon" viewBox="0 0 100 100" {...props}>
      <defs>
        <style>{".prefix__cls-3{fill:#fff}.prefix__cls-4{fill:#c3c3c3}.prefix__cls-5{fill:#d5d5d5}"}</style>
      </defs>
      <title>{"Red Hat OpenShift"}</title>
      <desc>Red Hat OpenShift icon</desc>
      <circle cx={50} cy={50} r={50} fill="#d71e00" />
      <path d="M85.36 14.64a50 50 0 01-70.72 70.72z" fill="#c21a00" />
      <path
        className="prefix__cls-3"
        d="M58.79 32.55a19.22 19.22 0 015.62 4l10.42-3.79a29.77 29.77 0 00-53.92 19.63l10.42-3.79a19.29 19.29 0 0127.46-16.05M26.72 55.51l-9.89 3.61a30.05 30.05 0 004.65 10.08l10.39-3.78a19.54 19.54 0 01-5.15-9.91M72.46 38.87l-9.9 3.6A19.39 19.39 0 0165 53.37l10.4-3.78a30.22 30.22 0 00-2.92-10.72"
      />
      <path className="prefix__cls-4" d="M35.63 49.11a16.24 16.24 0 010-2.09l-10.38 3.79c.05.67.14 1.33.24 2z" />
      <path
        className="prefix__cls-5"
        d="M35.62 48.2c0-.4 0-.79.05-1.18-.03.39-.05.78-.05 1.18zM35.62 48.62v.49L25.49 52.8c-.1-.66-.19-1.32-.24-2a30.5 30.5 0 00.82 4.94l9.9-3.6a19.83 19.83 0 01-.35-3.52z"
      />
      <path className="prefix__cls-4" d="M80.19 32.76c-.32-.53-.66-1.06-1-1.57L68.75 35A17.85 17.85 0 0170 36.46z" />
      <path
        className="prefix__cls-5"
        d="M80.18 32.76L70 36.46a21 21 0 011.78 2.64l9.89-3.6a29.32 29.32 0 00-1.49-2.74zM68.75 35l10.41-3.79L68.75 35zM26.39 67.42A29.9 29.9 0 0029 70.63l11.32-4.12a19.33 19.33 0 01-3.57-2.88zm53.9-19.62l-10.4 3.78a19 19 0 01-.89 4.48l11.32-4.13a30 30 0 000-4.13"
      />
      <path
        className="prefix__cls-3"
        d="M69 56.06c.1-.29.18-.58.26-.87a19 19 0 01-1.13 3.08 19.36 19.36 0 01-25.72 9.36 18.43 18.43 0 01-2.3-1.3l.24.18-11.3 4.12a29.49 29.49 0 009 6.47 29.84 29.84 0 0039.6-14.42 29.49 29.49 0 002.71-10.75zM27.61 69c-.42-.51-.83-1-1.22-1.58.39.58.8 1.07 1.22 1.58zM80.29 47.8c0 .67.08 1.33.09 2-.01-.67-.04-1.34-.09-2zM29 70.52c-.36-.37-.7-.76-1-1.16.25.4.59.79 1 1.16zM69.38 54.77zM80.33 51.83v-1.65c.04.55.03 1.1 0 1.65zM38.73 65.35l-.41-.35zM69.72 53.06a18.675 18.675 0 010 0z"
      />
    </svg>
  );
}

export default OpenShiftIcon;
