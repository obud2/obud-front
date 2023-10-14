import React from 'react';

import { SSnsIcons } from './SnsIcons.styled';
import CustomImage, { AutoHeightImageWrapper } from '../image/CustomImage';

const SNS_ICONS = [
  {
    id: 'instagram',
    icon: '/icons/ic_instagram.png',
    link: 'https://www.instagram.com/obudyoga/',
  },
  // {
  //   id: 'kakao',
  //   icon: '/icons/ic_kakao.png',
  //   link: 'https://pf.kakao.com/_xaxaxdwxj/chat',
  // },
  {
    id: 'youtube',
    icon: '/icons/ic_youtube.png',
    link: 'https://www.youtube.com/channel/UCKrIH-EyLerIziKR_XxfEgA',
  },
];

const SnsIcons = () => {
  const onActiveSns = (url) => {
    if (url) window.open(url);
  };

  return (
    <SSnsIcons>
      {SNS_ICONS?.map((sns) => (
        <span key={sns?.id} className={`sns-icon-item ${sns?.id}`} onClick={() => onActiveSns(sns?.link)}>
          <AutoHeightImageWrapper>
            <CustomImage src={sns?.icon || ''} width={20} height={20} alt={sns?.id} placeholder="empty" />
          </AutoHeightImageWrapper>
        </span>
      ))}
    </SSnsIcons>
  );
};

export default SnsIcons;
