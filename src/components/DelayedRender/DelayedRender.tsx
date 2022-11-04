import React, { useState, useEffect } from "react";

DelayedRender.defaultProps = {
  delay: 300,
};

type OwnProps = {
  children: React.ReactNode;
  delay?: number;
};

type Props = OwnProps & typeof DelayedRender.defaultProps;

function DelayedRender({ children, delay }: Props) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (shouldRender) {
    return children;
  }

  return null;
}

export default DelayedRender;
