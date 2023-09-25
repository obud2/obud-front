import React, { useEffect, useState } from 'react';

import { SLike } from './Like.styled';
import { loginCheck } from 'src/constants';
import useAuthModal from 'src/store/useAuthModal';

const Like = ({ value, onClick }) => {
  const { onClickOpenAuth } = useAuthModal((state) => ({
    onClickOpenAuth: state.onClickOpenAuth,
  }));

  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    setIsLike(value);
  }, [value]);

  const onClickChecked = async () => {
    if (!loginCheck()) {
      onClickOpenAuth('login');
    } else {
      const temp = !isLike;

      await onClick(!temp);
      await setIsLike(temp);
    }
  };

  return (
    <SLike onClick={onClickChecked}>
      <i className={`icons like${isLike ? '-full' : ''}`} />
    </SLike>
  );
};

export default Like;
