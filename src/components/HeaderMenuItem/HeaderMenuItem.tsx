import React from "react";
import { Button, HeaderMenuItem as CarbonHeaderMenuItem } from "@carbon/react";
import { Chat, Debug, Group, Idea, Information, Launch, Locked, Power, Workspace } from "@carbon/react/icons";

const iconMapping = {
  workspace: Workspace,
  group: Group,
  chat: Chat,
  debug: Debug,
  power: Power,
  information: Information,
  locked: Locked,
  launch: Launch,
  idea: Idea,
};

type Props = {
  altIconText?: string;
  className?: string;
  children: React.ReactNode;
  iconName?: "workspace" | "group" | "chat" | "debug" | "power" | "information" | "locked" | "launch" | "idea";
  style?: React.CSSProperties;
  disabled?: boolean;
  onClick: () => void;
};

const HeaderMenuItem = React.forwardRef(function HeaderMenuItem(
  { children, className = "", iconName = "launch", onClick, style, ...rest }: Props,
  ref
) {
  return (
    <CarbonHeaderMenuItem
      ref={ref}
      element={React.forwardRef((props, ref) => (
        <Button
          {...props}
          {...rest}
          ref={ref}
          renderIcon={iconMapping[iconName]}
          onClick={(e: React.ChangeEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onClick();
          }}
          style={{width: "100%"}}
        >
          {children}
        </Button>
      ))}
    />
  );
});

export default HeaderMenuItem;
