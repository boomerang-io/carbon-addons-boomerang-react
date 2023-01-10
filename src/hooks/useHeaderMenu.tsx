import React from "react";

/**
 * Supports HeaderMenu components in the Header meeting usability and a11y guidelines
 * Manage state for click/touch, escape and tab events
 */
export default function useHeaderMenu<T extends HTMLElement>(
  focusableElementId: string,
  stateManagement: { isActive?: boolean; setIsActive?: React.Dispatch<React.SetStateAction<boolean>> } = {}
) {
  const ref = React.useRef<T>(null);
  const [internalIsActive, internalSetIsActive] = React.useState(false);

  // Enable external and internal state management, default to internal if external values are not provided
  const { isActive = internalIsActive, setIsActive = internalSetIsActive } = stateManagement;

  const toggleActive = () => setIsActive(!isActive);

  // Close menu if click event originates outside the menu
  const handleMousedownEvent = React.useCallback(
    (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setIsActive(false);
      }
      return;
    },
    [setIsActive]
  );

  // Close menu if ESC keydown event originates in the menu and transfer focus
  const handleKeyDownEvent = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (ref.current?.contains(event.target as Node)) {
          document.getElementById(focusableElementId)?.focus();
          setIsActive(false);
        }
      }
      return;
    },
    [setIsActive, focusableElementId]
  );

  // Close menu if focus transfer event originates in the node AND
  // transfers focus to a element OUTSIDE the menu
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
      // We need to listen for event that are OUTSIDE the node
      document.addEventListener("mousedown", handleMousedownEvent);

      // We need to listen for event that are INSIDE the node
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