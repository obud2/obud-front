import React from 'react';

import { useRouter } from 'next/router';

import { SHomeBtn } from './HomeBtn.styled';

const HomeBtn = ({ active, onClick }) => {
  const router = useRouter();

  const onClickBack = () => {
    if (onClick) onClick();
    else router.push('/class');
  };

  return (
    <SHomeBtn active={active} onClick={onClickBack} aria-label="홈 버튼">
      <i className="icons menu_home" />
    </SHomeBtn>
  );
};

export default HomeBtn;
