import React from 'react';

import { SBaseTitle } from './BaseTitle.styled';

const BaseTitle = ({ title, basic }) => {
  return (
    <SBaseTitle basic={basic}>
      <p className="base-title text-delay-animation">{title}</p>
      <div className="title-line" />
    </SBaseTitle>
  );
};

export default BaseTitle;
