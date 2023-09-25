import React, { useState } from 'react';

import { getUserId } from 'src/constants';
import { SPasswordCheck } from './PasswordCheck.styled';

import { Spacing } from 'src/styled/CommonStyles';

import { Auth } from 'aws-amplify';
import Amplify from '@aws-amplify/core';
import awsmobile from 'src/aws-exports';

import CustomInput from '@components/common/input/CustomInput';
import CustomButton from '@components/common/button/CustomButton';
import HelpText from '@components/common/helpText/HelpText';

Amplify.configure(awsmobile);

const ERROR_CODE = {
  PWD: { text: '비밀번호를 입력해주세요.', type: 'pwd' },
  ERROR: { text: '비밀번호가 일치하지 않습니다.', type: 'pwd' },
};

const PasswordCheck = ({ onStepChange }) => {
  const [body, setBody] = useState({});

  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onChangeInputValue = (type, e) => {
    setBody((prev) => ({ ...prev, [type]: e }));
  };

  const onErrorCheck = (code) => {
    setError({ isErorr: true, text: code?.text || '', type: code?.type || '' });
  };

  const onKeyDownInput = (e) => {
    const KEY = e?.key;
    const ENTER = 'Enter';

    if (KEY === ENTER) onClickCheckPwd();
  };

  const onClickCheckPwd = () => {
    if (!body?.password) {
      onErrorCheck(ERROR_CODE.PWD);
      return;
    }

    const userId = getUserId();

    setIsLoading(true);
    Auth.signIn(userId, body?.password)
      .then(async (user) => {
        if (user?.username) {
          onStepChange(2);
        }
      })
      .catch(() => {
        setBody({});
        onErrorCheck(ERROR_CODE.ERROR);
        setIsLoading(false);
      });
  };

  return (
    <SPasswordCheck>
      <div className="password-check-container">
        <h4 className="password-check-title">프로필 수정을 위해 비밀번호를 입력해주세요.</h4>
        <CustomInput
          point
          name="password"
          placeholder="비밀번호"
          type="password"
          value={body?.password || ''}
          onChange={(e) => onChangeInputValue('password', e.target.value)}
          onKeyDown={onKeyDownInput}
          isError={error?.isErorr}
          disabled={isLoading}
        />
        <Spacing spacing="6" />
        <HelpText text={error?.text} isError={error?.isErorr} />
        <Spacing spacing="14" />

        <CustomButton fullWidth variant="outlined" disabled={isLoading} isLoading={isLoading} onClick={onClickCheckPwd}>
          프로필 수정
        </CustomButton>
      </div>
    </SPasswordCheck>
  );
};

export default PasswordCheck;
