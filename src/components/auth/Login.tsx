import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { SLogin } from './Login.styled';
import { Spacing } from 'src/styled/CommonStyles';

import { Auth } from 'aws-amplify';
import Amplify from '@aws-amplify/core';
import awsmobile from 'src/aws-exports';

import { setJwt, setUserId } from 'src/constants';

import HelpText from '@components/common/helpText/HelpText';

import CustomInput from '@components/common/input/CustomInput';
import CustomButton from '@components/common/button/CustomButton';
import CustomCheckBox from '@components/common/checkbox/CustomCheckBox';
import SnsLogin from './SnsLogin';

Amplify.configure(awsmobile);

const ERROR_CODE = {
  ID: { text: '아이디를 입력해주세요.', type: 'id' },
  PWD: { text: '비밀번호를 입력해주세요.', type: 'pwd' },
  ERROR: { text: '아이디 또는 비밀번호가 일치하지 않습니다.', type: 'all' },
};

const DEFAULT_BODY = {
  id: '',
  pwd: '',
};

type Props = {
  onClickOpenAuth: (type: string) => void;
};

const Login = ({ onClickOpenAuth }: Props) => {
  const router = useRouter();

  const [body, setBody] = useState(DEFAULT_BODY);

  const [error, setError] = useState({
    isError: false,
    text: '',
    type: '',
  });

  const [isKeep, setIsKeep] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (router.isReady && router.query.id && router.query.code) {
      if (router.query.existType === 'email') {
        setError({ isError: true, text: '이미 가입된 이메일이 존재합니다.', type: 'all' });
      } else {
        onClickLogin('SNS_LOGIN');
      }
    }
  }, [router.isReady, router.query.id, router.query.code]);

  const onChangeInputValue = (e: any) => {
    const { name, value } = e.target;

    setBody((prev) => ({ ...prev, [name]: value }));
  };

  const onErrorCheck = (code: any) => {
    setError({ isError: true, text: code?.text || '', type: code?.type || '' });
  };

  const onKeyDownInput = (e: any) => {
    const KEY = e?.key;
    const ENTER = 'Enter';

    if (KEY === ENTER) onClickLogin();
  };

  const onClickLogin = (check?: string) => {
    let ID = body?.id;
    let PWD = body?.pwd;

    if (check === 'SNS_LOGIN') {
      ID = (router?.query?.id as string) ?? '';
      PWD = (router?.query?.code as string) ?? '';
    }

    if (!ID) {
      onErrorCheck(ERROR_CODE.ID);
      return;
    }
    if (!PWD) {
      onErrorCheck(ERROR_CODE.PWD);
      return;
    }

    setIsLoading(true);
    Auth.signIn(ID, PWD)
      .then((user) => {
        const idToken = user.signInUserSession?.idToken || '';
        const getToken = idToken ? idToken?.getJwtToken() : '';

        setJwt(getToken);
        setUserId(user.username);

        window.location.reload();
      })
      .catch(() => {
        setBody(DEFAULT_BODY);
        onErrorCheck(ERROR_CODE.ERROR);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <SLogin>
      <SnsLogin disabled={isLoading} setIsLoading={setIsLoading} />

      <div className="login-line">
        <p className="line-text">or</p>
      </div>

      <CustomInput
        name="id"
        placeholder="아이디"
        type="email"
        value={body?.id || ''}
        onChange={onChangeInputValue}
        onKeyDown={onKeyDownInput}
        isError={error?.type === 'id' || error?.type === 'all'}
        disabled={isLoading}
      />
      <Spacing spacing="8" />

      <CustomInput
        name="pwd"
        placeholder="비밀번호"
        type="password"
        value={body?.pwd || ''}
        onChange={onChangeInputValue}
        onKeyDown={onKeyDownInput}
        isError={error?.type === 'pwd' || error?.type === 'all'}
        disabled={isLoading}
      />
      <Spacing spacing="12" />

      <HelpText text={error?.text} isError={error?.isError} />
      <Spacing spacing="10" />

      <CustomCheckBox label="로그인상태유지" disabled={isLoading} value={isKeep} onClick={setIsKeep} />

      <Spacing spacing="20" />
      <CustomButton fullWidth onClick={() => onClickLogin()} isLoading={isLoading} disabled={isLoading}>
        로그인
      </CustomButton>

      <div className="obut-auto-container">
        <button onClick={() => onClickOpenAuth('joinPortal')} disabled={isLoading}>
          회원가입
        </button>

        <button onClick={() => onClickOpenAuth('find-id')} disabled={isLoading}>
          아이디 · 비밀번호 찾기
        </button>
      </div>
    </SLogin>
  );
};

export default Login;
