import React from "react";

/**
 * Supports HeaderMenu components in the Header meeting usability and a11y guidelines
 * Manage state for click/touch, escape and tab events
 */
export default function useHeaderMenu<T extends HTMLElement>(focusableElementId: string) {
  const ref = React.useRef<T>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleActive = () => setIsOpen(!isOpen);

  React.useEffect(() => {
    // Close menu if click event originates outside the menu
    const handleMousedownEvent = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
      return;
    };

    // Close menu if ESC keydown event originates in the menu and transfer focus
    const handleKeyDownEvent = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (ref.current?.contains(event.target as Node)) {
          document.getElementById(focusableElementId)?.focus();
          setIsOpen(false);
        }
      }
      return;
    };

    // Close menu if focus transfer event originates in the node AND
    // transfers focus to a element OUTSIDE the menu
    const handleFocusOutEvent = (event: FocusEvent) => {
      if (event.relatedTarget && !ref.current?.contains(event.relatedTarget as Node)) {
        setIsOpen(false);
      }
      return;
    };

    const currentRef = ref.current;

    // We need to listen for event that are OUTSIDE the node
    document.addEventListener("mousedown", handleMousedownEvent);

    // We need to listen for event that are INSIDE the node
    currentRef?.addEventListener("keydown", handleKeyDownEvent);
    currentRef?.addEventListener("focusout", handleFocusOutEvent);

    return () => {
      document.removeEventListener("mousedown", handleMousedownEvent);
      currentRef?.removeEventListener("keydown", handleKeyDownEvent);
      currentRef?.removeEventListener("focusout", handleFocusOutEvent);
    };
  }, [focusableElementId]);

  return { isOpen, setIsOpen, toggleActive, ref };
}
