import React from 'react';

import Link from 'next/link';
import CustomImage from '../image/CustomImage';

import { SLogo } from './Logo.styled';
import { APP_PREFIX, IMG_PATH } from 'src/constants';

const Logo = ({ reverse }) => {
  return (
    <Link href="/">
      <SLogo>
        <p className="logo-title">{APP_PREFIX}</p>
        <CustomImage
          src={`${IMG_PATH}/obud_logo${reverse ? '_active' : ''}.png`}
          // width={99}
          // height={33}
          quality={90}
          layout="fill"
          loading="eager"
          placeholder="empty"
          alt={APP_PREFIX}
        />
      </SLogo>
    </Link>
  );
};

export default Logo;
