import React from 'react';
import { SCustomLabel } from './CustomLabel.styled';

type Props = {
  label?: string;
  point?: boolean;
};

const CustomLabel = ({ label, point }: Props) => {
  return label ? (
    <SCustomLabel>
      {label}
      {point && <i className="custom-input-label-point" />}
    </SCustomLabel>
  ) : null;
};

export default CustomLabel;
