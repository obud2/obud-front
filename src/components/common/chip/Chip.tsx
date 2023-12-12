import React, { HTMLAttributes } from 'react';
import { SChip } from './Chip.styled';

type Props = HTMLAttributes<HTMLDivElement> & {
  label: string;
};

const Chip = ({ label, ...defaultProps }: Props) => {
  return <SChip {...defaultProps}>{label}</SChip>;
};

export default Chip;
