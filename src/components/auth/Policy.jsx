import React, { useEffect, useState } from 'react';

import { SPolicy } from './Policy.styled';
import { Spacing } from 'src/styled/CommonStyles';

import { useQuery } from 'react-query';
import InfoService from 'src/service/InfoService';

import HelpText from '@components/common/helpText/HelpText';
import CustomCheckBox from '@components/common/checkbox/CustomCheckBox';
import CustomButton from '@components/common/button/CustomButton';

const Policy = ({ onClickOpenAuth, onClickCloseAuth }) => {
  const { data } = useQuery(['policy'], () => InfoService.info('policy'));

  const [agree, setAgree] = useState({
    all: false,
    terms: false,
    privacyPolicy: false,
  });
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (agree?.terms && agree?.privacyPolicy && !agree?.all) {
      setAgree({
        all: true,
        terms: true,
        privacyPolicy: true,
      });
    }

    if ((!agree?.terms || !agree?.privacyPolicy) && agree?.all) {
      setAgree((prev) => ({ ...prev, all: false }));
    }
  }, [agree]);

  const onChangeAgree = (type, e) => {
    setIsError(false);

    if (type === 'all') {
      setAgree({ all: e, terms: e, privacyPolicy: e });
    } else {
      setAgree((prev) => ({ ...prev, [type]: e }));
    }
  };

  const onSubmit = () => {
    if (agree?.all) {
      onClickOpenAuth('join');
    } else {
      setIsError(true);
    }
  };

  return (
    <SPolicy>
      <CustomCheckBox label="이용약관, 개인정보 수집 및 이용에 동의합니다." value={agree?.all} onClick={(e) => onChangeAgree('all', e)} />
      <Spacing spacing="30" />

      <CustomCheckBox label="이용약관 동의" value={agree?.terms} onClick={(e) => onChangeAgree('terms', e)} />
      <Spacing spacing="11" />

      <div className="policy-input-box" dangerouslySetInnerHTML={{ __html: data?.terms || '' }} />
      <Spacing spacing="27" />

      <CustomCheckBox label="개인정보 수집 및 이용 동의" value={agree?.privacyPolicy} onClick={(e) => onChangeAgree('privacyPolicy', e)} />
      <Spacing spacing="11" />

      <div className="policy-input-box" dangerouslySetInnerHTML={{ __html: data?.privacyPolicy || '' }} />
      <Spacing spacing="13" />

      <HelpText text="이용약관 및 개인정보 처리방침에 동의하셔야 가입이 가능합니다." isError={isError} />
      <Spacing spacing="13" />

      <div className="obut-footer-container">
        <CustomButton fullWidth variant="outlined" onClick={onClickCloseAuth}>
          취소
        </CustomButton>

        <CustomButton fullWidth onClick={onSubmit}>
          가입하기
        </CustomButton>
      </div>
    </SPolicy>
  );
};

export default Policy;
