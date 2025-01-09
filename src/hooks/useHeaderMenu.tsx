/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React from "react";

/**
 * Supports HeaderMenu components in the Header meeting usability and a11y guidelines
 * Manage state for click/touch, escape and tab events
 */
export default function useHeaderMenu<T extends HTMLElement>(focusableElementId: string) {
  const ref = React.useRef<T>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleActive = () => setIsOpen(!isOpen);

  // Close menu if click event originates outside the menu
  const handleMousedownEvent = React.useCallback((event: MouseEvent) => {
    if (!ref.current?.contains(event.target as Node)) {
      setIsOpen(false);
    }
    return;
  }, []);

  // Close menu if ESC keydown event originates in the menu and transfer focus
  const handleKeyDownEvent = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (ref.current?.contains(event.target as Node)) {
          document.getElementById(focusableElementId)?.focus();
          setIsOpen(false);
        }
      }
      return;
    },
    [focusableElementId]
  );

  // Close menu if focus transfer event originates in the node AND
  // transfers focus to a element OUTSIDE the menu
  const handleFocusOutEvent = React.useCallback((event: FocusEvent) => {
    if (event.relatedTarget && !ref.current?.contains(event.relatedTarget as Node)) {
      setIsOpen(false);
    }
    return;
  }, []);

  React.useEffect(() => {
    document.addEventListener("mousedown", handleMousedownEvent);
    document.addEventListener("keydown", handleKeyDownEvent);
    document.addEventListener("focusout", handleFocusOutEvent);

    return () => {
      document.removeEventListener("mousedown", handleMousedownEvent);
      document.removeEventListener("keydown", handleKeyDownEvent);
      document.removeEventListener("focusout", handleFocusOutEvent);
    };
  }, [handleMousedownEvent, handleKeyDownEvent, handleFocusOutEvent]);

  return { isOpen, setIsOpen, toggleActive, ref };
}
