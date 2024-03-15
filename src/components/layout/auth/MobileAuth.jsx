import React, { useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import useDrawer from 'src/store/useDrawer';
import useAuthModal from 'src/store/useAuthModal';
import { UserContext } from 'src/context/UserContext';

import { SMobileAuth } from './MobileAuth.styled';
import { loginCheck, userLogout } from 'src/constants';

const MobileAuth = () => {
  const router = useRouter();

  const { user } = useContext(UserContext);

  const { onClickOpenAuth } = useAuthModal((state) => ({
    onClickOpenAuth: state.onClickOpenAuth,
  }));

  const { onClickCloseDrawer } = useDrawer((state) => ({
    onClickCloseDrawer: state.onClickCloseDrawer,
  }));

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (loginCheck()) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [router]);

  const onClickAuth = (id) => {
    switch (id) {
      case 'login':
        onClickOpenAuth('login');
        onClickCloseDrawer();
        break;
      case 'join':
        onClickOpenAuth('joinPortal');
        onClickCloseDrawer();
        break;

      case 'my':
        router.push('/my/order');
        onClickCloseDrawer();
        break;
      case 'logout':
        userLogout();
        onClickCloseDrawer();
        break;
    }
  };

  return (
    <SMobileAuth>
      <div className="auth-title-container">
        {isLogin ? (
          <div className="have-auto-title-containers">
            <p className="auth-name">{user?.name || 'Unkown'}님</p>
            <div
              className="arrow-icon"
              onClick={() => {
                router.push('/my/edit');
              }}
            />
          </div>
        ) : (
          <div className="have-no-auto-title-container">
            <div className="have-no-auth-button-container">
              <button onClick={() => onClickAuth('login')}>로그인</button>

              <span className="auth-line" />

              <button onClick={() => onClickAuth('join')}>회원가입</button>
            </div>

            <div className="have-no-auth-title" onClick={() => onClickAuth('login')}>
              로그인 후 obud의 서비스를 이용해보세요.
            </div>
          </div>
        )}
      </div>
    </SMobileAuth>
  );
};

export default MobileAuth;
