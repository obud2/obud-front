/* eslint-disable no-console */
import { useEffect } from 'react';

import { API_URL, APP_URL } from 'src/constants';

import { Spacing } from 'src/styled/CommonStyles';
import { SSnsIcon } from './SnsLogin.styled';

import axiosInstance from '@/constants/AxiosInstance';
import CustomButton from '@components/common/button/CustomButton';
import CustomImage from '@components/common/image/CustomImage';
import { StorageKey } from '@/constants/LocalStorage';

type KakaoOAuthToken = {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  accessTokenExpiresAt: Date;
  refreshTokenExpiresAt: Date;
  scopes: string[];
};

// TODO: move to entity
type SnsType = 'kakao' | 'naver' | 'apple' | 'google';

type Props = {
  disabled: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

type AppleAuthResponse = {
  identityToken: string; // jwt
};

const SnsLogin = ({ disabled, setIsLoading }: Props) => {
  const onClickSnsLoading = (sns: SnsType) => {
    setIsLoading(true);
    localStorage.setItem(StorageKey.SocialLoginReferrer, window.location.href || '');
    // query param의 redirect url은 실제로는 사용하지 않음
    window.location.href = `${API_URL}/user/auth/${sns}?redirectUrl=${window.location.href}`;
  };

  const onClickKakaoLogin = () => {
    if (window.ReactNativeWebView) {
      window?.ReactNativeWebView?.postMessage(JSON.stringify({ method: 'KAKAO_SIGNIN' }));
    } else {
      onClickSnsLoading('kakao');
    }
  };
  const onClickAppleLogin = () => {
    if (window.ReactNativeWebView) {
      window?.ReactNativeWebView?.postMessage(JSON.stringify({ method: 'APPLE_SIGNIN' }));
    } else {
      onClickSnsLoading('apple');
    }
  };

  const handleKakaoLogin = async (token: KakaoOAuthToken) => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.post('/user/auth/kakao/native/callback', token);
      const userAgent = navigator.userAgent;
      if (userAgent.match(/isAndroid/i)) {
        location.href = `${APP_URL}/${data.path}${data.query}`;
      } else {
        window.location.href = `${APP_URL}/${data.path}${data.query}`;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleLogin = async (jwt: string) => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.post('/user/auth/apple/native/callback', { id_token: jwt });
      window.location.href = `${APP_URL}/${data.path}${data.query}`;
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      let message: any;
      try {
        const { data } = event;
        message = JSON.parse(data) as { messageType: string };
      } catch (err) {
        console.error(err);
        return;
      }
      if (message.messageType === 'KAKAO_SIGNIN') {
        const token = message as unknown as KakaoOAuthToken;
        handleKakaoLogin(token);
        return;
      }
      if (message.messageType === 'APPLE_SIGNIN') {
        const response = message as unknown as AppleAuthResponse;
        handleAppleLogin(response.identityToken);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <>
      <CustomButton fullWidth backgroundColor="#FFEB00" textColor="#3c1e1e" disabled={disabled} onClick={onClickKakaoLogin}>
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
      <CustomButton
        fullWidth
        variant="outlined"
        backgroundColor="#283544"
        textColor="#ffffff"
        disabled={disabled}
        onClick={onClickAppleLogin}
      >
        <SnsIcon icon="apple_icon" width={18} height={21} />
        Apple로 시작하기
      </CustomButton>
      <Spacing spacing="8" />
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
