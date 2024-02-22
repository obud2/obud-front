import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { SHomeBtn } from './HomeBtn.styled';

const HomeBtn = ({ onClick }) => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/class');
  }, []);

  const onClickBack = () => {
    if (onClick) onClick();
    else router.push('/class');
  };

  return (
    <SHomeBtn onClick={onClickBack} aria-label="홈 버튼">
      <i className="icons menu_home" />
    </SHomeBtn>
  );
};

export default HomeBtn;
