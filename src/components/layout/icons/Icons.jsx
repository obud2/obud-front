import React from 'react';

import { SIcons } from './Icons.styled';

import CartButton from '../cart/CartButton';

const Icons = ({ reverse }) => {
  return (
    <SIcons>
      {/* TODO : 알람 */}

      <CartButton reverse={reverse} />
    </SIcons>
  );
};

export default Icons;
