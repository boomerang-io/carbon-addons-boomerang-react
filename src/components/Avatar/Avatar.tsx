/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React, { useState } from "react";
import { prefix } from "../../internal/settings";

type Props = React.ComponentPropsWithoutRef<"img"> & {
  className?: string;
  size?: "small" | "medium" | "large";
  src: string;
  style?: React.CSSProperties;
  userName?: string;
  plainTooltip?: boolean;
};

const UserIcon = (
  props: React.SVGProps<SVGSVGElement> & { description?: string; userName?: string; plainTooltip?: boolean }
) => {
  const { description, userName, plainTooltip, ...rest } = props;
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="16px"
      height="16px"
      viewBox="0 0 16 16"
      role="img"
      {...rest}
    >
      <title>{plainTooltip || !userName ? "Profile Image" : `User icon for ${userName}`}</title>
      {description && <desc>{description}</desc>}
      <g>
        <path
          fill="currentColor"
          d="M4,13.7C5.1,14.5,6.5,15,8,15s2.9-0.5,4-1.3v-1.2c0-0.8-0.7-1.5-1.5-1.5h-5C4.7,11,4,11.7,4,12.5V13.7
		z M3,12.9v-0.4C3,11.1,4.1,10,5.5,10h5c1.4,0,2.5,1.1,2.5,2.5v0.4c1.2-1.3,2-3,2-4.9c0-3.9-3.1-7-7-7S1,4.1,1,8
		C1,9.9,1.8,11.6,3,12.9z M8,16c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8S12.4,16,8,16z"
        />
        <path
          fill="currentColor"
          d="M8,8c1.1,0,2-0.9,2-2S9.1,4,8,4S6,4.9,6,6S6.9,8,8,8z M8,9C6.3,9,5,7.7,5,6s1.3-3,3-3s3,1.3,3,3S9.7,9,8,9z"
        />
      </g>
    </svg>
  );
};

function Avatar({
  alt,
  className = `${prefix}--bmrg-avatar`,
  size = "medium",
  src,
  style,
  title,
  userName,
  plainTooltip = false,
  ...rest
}: Props) {
  const [error, setError] = useState(false);

  const altText = plainTooltip || !userName ? "Profile Image" : `Avatar for ${userName}`;

  return error || !src ? (
    <UserIcon
      userName={userName}
      plainTooltip={plainTooltip}
      className={`${className} --${size || ""}`}
      description={altText}
      style={style}
    />
  ) : (
    <img
      alt={alt ?? altText}
      className={`${className} --${size || ""}`}
      src={src}
      style={style}
      title={title ?? altText}
      onError={() => setError(true)}
      {...rest}
    />
  );
}

export default Avatar;
