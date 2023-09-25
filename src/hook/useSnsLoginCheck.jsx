import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { loginCheck } from 'src/constants';
import useAuthModal from 'src/store/useAuthModal';

const useSnsLoginCheck = () => {
  const router = useRouter();

  const { onClickOpenAuth } = useAuthModal((state) => ({
    onClickOpenAuth: state.onClickOpenAuth,
  }));

  // Sns 로그인 시도 시 로그인 모달 띄우기
  useEffect(() => {
    // http://127.0.0.1:3000/?type=exist&sns=kakao&existType=kakao&id=97888465-f44b-4d2d-9b12-5d8030cc1eef&code=2915490879

    if (router?.query?.id && router?.query?.code) {
      if (!loginCheck()) {
        onClickOpenAuth('login');
      } else {
        router.replace('/');
      }
    }
  }, [router]);
};

export default useSnsLoginCheck;
