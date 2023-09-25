import React, { useState } from 'react';

import { SJoinPortal } from './JoinPortal.styled';

import CustomButton from '@components/common/button/CustomButton';
import SnsLogin from './SnsLogin';

const JoinPortal = ({ onClickOpenAuth }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SJoinPortal>
      <SnsLogin disabled={isLoading} setIsLoading={setIsLoading} />

      <div className="login-line">
        <p className="line-text">or</p>
      </div>

      <CustomButton className="join-button" fullWidth disabled={isLoading} onClick={() => onClickOpenAuth('policy')}>
        ID/PW 회원가입
      </CustomButton>
    </SJoinPortal>
  );
};

export default JoinPortal;
