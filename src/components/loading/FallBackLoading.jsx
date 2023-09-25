import React from 'react';

import { SFallBackLoading } from './FallBackLoading.styled';

const FallBackLoading = ({ isLoading }) => {
  return (
    <SFallBackLoading isLoading={isLoading}>
      <i className="icons svg-loading fallback" />
    </SFallBackLoading>
  );
};

export default FallBackLoading;
