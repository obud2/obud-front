import React from 'react';

import { useQuery } from 'react-query';
import { getRootItem } from '@/service/RootService';

export const RootContext = React.createContext({ root: {} });

const RootProvider = ({ children }) => {
  const { data: root } = useQuery(['root'], () => getRootItem());

  return <RootContext.Provider value={root}>{children}</RootContext.Provider>;
};

export default RootProvider;
