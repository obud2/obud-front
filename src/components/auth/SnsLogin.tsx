import React from 'react';

import { API_URL } from 'src/constants';

import { Spacing } from 'src/styled/CommonStyles';
import { SSnsIcon } from './SnsLogin.styled';

import CustomImage from '@components/common/image/CustomImage';
import CustomButton from '@components/common/button/CustomButton';

// TODO: move to entity
type SnsType = 'kakao' | 'naver' | 'apple' | 'google';

type Props = {
  disabled: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

const SnsLogin = ({ disabled, setIsLoading }: Props) => {
  const onClickSnsLoading = (sns: SnsType) => {
    setIsLoading(true);
    window.location.href = `${API_URL}/user/auth/${sns}`;
  };

  return (
    <>
      <CustomButton fullWidth backgroundColor="#FFEB00" textColor="#3c1e1e" disabled={disabled} onClick={() => onClickSnsLoading('kakao')}>
        <SnsIcon icon="kakao_icon" />
        카카오로 시작하기
      </CustomButton>
      <Spacing spacing="8" />

      {/* <CustomButton
        fullWidth
        backgroundColor="#03C75A"
        textColor="#ffffff"
        disabled={disabled}
        onClick={() => onClickSnsLoading('naver')}
        //
      >
        <SnsIcon icon="naver_icon" />
        네이버로 시작하기
      </CustomButton>
      <Spacing spacing="8" /> */}

      {/* <CustomButton
        fullWidth
        variant="outlined"
        backgroundColor="#283544"
        textColor="#ffffff"
        disabled={disabled}
        onClick={() => onClickSnsLoading('apple')}
      >
        <SnsIcon icon="apple_icon" width={18} height={21} />
        Apple로 시작하기
      </CustomButton>
      <Spacing spacing="8" /> */}

      <CustomButton
        fullWidth
        variant="outlined"
        backgroundColor="transparent"
        textColor="#000000"
        disabled={disabled}
        onClick={() => onClickSnsLoading('google')}
      >
        <SnsIcon icon="google_icon" />
        Google로 시작하기
      </CustomButton>
    </>
  );
};

type SnsIconProps = {
  width?: number;
  height?: number;
  icon: string;
};

const SnsIcon = ({ width = 20, height = 20, icon }: SnsIconProps) => {
  return (
    <SSnsIcon>
      <CustomImage src={`/icons/${icon}.png`} alt="sns-icon" width={width} height={height} />
    </SSnsIcon>
  );
};

export default SnsLogin;