import React, { useState } from 'react';

import { Spacing } from 'src/styled/CommonStyles';

import _ from 'lodash';

import UserService from 'src/service/UserService';

import HelpText from '@components/common/helpText/HelpText';
import CustomInput from '@components/common/input/CustomInput';
import CustomButton from '@components/common/button/CustomButton';

const ERROR_CODE = {
  NAME: { text: '이름을 입력해주세요.', type: 'name' },
  HP: { text: '전화번호를 입력해주세요.', type: 'hp' },
  ERROR: { text: '존재하는 아이디가 없습니다.', type: 'all' },
};

const FindId = ({ onClickOpenAuth }) => {
  const [body, setBody] = useState({});
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [step, setStep] = useState(1);

  const onChangeInputValue = (type, e) => {
    const temp = _.cloneDeep(error);

    if (temp[type]) {
      temp[type].isErorr = false;
    }

    setError(temp);
    setBody((prev) => ({ ...prev, [type]: e }));
  };

  const onErrorCheck = (code) => {
    setError({ isErorr: true, text: code?.text || '', type: code?.type || '' });
  };

  const onClickFindId = () => {
    if (!body?.name) {
      onErrorCheck(ERROR_CODE.NAME);
      return;
    }
    if (!body?.hp) {
      onErrorCheck(ERROR_CODE.HP);
      return;
    }

    setIsLoading(true);
    UserService.findId(body?.name, body?.hp)
      .then((res) => {
        if (res?.value?.id) {
          setBody({ email: res?.value?.email || '' });
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
          name="hp"
          label="전화번호"
          placeholder="'-'없이 입력"
          type="tel"
          value={body?.hp || ''}
          onChange={(e) => onChangeInputValue('hp', e.target.value)}
          isError={error?.type === 'hp' || error?.type === 'all'}
          disabled={isLoading}
        />
        <Spacing spacing="8" />
        <HelpText text={error?.text} isError={error?.isErorr} />
        <Spacing spacing="8" />

        <CustomButton fullWidth disabled={isLoading} isLoading={isLoading} onClick={onClickFindId}>
          아이디 찾기
        </CustomButton>
      </React.Fragment>
    );
  }

  if (step === 2) {
    return (
      <React.Fragment>
        <CustomInput name="name" label="입력하신 정보와 일치하는 계정을 발견했습니다." type="text" value={body?.email || ''} />

        <Spacing spacing="16" />

        <CustomButton fullWidth onClick={() => onClickOpenAuth('login')}>
          로그인
        </CustomButton>
      </React.Fragment>
    );
  }
};

export default FindId;
