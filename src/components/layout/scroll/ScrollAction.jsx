import React from 'react';

import { SScrollAction } from './Scroll.styled';

import ScrollTopBtn from './ScrollTopBtn';

const ScrollAction = ({ scrollBtn, hide }) => {
  return (
    <SScrollAction hide={hide}>
      <ScrollTopBtn active={scrollBtn} />
    </SScrollAction>
  );
};

export default React.memo(ScrollAction);
