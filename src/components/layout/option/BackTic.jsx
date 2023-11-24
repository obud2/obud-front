import React from 'react';

import { useRouter } from 'next/router';
import { SBackTic } from './BackTic.styled';

import { MdArrowBackIosNew } from 'react-icons/md';

const BackTic = ({ active, onClick }) => {
  const router = useRouter();

  const onClickBack = () => {
    if (onClick) onClick();
    else router.back();
  };

  return (
    <SBackTic active={active} onClick={onClickBack} aria-label="뒤로가기 버튼">
      <MdArrowBackIosNew />
    </SBackTic>
  );
};

export default BackTic;
