/*
IBM Confidential
694970X, 69497O0
© Copyright IBM Corp. 2022, 2024
*/


import React, { useState, useEffect } from "react";

export type Props = {
  children: React.ReactNode;
  delay?: number;
};

function DelayedRender({ children, delay = 300 }: Props) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (shouldRender) {
    return <>{children}</>
  }

  return null;
}

export default DelayedRender;
