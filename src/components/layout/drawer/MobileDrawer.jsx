import React from 'react';

import useDrawer from 'src/store/useDrawer';

import { SMobileDrawer } from './MobileDrawer.styled';

import Drawer from '../../common/drawer/Drawer';

import Menu from '../menu/Menu';
import MobileAuth from '../auth/MobileAuth';

const MobileDrawer = () => {
  const { isOpen, onClickCloseDrawer } = useDrawer((state) => ({
    isOpen: state.isOpen,
    onClickCloseDrawer: state.onClickCloseDrawer,
  }));

  return (
    <Drawer open={isOpen} close={onClickCloseDrawer}>
      <SMobileDrawer>
        <header className="drawer-header">
          <div className="drawer-auth-container">
            <MobileAuth />
          </div>
        </header>

        <main className="drawer-main">
          <div className="drawer-menu-container">
            <Menu />
          </div>
        </main>
      </SMobileDrawer>
    </Drawer>
  );
};

export default MobileDrawer;
