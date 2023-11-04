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

type Props = {
  onStepChange: (step: number) => void;
};

type UserForm = {
  isSns?: boolean;
  email?: string;
  snsType?: string;
  password?: string;
  passwordCheck?: string;
  name?: string;
  hp?: string;
  adr?: string;
  adrDetail?: string;
  gender?: string;
  birthdate?: string;
};
const MyEditForm = ({ onStepChange }: Props) => {
  const { user, editUser, isLoading: isUserLoading } = useContext(UserContext);

  const [body, setBody] = useState<UserForm>({});

  const [error, setError] =
    useState<Partial<Record<keyof UserForm, { text: string; isError: boolean }> & { type?: string }>>(DEFALUT_ERROR);
  const [isLoading, setIsLoading] = useState(true);

  const [isWithdraw, setIsWithdraw] = useState(false);

  useEffect(() => {
    const initUser = async () => {
      await setBody({
        isSns: user?.isSns,
        email: user?.email,
        snsType: user?.snsType,
        name: user?.name,
        hp: user?.phone,
        adr: user?.address,
        adrDetail: user?.addressDetail,
        gender: user?.gender,
        birthdate: user?.birthDate,
      });
      await setIsLoading(false);
    };

    initUser();
  }, [user]);

  const onChangeInputValue = (type: keyof UserForm, e: any) => {
    const temp: Partial<Record<keyof UserForm, { text: string; isError: boolean }>> = _.cloneDeep(error);

    if (temp[type]) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      temp[type]!.isError = false;
    }

    setError(temp);
    setBody((prev) => ({ ...prev, [type]: e }));
  };

  const validateCheck = () => {
    let check = true;
    const temp = editValidateCheck(body, error);

    if (temp?.password?.isError || temp?.passwordCheck?.isError || temp?.name?.isError || temp?.hp?.isError) {
      check = false;
    }

    setError(temp);

    return check;
  };

  const onSubmit = () => {
    // 데이터 체크
    if (validateCheck()) {
      setIsLoading(true);

      editUser({
        id: user?.id || '',
        name: body?.name,
        hp: body?.hp,
        password: body?.password,
        adr: body?.adr,
        adrDetail: body?.adrDetail,
        birthdate: body?.birthdate,
        gender: body?.gender,
      })
        .then((res) => {
          if (res.status === 200) {
            onStepChange(3);
          } else {
            alert(
              '',
              res?.message || '프로필 수정 중 오류가 발생하였습니다. <br /> 잠시 후 다시시도해주세요.',
              undefined,
              undefined,
              undefined,
            );
          }
        })
        .catch(() => {
          alert('', '프로필 수정 중 오류가 발생하였습니다. <br /> 잠시 후 다시시도해주세요.', undefined, undefined, undefined);
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
              isError={error?.password?.isError || error?.type === 'all'}
              disabled={isAllLoading}
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
              disabled={isAllLoading}
            />
            <Spacing spacing="4" />
            <HelpText text={error?.passwordCheck?.text} isError={error?.passwordCheck?.isError} />
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
          isError={error?.name?.isError || error?.type === 'all'}
          disabled={isAllLoading}
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
          disabled={isAllLoading}
        />
        <Spacing spacing="4" />
        <HelpText text={error?.hp?.text} isError={error?.hp?.isError} />
        <Spacing spacing="4" />

        <AdressInput
          // name="adr"
          label="주소(선택)"
          value={[body?.adr || '', body?.adrDetail || '']}
          onChange={(e: any) => {
            onChangeInputValue('adr', e?.adr);
            onChangeInputValue('adrDetail', e?.detail);
          }}
          disabled={isAllLoading}
          point={undefined}
        />
        <Spacing spacing="22" />

        <CustomRadio label="성별(선택)" value={body?.gender || ''} onChange={(e: any) => onChangeInputValue('gender', e.target.value)}>
          {GENDER?.map((item) => (
            <CustomRadioItem
              key={item?.value}
              isChecked={body?.gender === item?.value}
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
          onChange={(e: any) => onChangeInputValue('birthdate', e)}
          isError={error?.birthdate?.isError}
          disabled={isAllLoading}
          point={undefined}
        />
        <Spacing spacing="4" />
        <HelpText text={error?.birthdate?.text} isError={error?.birthdate?.isError} />
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
