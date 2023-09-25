import React, { useState, useEffect, useMemo } from 'react';

import { MOBILE_SIZE } from '../styled/variablesStyles';

export const LayoutContext = React.createContext({
  matchese: typeof window === 'object' ? window.matchMedia(`(max-width:${MOBILE_SIZE}px)`).matches : null,
});

const LayoutContextProvider = ({ children }) => {
  const [matchese, setMatches] = useState(false);

  useEffect(() => {
    resizePage();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', resizePage);

    return () => window.addEventListener('resize', resizePage);
  }, []);

  const resizePage = () => {
    if (typeof window !== undefined) {
      setMatches(window.matchMedia(`(max-width:${MOBILE_SIZE}px)`).matches);
    }
  };

  const match = useMemo(
    () => ({
      matchese,
    }),
    [matchese],
  );

  return <LayoutContext.Provider value={match}>{children}</LayoutContext.Provider>;
};

export default LayoutContextProvider;
