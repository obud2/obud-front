import React, { useContext } from 'react';

import { useRouter } from 'next/router';
import { SContact } from './Contact.styled';

import { RootContext } from 'src/context/RootContext';

import BaseTitle from '@components/base/BaseTitle';
import CustomButton from '@components/common/button/CustomButton';

const CONTACT = [
  {
    id: 'about',
    title: '입점 및 제휴문의',
    contents: '오붓과 함께 스페셜 클래스를 기획하고 싶거나, \n 입점 및 제휴를 원하시면 \n 아래 메일로 연락주세요.',
    button: 'api',
  },
  {
    id: 'class',
    title: '클래스 문의',
    contents: '오붓에서 진행하는 클래스를 \n 프라이빗하게 진행하고 싶다면, \n 아래 폼(개인/단체)을 제출해주세요.',
    button: '문의하기',
  },
  {
    id: 'instructor',
    title: '강사지원',
    contents: '오붓과 함께하실 \n 열정적인 선생님들을 모집합니다. \n 아래 지원서를 제출해주세요.',
    button: '지원하기',
  },
];

const Contact = () => {
  const router = useRouter();

  const root = useContext(RootContext);

  const buttonRender = (text) => {
    let button = text;

    if (text === 'api') button = root?.info?.email || '';

    return button;
  };

  const handleEmail = () => {
    const email = root?.info?.email || '';
    const userAgent = navigator.userAgent || '';

    if (userAgent.match(/isAndroid|isIOS/i)) {
      const params = {
        method: 'OPEN_EMAIL',
        email,
      };
      window.ReactNativeWebView?.postMessage(JSON.stringify(params));
    } else {
      window.location.href = `mailto:${email}`;
    }
  };

  const onClickSubmit = (id) => {
    switch (id) {
      case 'about':
        handleEmail();
        break;
      case 'class':
        router.push('/contact/private');
        break;
      case 'instructor':
        router.push('/contact/hiring');
        break;
    }
  };

  return (
    <SContact>
      <BaseTitle title="Contact" />

      <article className="obud-contack-article">
        {CONTACT?.map((item) => (
          <ContactItem
            key={item?.id}
            title={item?.title || ''}
            contents={item?.contents || ''}
            button={buttonRender(item?.button || '')}
            onClick={() => onClickSubmit(item?.id)}
          />
        ))}
      </article>
    </SContact>
  );
};

const ContactItem = ({ title, contents, button, onClick }) => {
  return (
    <div className="contact-item-container">
      <h3 className="contact-title">{title}</h3>

      <div className="contact-contents">{contents}</div>

      <CustomButton className="contact-button" onClick={onClick}>
        {button}
      </CustomButton>
    </div>
  );
};

export default Contact;
