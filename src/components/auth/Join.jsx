import React, { useState } from 'react';

import _ from 'lodash';
import { SJoin } from './Join.styled';
import { GENDER } from './Join.option';

import { Spacing } from 'src/styled/CommonStyles';
import { DEFALUT_ERROR, joinValidateCheck } from './Join.validate';

import alert from 'src/helpers/alert';

import HelpText from '@components/common/helpText/HelpText';

import AdressInput from '@components/common/adress/AdressInput';

import CustomInput from '@components/common/input/CustomInput';
import CustomButton from '@components/common/button/CustomButton';
import CustomRadio, { CustomRadioItem } from '@components/common/radio/CustomRadio';
import BirthForm from '@components/common/birthForm/BirthForm';
import { setUser } from '@/service/UserService';

const Join = ({ onClickOpenAuth }) => {
  const [body, setBody] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(DEFALUT_ERROR);

  const [isLoading, setIsLoading] = useState(false);

  const onChangeInputValue = (type, e) => {
    const temp = _.cloneDeep(error);

    if (temp[type]) {
      temp[type].isError = false;
    }

    setError(temp);
    setBody((prev) => ({ ...prev, [type]: e }));
  };

  const validateCheck = () => {
    let check = true;
    const temp = joinValidateCheck(body, error);

    if (temp?.id?.isError || temp?.password?.isError || temp?.passwordCheck?.isError || temp?.name?.isError || temp?.hp?.isError) {
      check = false;
    }

    setError(temp);

    return check;
  };

  const onClickJoin = () => {
    // 데이터 체크

    if (validateCheck()) {
      setIsLoading(true);

      const param = { ...body };

      if (!(param?.birthdate?.length > 6)) {
        delete param.birthdate;
      }

      setUser('new', param)
        .then((res) => {
          if (res?.status === 200) {
            onClickOpenAuth('join-complete');
          } else {
            alert('', res?.message || '회원가입 중 오류가 발생하였습니다. <br /> 잠시 후 다시시도해주세요.');
          }
        })
        .catch((res) => {
          alert('', res?.message || '회원가입 중 오류가 발생하였습니다. <br /> 잠시 후 다시시도해주세요.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <SJoin>
      <CustomInput
        point
        name="email"
        label="이메일 아이디"
        placeholder="이메일 아이디"
        type="email"
        value={body?.email || ''}
        onChange={(e) => onChangeInputValue('email', e.target.value)}
        isError={error?.email?.isError || error?.type === 'all'}
        disabled={isLoading}
      />
      <Spacing spacing="4" />
      <HelpText text={error?.email?.text} isError={error?.email?.isError} />
      <Spacing spacing="4" />

      <CustomInput
        point
        name="password"
        label="비밀번호"
        placeholder="비밀번호"
        type="password"
        value={body?.password || ''}
        onChange={(e) => onChangeInputValue('password', e.target.value)}
        isError={error?.password?.isError || error?.type === 'all'}
        disabled={isLoading}
      />
      <Spacing spacing="4" />
      <HelpText text={error?.password?.text} isError={error?.password?.isError} />
      <Spacing spacing="4" />

      <CustomInput
        point
        name="passwordCheck"
        label="비밀번호 확인"
        placeholder="비밀번호 확인"
        type="password"
        value={body?.passwordCheck || ''}
        onChange={(e) => onChangeInputValue('passwordCheck', e.target.value)}
        isError={error?.passwordCheck?.isError || error?.type === 'all'}
        disabled={isLoading}
      />
      <Spacing spacing="4" />
      <HelpText text={error?.passwordCheck?.text} isError={error?.passwordCheck?.isError} />
      <Spacing spacing="4" />

      <CustomInput
        point
        name="name"
        label="이름"
        placeholder="이름"
        type="text"
        value={body?.name || ''}
        onChange={(e) => onChangeInputValue('name', e.target.value)}
        isError={error?.name?.isError || error?.type === 'all'}
        disabled={isLoading}
      />
      <Spacing spacing="4" />
      <HelpText text={error?.name?.text} isError={error?.name?.isError} />
      <Spacing spacing="4" />

      <CustomInput
        point
        name="hp"
        label="전화번호"
        placeholder="'-'없이 입력"
        type="tel"
        value={body?.hp || ''}
        onChange={(e) => onChangeInputValue('hp', e.target.value)}
        isError={error?.hp?.isError || error?.type === 'all'}
        disabled={isLoading}
      />
      <Spacing spacing="4" />
      <HelpText text={error?.hp?.text} isError={error?.hp?.isError} />
      <Spacing spacing="4" />

      <AdressInput
        name="adr"
        label="주소(선택)"
        value={[body?.adr || '', body?.adrDetail || '']}
        onChange={(e) => {
          onChangeInputValue('adr', e?.adr);
          onChangeInputValue('adrDetail', e?.detail);
        }}
        disabled={isLoading}
      />
      <Spacing spacing="22" />

      <CustomRadio label="성별(선택)" value={body?.gender || ''} onChange={(e) => onChangeInputValue('gender', e.target.value)}>
        {GENDER?.map((item) => (
          <CustomRadioItem
            key={item?.value}
            isChecked={body?.gender === item?.value}
            value={item?.value}
            label={item?.label}
            disabled={isLoading}
          />
        ))}
      </CustomRadio>
      <Spacing spacing="22" />

      <BirthForm
        label="생년월일(선택)"
        value={body?.birthdate || ''}
        onChange={(e) => onChangeInputValue('birthdate', e)}
        isError={error?.birthdate?.isError}
        disabled={isLoading}
      />
      <Spacing spacing="4" />
      <HelpText text={error?.birthdate?.text} isError={error?.birthdate?.isError} />
      <Spacing spacing="22" />

      <CustomButton fullWidth onClick={onClickJoin} isLoading={isLoading} disabled={isLoading}>
        가입하기
      </CustomButton>
    </SJoin>
  );
};

export default Join;
