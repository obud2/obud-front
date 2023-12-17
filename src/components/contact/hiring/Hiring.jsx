import React, { useContext, useEffect, useState } from 'react';

import { UserContext } from 'src/context/UserContext';

import { loginCheck } from 'src/constants';
import { SHiring } from './Hiring.styled';

import { Spacing } from 'src/styled/CommonStyles';
import { ADD_CLASS, POLICY_1, POLICY_2, YOGA_CAREER, YOGA_CLASS } from './Hiring.option';

import AboutService from 'src/service/AboutService';

import ContactBase from '../ContactBase';
import CustomInput from '@components/common/input/CustomInput';
import CustomButton from '@components/common/button/CustomButton';

import AboutPolicyCard from '../option/AboutPolicyCard';
import OptionCheckbox from '../option/OptionCheckbox';
import alert from 'src/helpers/alert';

const DEFAULT_BODY = {
  type: 'support',
  process: 'wait',
};

const Hiring = () => {
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

  const onChangeOption = (type, e) => {
    setBody((prev) => ({ ...prev, [type]: e }));
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
    AboutService.saveItem('new', body)
      .then(() => {
        alert('접수완료', '지원이 접수되었습니다. <br /> 입력해 주신 연락처로 연락드리겠습니다.');
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
    <ContactBase title="강사지원">
      <SHiring>
        <div className="contact-policy-container">
          <AboutPolicyCard label={POLICY_1?.label} contents={POLICY_1?.contents} />
          <AboutPolicyCard label={POLICY_2?.label} contents={POLICY_2?.contents} />
        </div>

        <div className="contact-form-container">
          <CustomInput
            name="name"
            label="성함을 알려주세요."
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

          <OptionCheckbox
            label="요가 수업 경력을 알려주세요. (기관은 상관없으니 솔직하게 적어주세요.)"
            option={YOGA_CAREER}
            disabled={isLoading}
            onChange={(e) => onChangeOption('career', e)}
          />
          <Spacing spacing="30" />

          <OptionCheckbox
            label="가능한 요가 수업을 알려주세요. (복수선택 가능)"
            option={YOGA_CLASS}
            disabled={isLoading}
            onChange={(e) => onChangeOption('yogaStyle', e)}
          />
          <Spacing spacing="30" />

          <OptionCheckbox
            label="추가로 진행이 가능한 컨텐츠를 알려주세요. (복수선택 가능)"
            option={ADD_CLASS}
            disabled={isLoading}
            onChange={(e) => onChangeOption('classStyle', e)}
          />
          <Spacing spacing="30" />

          <CustomButton fullWidth variant="outlined" disabled={isLoading} isLoading={isLoading} onClick={onSubmit}>
            지원하기
          </CustomButton>
        </div>
      </SHiring>
    </ContactBase>
  );
};

export default Hiring;
