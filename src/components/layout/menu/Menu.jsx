import React from 'react';

import { MENU } from './Menu.option';
import { SMenu } from './Menu.styled';

import MenuItem from './MenuItem';

const Menu = ({ reverse }) => {
  return (
    <SMenu reverse={reverse}>
      {MENU?.map((m) => (
        <MenuItem key={m?.id} title={m?.label} href={m?.link} />
      ))}
    </SMenu>
  );
};

export default Menu;
