import React, { useEffect, useState } from 'react';

import { SCountCheck } from './CountCheck.styled';

const CountCheck = ({ count }) => {
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    setTemp(count);
  }, [count]);

  return (
    <SCountCheck>
      <span>{temp || 0}</span>
    </SCountCheck>
  );
};

export default CountCheck;
