import React from 'react';

import { SCustomLabel } from './CustomLabel.styled';

const CustomLabel = ({ label, point }) => {
  return (
    label && (
      <SCustomLabel>
        {label}
        {point && <i className="custom-input-label-point" />}
      </SCustomLabel>
    )
  );
};

export default CustomLabel;
