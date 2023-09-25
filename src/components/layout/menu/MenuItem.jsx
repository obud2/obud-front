import React from 'react';

import Link from 'next/link';
import useDrawer from 'src/store/useDrawer';

import { SMenuItem } from './MenuItem.styled';

const MenuItem = ({ title, href }) => {
  const { onClickCloseDrawer } = useDrawer((state) => ({
    onClickCloseDrawer: state.onClickCloseDrawer,
  }));

  const onClickMenu = () => {
    onClickCloseDrawer();

    return true;
  };

  return (
    <SMenuItem>
      <Link href={href}>
        <a onClick={onClickMenu}>
          <p>{title}</p>
        </a>
      </Link>
    </SMenuItem>
  );
};

export default MenuItem;
