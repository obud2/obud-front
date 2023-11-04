import React, { useState } from 'react';

import { Spacing } from 'src/styled/CommonStyles';
import { regExp } from 'src/constants';

import EmailService from 'src/service/EmailService';

import _ from 'lodash';

import HelpText from '@components/common/helpText/HelpText';
import CustomInput from '@components/common/input/CustomInput';
import CustomButton from '@components/common/button/CustomButton';

const ERROR_CODE = {
  NAME: { text: '이름을 입력해주세요.', type: 'name' },
  EMAIL: { text: '이메일을 입력해주세요.', type: 'email' },
  ERROR: { text: '존재하는 아이디가 없습니다.', type: 'all' },
  VERIFY: { text: '인증번호를 입력해주세요.', type: 'verify' },
  VERIFY_ERROR: { text: '인증번호가 일치하지 않습니다.', type: 'verify' },
  PASSWORD: { text: '비밀번호를 입력하세요.', type: 'password' },
  PASSWORD_CHECK: { text: '비밀번호가 일치하지 않습니다.', type: 'passwordCheck' },
  PASSWORD_VALIDATE: { text: '영문, 숫자, 특수문자 포함 8자이상', type: 'all' },
  PASSWORD_COMPARISON: { text: '비밀번호가 서로 일치하지않습니다.', type: 'all' },
  PASSWORD_ERROR: { text: '오류가 발생하였습니다. 잠시 후 다시시도해주세요.', type: 'all' },
};

const FindPwd = ({ onClickOpenAuth }) => {
  const [body, setBody] = useState({});
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [step, setStep] = useState(1);

  const onChangeInputValue = (type, e) => {
    const temp = _.cloneDeep(error);

    if (temp[type]) {
      temp[type].isError = false;
    }

    setError(temp);
    setBody((prev) => ({ ...prev, [type]: e }));
  };

  const onErrorCheck = (code) => {
    setError({ isError: true, text: code?.text || '', type: code?.type || '' });
  };

  // 이메일 인증번호 발송
  const onClickFindPwd = () => {
    if (!body?.name) {
      onErrorCheck(ERROR_CODE.NAME);
      return;
    }
    if (!body?.email) {
      onErrorCheck(ERROR_CODE.EMAIL);
      return;
    }

    const param = {
      toEmail: body?.email,
      name: body?.name,
    };

    setIsLoading(true);
    EmailService.findPassword(param)
      .then((res) => {
        if (res?.status === 200) {
          setError({});
          setStep(2);
        } else {
          onErrorCheck(ERROR_CODE.ERROR);
        }
      })
      .catch(() => {
        onErrorCheck(ERROR_CODE.ERROR);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // 이메일 인증번호 체크
  const onClickCheckVerify = () => {
    if (!body?.verify) {
      onErrorCheck(ERROR_CODE.VERIFY);
      return;
    }

    setIsLoading(true);
    EmailService.checkVerify(body?.email, body?.verify)
      .then((res) => {
        if (res?.status === 200) {
          setError({});
          setStep(3);
        } else {
          onErrorCheck(ERROR_CODE.VERIFY_ERROR);
        }
      })
      .catch(() => {
        onErrorCheck(ERROR_CODE.VERIFY_ERROR);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // 비밀번호 변경
  const onChangePwd = () => {
    if (!body?.password) {
      onErrorCheck(ERROR_CODE.PASSWORD);
      return;
    }
    if (!body?.passwordCheck) {
      onErrorCheck(ERROR_CODE.PASSWORD_CHECK);
      return;
    }
    if (!regExp('password').test(body?.password)) {
      onErrorCheck(ERROR_CODE.PASSWORD_VALIDATE);
      return;
    }
    if (body?.password !== body?.passwordCheck) {
      onErrorCheck(ERROR_CODE.PASSWORD_COMPARISON);
      return;
    }

    const param = {
      id: body?.email,
      code: body?.verify,
      newPassword: body?.password,
    };

    setIsLoading(true);
    EmailService.changePassword(param)
      .then((res) => {
        if (res?.status === 200) {
          setError({});
          setStep(4);
        } else {
          onErrorCheck(ERROR_CODE.PASSWORD_ERROR);
        }
      })
      .catch(() => {
        onErrorCheck(ERROR_CODE.PASSWORD_ERROR);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (step === 1) {
    return (
      <React.Fragment>
        <CustomInput
          name="name"
          label="이름"
          placeholder="이름"
          type="text"
          value={body?.name || ''}
          onChange={(e) => onChangeInputValue('name', e.target.value)}
          isError={error?.type === 'name' || error?.type === 'all'}
          disabled={isLoading}
        />
        <Spacing spacing="8" />

        <CustomInput
          name="email"
          label="이메일"
          placeholder="가입한 이메일"
          type="email"
          value={body?.email || ''}
          onChange={(e) => onChangeInputValue('email', e.target.value)}
          isError={error?.type === 'email' || error?.type === 'all'}
          disabled={isLoading}
        />

        <Spacing spacing="8" />
        <HelpText text={error?.text} isError={error?.isError} />
        <Spacing spacing="8" />

        <CustomButton fullWidth disabled={isLoading} isLoading={isLoading} onClick={onClickFindPwd}>
          비밀번호 찾기
        </CustomButton>
      </React.Fragment>
    );
  }

  if (step === 2) {
    return (
      <React.Fragment>
        <CustomInput
          name="verify"
          label="인증번호"
          placeholder="인증번호를 입력해주세요."
          type="text"
          value={body?.verify || ''}
          onChange={(e) => onChangeInputValue('verify', e.target.value)}
          isError={error?.type === 'verify'}
          disabled={isLoading}
        />
        <Spacing spacing="8" />
        <HelpText text={error?.text} isError={error?.isError} />
        <Spacing spacing="8" />

        <CustomButton fullWidth disabled={isLoading} isLoading={isLoading} onClick={onClickCheckVerify}>
          인증번호 확인
        </CustomButton>
      </React.Fragment>
    );
  }

  if (step === 3) {
    return (
      <React.Fragment>
        <CustomInput
          point
          name="password"
          label="비밀번호"
          placeholder="비밀번호"
          type="password"
          value={body?.password || ''}
          onChange={(e) => onChangeInputValue('password', e.target.value)}
          isError={error?.type === 'password' || error?.type === 'all'}
          disabled={isLoading}
        />
        <Spacing spacing="8" />

        <CustomInput
          point
          name="passwordCheck"
          label="비밀번호 확인"
          placeholder="비밀번호 확인"
          type="password"
          value={body?.passwordCheck || ''}
          onChange={(e) => onChangeInputValue('passwordCheck', e.target.value)}
          isError={error?.type === 'passwordCheck' || error?.type === 'all'}
          disabled={isLoading}
        />
        <Spacing spacing="4" />
        <HelpText text={error?.text} isError={error?.isError} />
        <Spacing spacing="4" />

        <CustomButton fullWidth onClick={onChangePwd} isLoading={isLoading} disabled={isLoading}>
          비밀번호 변경
        </CustomButton>
      </React.Fragment>
    );
  }

  if (step === 4) {
    return (
      <React.Fragment>
        <Spacing spacing="2" />

        <p style={{ fontSize: '1.4rem', color: '#4E5C4F' }}>비밀번호 재설정이 완료되었습니다.</p>

        <Spacing spacing="32" />

        <CustomButton fullWidth onClick={() => onClickOpenAuth('login')}>
          로그인
        </CustomButton>
      </React.Fragment>
    );
  }
};

export default FindPwd;
