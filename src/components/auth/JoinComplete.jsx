import React from 'react';

import { SJoinComplete } from './JoinComplete.styled';
import CustomButton from '@components/common/button/CustomButton';

const JoinComplete = ({ onClickOpenAuth }) => {
  return (
    <SJoinComplete>
      <div className="join-complete-text">회원 가입이 완료되었습니다.</div>

      <CustomButton fullWidth onClick={() => onClickOpenAuth('login')}>
        로그인
      </CustomButton>
    </SJoinComplete>
  );
};

export default JoinComplete;
