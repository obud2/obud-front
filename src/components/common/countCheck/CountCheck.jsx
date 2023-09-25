import React, { useEffect, useState } from 'react';

import { SCountCheck } from './CountCheck.styled';

const CountCheck = ({ conut }) => {
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    setTemp(conut);
  }, [conut]);

  return (
    <SCountCheck>
      <span>{temp || 0}</span>
    </SCountCheck>
  );
};

export default CountCheck;
