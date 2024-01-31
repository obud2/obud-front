import React, { useContext, useEffect, useState } from 'react';

import { UserContext } from 'src/context/UserContext';

import { loginCheck } from 'src/constants';
import { SPrivate } from './Private.styled';

import { Spacing } from 'src/styled/CommonStyles';
import { POLICY_1 } from './Private.option';

import ContactBase from '../ContactBase';
import CustomInput from '@components/common/input/CustomInput';
import CustomTextrea from '@components/common/textarea/CustomTextrea';
import CustomButton from '@components/common/button/CustomButton';

import AboutPolicyCard from '../option/AboutPolicyCard';
import alert from 'src/helpers/alert';
import { saveItem } from '@/service/AboutService';

const DEFAULT_BODY = {
  type: 'class',
  process: 'wait',
};

const Private = () => {
  const { user } = useContext(UserContext);

  const [body, setBody] = useState(DEFAULT_BODY);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.id) {
      setBody({
        name: user?.name,
        hp: user?.hp,
        ...DEFAULT_BODY,
      });
    }
  }, [user]);

  const onChangeInputValue = (e) => {
    const { name, value } = e.target;

    setBody((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = () => {
    if (!loginCheck()) {
      alert('', '로그인 사용자만 작성 가능합니다.');
      return;
    }

    if (!body?.name || !body?.hp) {
      alert('', '성함과 연락처는 필수입력 사항입니다. ');
      return;
    }

    setIsLoading(true);
    saveItem('new', body)
      .then(() => {
        alert('접수완료', '문의가 접수되었습니다. <br /> 입력해 주신 연락처로 연락드리겠습니다.');
      })
      .catch(() => {
        alert('', '오류가 발생하였습니다. <br /> 잠시 후 다시시도해주세요.');
      })
      .finally(() => {
        setBody(DEFAULT_BODY);
        setIsLoading(false);
      });
  };

  return (
    <ContactBase title="클래스 문의">
      <SPrivate>
        <div className="contact-policy-container">
          <AboutPolicyCard label={POLICY_1?.label} contents={POLICY_1?.contents} />
        </div>

        <div className="contact-form-container">
          <CustomInput
            name="name"
            label="성함 또는 단체명을 알려주세요."
            type="text"
            value={body?.name || ''}
            point
            variant="outlined"
            onChange={onChangeInputValue}
            disabled={isLoading}
          />
          <Spacing spacing="30" />

          <CustomInput
            name="hp"
            label="연락처를 알려주세요."
            type="tel"
            value={body?.hp || ''}
            point
            variant="outlined"
            onChange={onChangeInputValue}
            disabled={isLoading}
          />
          <Spacing spacing="30" />

          <CustomInput
            name="region"
            label="원하는 지역 또는 공간을 알려주세요."
            placeholder="서울 성동구, 제주 등"
            type="text"
            variant="outlined"
            value={body?.region || ''}
            onChange={onChangeInputValue}
            disabled={isLoading}
          />
          <Spacing spacing="30" />

          <CustomInput
            name="num"
            label="인원을 알려주세요."
            placeholder="1:1 프라이빗 레슨, 8명 단체 클래스 등"
            type="text"
            variant="outlined"
            value={body?.num || ''}
            onChange={onChangeInputValue}
            disabled={isLoading}
          />
          <Spacing spacing="30" />

          <CustomInput
            name="date"
            label="원하는 날짜와 시간대를 알려주세요."
            placeholder="3월 주말 오전 시간대, 3/12 및 3/19 오전10시 등"
            type="text"
            variant="outlined"
            value={body?.date || ''}
            onChange={onChangeInputValue}
            disabled={isLoading}
          />
          <Spacing spacing="30" />

          <CustomTextrea
            name="etc"
            label="원하는 컨텐츠가 있으면 알려주세요."
            type="text"
            rows="12"
            value={body?.etc || ''}
            onChange={onChangeInputValue}
            disabled={isLoading}
          />
          <Spacing spacing="30" />

          <CustomButton fullWidth variant="outlined" disabled={isLoading} isLoading={isLoading} onClick={onSubmit}>
            문의하기
          </CustomButton>
        </div>
      </SPrivate>
    </ContactBase>
  );
};

export default Private;
