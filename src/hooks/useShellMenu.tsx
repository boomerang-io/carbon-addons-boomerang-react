import React from "react";

export default function useShellMenu<T extends HTMLElement>(
  elementId: string,
  stateManagement: { isActive?: boolean; setIsActive?: React.Dispatch<React.SetStateAction<boolean>> } = {}
) {
  const ref = React.useRef<T>(null);
  const [localIsActive, localSetIsActive] = React.useState(false);
  const { isActive = localIsActive, setIsActive = localSetIsActive } = stateManagement;

  const handleMousedownEvent = (event: MouseEvent) => {
    if (!ref.current?.contains(event.target as Node)) {
      setIsActive(false);
    }
    return;
  };

  const handleKeyDownEvent = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      if (ref.current?.contains(event.target as Node)) {
        document.getElementById(elementId)?.focus();
        setIsActive(false);
      }
    }
    return;
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleMousedownEvent);
    document.addEventListener("keydown", handleKeyDownEvent);

    return () => {
      document.removeEventListener("mousedown", handleMousedownEvent);
      document.removeEventListener("keydown", handleKeyDownEvent);
    };
  });

  return { isActive, setIsActive, ref };
}