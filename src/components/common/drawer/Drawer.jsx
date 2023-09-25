import React, { useEffect, useState } from 'react';
import reactDom from 'react-dom';

import { SDrawer } from './Drawer.styled';

const Drawer = ({ open, close, children }) => {
  const [isRender, setRender] = useState(false);

  useEffect(() => {
    // Next Js document Error로 인한 작업
    if (typeof document !== 'undefined') {
      setRender(true);
    }
  }, []);

  useEffect(() => {
    if (open) bodyHiddenToggle(true);
    else bodyHiddenToggle(false);
  }, [open]);

  const bodyHiddenToggle = (toggle) => {
    const body = document.querySelector('body');

    if (toggle) {
      body.classList.add('hidden');
    } else {
      body.classList.remove('hidden');
    }
  };

  if (isRender) {
    return reactDom.createPortal(
      <SDrawer open={open}>
        <div className={`drawer-background ${open ? 'active' : ''}`} onClick={close} />
        <div className={`drawer-main-container ${open ? 'active' : ''}`}>{children}</div>
      </SDrawer>,
      document?.getElementById('__portal'),
    );
  }
};

export default Drawer;
