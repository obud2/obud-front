import React, { useContext } from 'react';

import { useRouter } from 'next/router';
import { SContact } from './Contact.styled';

import BaseTitle from '@components/base/BaseTitle';
import CustomButton from '@components/common/button/CustomButton';
import { RootContext } from '@/context/RootContext';

const CONTACT = [
  {
    id: 'register',
    title: '입점 문의',
    contents: '오붓에 입점을 원하시면 \n 아래 양식을 제출해주세요.',
    button: '양식 작성',
  },
  {
    id: 'class',
    title: '기업/단체 클래스 문의',
    contents: '기업/단체 클래스 문의는 \n 아래 양식을 제출해주세요',
    button: '양식 작성',
  },
  {
    id: 'collaboration',
    title: '기타 제휴 문의',
    contents: '마케팅 제휴 등 기타 협업 문의는 \n 아래 메일로 연락주세요.',
    button: 'email',
  },
];

const Contact = () => {
  const router = useRouter();

  const root = useContext(RootContext);
  const email = root.info.email;

  const handleEmail = (email) => {
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

  const onClickSubmit = (id, email = '') => {
    switch (id) {
      case 'register':
        router.push('/contact/register');
        break;
      case 'class':
        router.push('/contact/private');
        break;
      case 'collaboration':
        handleEmail(email);
        break;
    }
  };

  return (
    <SContact>
      <BaseTitle title="Contact" />

      <article className="obud-contack-article">
        {CONTACT.map((item) => (
          <ContactItem
            key={item.id}
            title={item.title || ''}
            contents={item.contents || ''}
            button={item.button === 'email' ? email : item.button || ''}
            onClick={() => onClickSubmit(item.id, email)}
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
