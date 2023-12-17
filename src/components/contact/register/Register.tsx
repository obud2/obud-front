import React, { useContext, useEffect, useState } from 'react';

import { UserContext } from 'src/context/UserContext';

import { SRegister } from './Register.styled';

import { Spacing } from 'src/styled/CommonStyles';
import { POLICY_1 } from './Register.option';

import AboutService from 'src/service/AboutService';

import ContactBase from '../ContactBase';
import CustomInput from '@components/common/input/CustomInput';
import CustomButton from '@components/common/button/CustomButton';

import AboutPolicyCard from '../option/AboutPolicyCard';
import alert from 'src/helpers/alert';


type Form = {
  placeTitle: string;
  sns: string;
  program: string;
  representative: string;
  phone: string;
}

const EMPTY_BODY: Form = {
  placeTitle: '',
  sns: '',
  program: '',
  representative: '',
  phone: '',
};
const Register = () => {
  const { user } = useContext(UserContext);

  const [body, setBody] = useState<Form>(EMPTY_BODY);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.id) {
      setBody({
        ...EMPTY_BODY,
        representative: user.name,
        phone: user.phone,
      });
    }
  }, [user]);

  const onChangeInputValue = (e) => {
    const { name, value } = e.target;

    setBody((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = () => {
    if (!body.placeTitle) {
      alert('', '입점을 원하는 공간의 이름을 알려주세요');
      return;
    }
    if (!body.sns) {
      alert('', '공간의 인스타그램 주소를 알려주세요');
      return;
    }
    if (!body.placeTitle) {
      alert('', '진행하는 프로그램에 대해 알려주세요');
      return;
    }
    if (!body.representative || !body.phone) {
      alert('', '담당자 성함과 연락처를 알려주세요');
      return;
    }

    setIsLoading(true);
    AboutService.saveItem('new', body)
      .then(() => {
        alert('접수완료', '입점 문의가 접수되었습니다. <br /> 입력해 주신 연락처로 연락드리겠습니다.');
        setBody(EMPTY_BODY);
      })
      .catch(() => {
        alert('', '오류가 발생하였습니다. <br /> 잠시 후 다시시도해주세요.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <ContactBase title="입점문의">
      <SRegister>
        <div className="contact-policy-container">
          <AboutPolicyCard label={POLICY_1.label} contents={POLICY_1.contents} />
        </div>

        <div className="contact-form-container">
          <CustomInput
            name="placeTitle"
            label="입점을 원하는 공간의 이름을 알려주세요"
            type="text"
            value={body?.placeTitle || ''}
            point
            variant="outlined"
            onChange={onChangeInputValue}
            disabled={isLoading}
          />
          <Spacing spacing="30" />

          <CustomInput
            name="sns"
            label="인스타그램 주소를 알려주세요."
            placeholder="@abc_def"
            type="text"
            variant="outlined"
            value={body?.sns || ''}
            onChange={onChangeInputValue}
            disabled={isLoading}
          />
          <Spacing spacing="30" />

          <CustomInput
            name="program"
            label="진행하는 프로그램에 대해 알려주세요."
            type="text"
            value={body?.program || ''}
            point
            variant="outlined"
            onChange={onChangeInputValue}
            disabled={isLoading}
          />
          <Spacing spacing="30" />

          <CustomInput
            name="representative"
            label="담당자 성함과 직책을 알려주세요"
            type="text"
            value={body?.representative || ''}
            point
            variant="outlined"
            onChange={onChangeInputValue}
            disabled={isLoading}
          />
          <Spacing spacing="30" />

          <CustomInput
            name="phone"
            label="연락처를 알려주세요. (핸드폰 번호)"
            type="tel"
            value={body?.phone || ''}
            point
            variant="outlined"
            onChange={onChangeInputValue}
            disabled={isLoading}
          />
          <Spacing spacing="30" />

          <CustomButton fullWidth variant="outlined" disabled={isLoading} isLoading={isLoading} onClick={onSubmit}>
            입점 문의하기
          </CustomButton>
        </div>
      </SRegister>
    </ContactBase>
  );
};

export default Register;
