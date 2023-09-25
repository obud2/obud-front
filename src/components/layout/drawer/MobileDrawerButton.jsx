import React from 'react';

import { SMobileDrawerButton } from './MobileDrawerButton.styled';
import useDrawer from 'src/store/useDrawer';

const MobileDrawerButton = ({ reverse }) => {
  const { onClickOpenDrawer } = useDrawer((state) => ({
    onClickOpenDrawer: state.onClickOpenDrawer,
  }));

  return (
    <SMobileDrawerButton onClick={onClickOpenDrawer}>
      <i className={`icons menu ${reverse ? '' : 'active'}`} />
    </SMobileDrawerButton>
  );
};

export default MobileDrawerButton;
