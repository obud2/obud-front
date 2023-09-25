import React, { useContext, useEffect, useState } from 'react';

import _ from 'lodash';
import { UserContext } from 'src/context/UserContext';

import { userLogout } from 'src/constants';
import { GENDER } from '@components/auth/Join.option';

import alert from 'src/helpers/alert';

import { SMyEditForm } from './MyEditForm.styled';
import { Spacing } from 'src/styled/CommonStyles';

import { DEFALUT_ERROR, editValidateCheck } from './MyEditForm.validate';

import HelpText from '@components/common/helpText/HelpText';
import AdressInput from '@components/common/adress/AdressInput';
import BirthForm from '@components/common/birthForm/BirthForm';
import CustomInput from '@components/common/input/CustomInput';
import CustomRadio, { CustomRadioItem } from '@components/common/radio/CustomRadio';
import CustomButton from '@components/common/button/CustomButton';
import WithdrawModal from './WithdrawModal';

const MyEditForm = ({ onStepChange }) => {
  const { user, editUser, isLoading: isUserLoading } = useContext(UserContext);

  const [body, setBody] = useState({});

  const [error, setError] = useState(DEFALUT_ERROR);
  const [isLoading, setIsLoading] = useState(true);

  const [isWithdraw, setIsWithdraw] = useState(false);

  useEffect(() => {
    const initUser = async () => {
      await setBody(user);
      await setIsLoading(false);
    };

    initUser();
  }, [user]);

  const onChangeInputValue = (type, e) => {
    const temp = _.cloneDeep(error);

    if (temp[type]) {
      temp[type].isErorr = false;
    }

    setError(temp);
    setBody((prev) => ({ ...prev, [type]: e }));
  };

  const validateCheck = () => {
    let check = true;
    const temp = editValidateCheck(body, error);

    if (temp?.password?.isErorr || temp?.passwordCheck?.isErorr || temp?.name?.isErorr || temp?.hp?.isErorr) {
      check = false;
    }

    setError(temp);

    return check;
  };

  const onSubmit = () => {
    // 데이터 체크
    if (validateCheck()) {
      setIsLoading(true);

      editUser(body)
        .then((res) => {
          if (res?.status === 200) {
            onStepChange(3);
          } else {
            alert('', res?.message || '프로필 수정 중 오류가 발생하였습니다. <br /> 잠시 후 다시시도해주세요.');
          }
        })
        .catch(() => {
          alert('', '프로필 수정 중 오류가 발생하였습니다. <br /> 잠시 후 다시시도해주세요.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const isAllLoading = isUserLoading || isLoading;

  return (
    <React.Fragment>
      <SMyEditForm>
        <CustomInput point name="email" label="이메일 아이디" value={body?.email || ''} disabled />
        <Spacing spacing="22" />

        {user?.isSns && (
          <React.Fragment>
            <CustomInput point label="SNS (Sns 가입자는 비밀번호 변경이 불가능합니다.)" value={body?.snsType || ''} disabled />
            <Spacing spacing="22" />
          </React.Fragment>
        )}

        {!user?.isSns && (
          <React.Fragment>
            <CustomInput
              point
              name="password"
              label="비밀번호"
              placeholder="비밀번호를 변경하는 경우 입력하세요."
              type="password"
              value={body?.password || ''}
              onChange={(e) => onChangeInputValue('password', e.target.value)}
              isError={error?.password?.isErorr || error?.type === 'all'}
              disabled={isAllLoading}
            />
            <Spacing spacing="4" />
            <HelpText text={error?.password?.text} isError={error?.password?.isErorr} />
            <Spacing spacing="4" />

            <CustomInput
              point
              name="passwordCheck"
              label="비밀번호 확인"
              placeholder="비밀번호 확인"
              type="password"
              value={body?.passwordCheck || ''}
              onChange={(e) => onChangeInputValue('passwordCheck', e.target.value)}
              isError={error?.passwordCheck?.isErorr || error?.type === 'all'}
              disabled={isAllLoading}
            />
            <Spacing spacing="4" />
            <HelpText text={error?.passwordCheck?.text} isError={error?.passwordCheck?.isErorr} />
            <Spacing spacing="4" />
          </React.Fragment>
        )}

        <CustomInput
          point
          name="name"
          label="이름"
          placeholder="이름"
          type="text"
          value={body?.name || ''}
          onChange={(e) => onChangeInputValue('name', e.target.value)}
          isError={error?.name?.isErorr || error?.type === 'all'}
          disabled={isAllLoading}
        />
        <Spacing spacing="4" />
        <HelpText text={error?.name?.text} isError={error?.name?.isErorr} />
        <Spacing spacing="4" />

        <CustomInput
          point
          name="hp"
          label="전화번호"
          placeholder="'-'없이 입력"
          type="tel"
          value={body?.hp || ''}
          onChange={(e) => onChangeInputValue('hp', e.target.value)}
          isError={error?.hp?.isErorr || error?.type === 'all'}
          disabled={isAllLoading}
        />
        <Spacing spacing="4" />
        <HelpText text={error?.hp?.text} isError={error?.hp?.isErorr} />
        <Spacing spacing="4" />

        <AdressInput
          name="adr"
          label="주소(선택)"
          value={[body?.adr || '', body?.adrDetail || '']}
          onChange={(e) => {
            onChangeInputValue('adr', e?.adr);
            onChangeInputValue('adrDetail', e?.detail);
          }}
          disabled={isAllLoading}
        />
        <Spacing spacing="22" />

        <CustomRadio label="성별(선택)" value={body?.gender || ''} onChange={(e) => onChangeInputValue('gender', e.target.value)}>
          {GENDER?.map((item) => (
            <CustomRadioItem
              key={item?.value}
              isCheckd={body?.gender === item?.value}
              value={item?.value}
              label={item?.label}
              disabled={isAllLoading}
            />
          ))}
        </CustomRadio>
        <Spacing spacing="22" />

        <BirthForm
          label="생년월일(선택)"
          value={body?.birthdate || ''}
          onChange={(e) => onChangeInputValue('birthdate', e)}
          isError={error?.birthdate?.isErorr}
          disabled={isAllLoading}
        />
        <Spacing spacing="4" />
        <HelpText text={error?.birthdate?.text} isError={error?.birthdate?.isErorr} />
        <Spacing spacing="22" />

        <CustomButton fullWidth variant="outlined" disabled={isLoading} isLoading={isLoading} onClick={onSubmit}>
          프로필 수정
        </CustomButton>

        <div className="my-user-withdraw-container">
          <button className="my-user-withdraw-button" onClick={() => setIsWithdraw(true)}>
            회원탈퇴
          </button>
        </div>

        <div className="my-user-withdraw-container">
          <button className="my-user-withdraw-button" onClick={() => userLogout()}>
            로그아웃
          </button>
        </div>
      </SMyEditForm>

      <WithdrawModal isOpen={isWithdraw} isClose={() => setIsWithdraw(false)} />
    </React.Fragment>
  );
};

export default MyEditForm;
