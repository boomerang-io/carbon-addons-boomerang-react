import React from "react";

export default function useShellMenu<T extends HTMLElement>(
  elementId: string,
  stateManagement: { isActive?: boolean; setIsActive?: React.Dispatch<React.SetStateAction<boolean>> } = {}
) {
  const ref = React.useRef<T>(null);
  const [localIsActive, localSetIsActive] = React.useState(false);
  const { isActive = localIsActive, setIsActive = localSetIsActive } = stateManagement;

  const toggleActive = () => setIsActive(!isActive);

  const handleMousedownEvent = React.useCallback(
    (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setIsActive(false);
      }
      return;
    },
    [setIsActive]
  );

  const handleKeyDownEvent = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (ref.current?.contains(event.target as Node)) {
          document.getElementById(elementId)?.focus();
          setIsActive(false);
        }
      }
      return;
    },
    [setIsActive, elementId]
  );

  const handleFocusOutEvent = React.useCallback(
    (event: FocusEvent) => {
      if (event.relatedTarget && !ref.current?.contains(event.relatedTarget as Node)) {
        setIsActive(false);
      }
      return;
    },
    [setIsActive]
  );

  React.useEffect(() => {
    const currentRef = ref.current;
    if (currentRef) {
      document.addEventListener("mousedown", handleMousedownEvent);
      currentRef.addEventListener("keydown", handleKeyDownEvent);
      currentRef.addEventListener("focusout", handleFocusOutEvent);
    }
    return () => {
      document.removeEventListener("mousedown", handleMousedownEvent);
      if (currentRef) {
        currentRef.removeEventListener("keydown", handleKeyDownEvent);
        currentRef.removeEventListener("focusout", handleFocusOutEvent);
      }
    };
  }, [handleFocusOutEvent, handleKeyDownEvent, handleMousedownEvent]);

  return { isActive, setIsActive, toggleActive, ref };
}
