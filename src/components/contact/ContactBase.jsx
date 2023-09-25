import React, { useContext, useEffect, useState } from 'react';

import { loginCheck } from 'src/constants';
import { SContactBase } from './ContactBase.styled';
import { LayoutContext } from 'src/context/LayoutContext';

import useAuthModal from 'src/store/useAuthModal';

import alert from 'src/helpers/alert';
import Steps from '@components/common/steps/Steps';

const ContactBase = ({ title, children }) => {
  const { matchese } = useContext(LayoutContext);

  const [steps, setSteps] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  const { onClickOpenAuth } = useAuthModal((state) => ({
    onClickOpenAuth: state.onClickOpenAuth,
  }));

  useEffect(() => {
    const check = loginCheck();

    setIsLogin(!check);
  }, []);

  useEffect(() => {
    const temp = [{ label: 'Contact', link: '/contact' }];

    if (title) {
      temp.push({ label: title, link: '' });
    }

    setSteps(temp);
  }, [title]);

  const onClickLoginInduction = () => {
    alert('', '로그인 사용자만 작성 가능합니다. <br /> 로그인 하시겠습니까?', '취소', '로그인', (_) => {
      if (_) {
        onClickOpenAuth('login');
      }
    });
  };

  return (
    <SContactBase>
      {!matchese && <Steps steps={steps} />}

      <div className="obud-title-container">
        <h2 className="obud-title text-delay-animation">{title}</h2>
        <div className="title-line" />
      </div>

      <article className="obud-about-article">
        {isLogin && <div className="about-login-check" onClick={onClickLoginInduction} />}
        {children}
      </article>
    </SContactBase>
  );
};

export default ContactBase;
