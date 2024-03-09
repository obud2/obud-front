import React from 'react';

import Modal from '@components/common/modal/Modal';

import { SAuthModal } from './AuthModal.styled';
import useAuthModal from 'src/store/useAuthModal';

import Login from './Login';
import Join from './Join';

import Policy from './Policy';
import JoinPortal from './JoinPortal';
import JoinComplete from './JoinComplete';
import FindUser from './FindUser';

const AuthModal = () => {
  const { auth, onClickOpenAuth, onClickCloseAuth } = useAuthModal((state) => ({
    auth: state.auth,
    onClickOpenAuth: state.onClickOpenAuth,
    onClickCloseAuth: state.onClickCloseAuth,
  }));

  const titleByRender = (type) => {
    let temp = '';

    switch (type) {
      case 'login':
        temp = '로그인';
        break;
      case 'joinPortal':
        temp = '회원가입';
        break;
      case 'policy':
        temp = '약관동의';
        break;
      case 'join':
        temp = '회원가입';
        break;
      case 'join-complete':
        temp = '회원가입';
        break;
      case 'find-id':
        temp = '아이디 찾기';
        break;
      case 'find-pwd':
        temp = '비밀번호 찾기';
        break;
    }

    return temp;
  };

  const contentsByRender = (type) => {
    let temp: React.ReactElement | null = null;

    switch (type) {
      case 'login':
        temp = <Login onClickOpenAuth={onClickOpenAuth} />;
        break;
      case 'joinPortal':
        temp = <JoinPortal onClickOpenAuth={onClickOpenAuth} />;
        break;
      case 'policy':
        temp = <Policy onClickOpenAuth={onClickOpenAuth} onClickCloseAuth={onClickCloseAuth} />;
        break;
      case 'join':
        temp = <Join onClickOpenAuth={onClickOpenAuth} />;
        break;
      case 'join-complete':
        temp = <JoinComplete onClickOpenAuth={onClickOpenAuth} />;
        break;
      case 'find-id':
        temp = <FindUser type="find-id" onClickOpenAuth={onClickOpenAuth} />;
        break;
      case 'find-pwd':
        temp = <FindUser type="find-pwd" onClickOpenAuth={onClickOpenAuth} />;
        break;
    }

    return temp;
  };

  return (
    <Modal open={auth?.isOpen} close={onClickCloseAuth}>
      <SAuthModal>
        <header className="auth-header">
          <h3>{titleByRender(auth?.type)}</h3>

          <div className="auth-close-btn" onClick={onClickCloseAuth} />
        </header>

        <main className="auth-main">{contentsByRender(auth?.type)}</main>
      </SAuthModal>
    </Modal>
  );
};

export default AuthModal;
