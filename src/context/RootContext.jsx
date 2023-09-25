import React from 'react';

import { useQuery } from 'react-query';
import RootService from 'src/service/RootService';

export const RootContext = React.createContext({ root: {} });

const RootProvider = ({ children }) => {
  const { data: root } = useQuery(['root'], () => RootService.getRootItem());

  return <RootContext.Provider value={root}>{children}</RootContext.Provider>;
};

export default RootProvider;
