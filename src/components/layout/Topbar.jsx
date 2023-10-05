import React, { useContext } from 'react';

import { Flex } from 'src/styled/CommonStyles';

import { TopbarContainer } from './Layout.styled';
import { LayoutContext } from 'src/context/LayoutContext';

import Logo from '@components/common/logo/Logo';
import Menu from './menu/Menu';

import Icons from './icons/Icons';

import HeaderAuth from './auth/HeaderAuth';
import BackTic from './option/BackTic';
import HomeBtn from './option/HomeBtn';

const Topbar = ({ reverse, headerTitle, addonBeforeHeader, addonAfterHeader }) => {
  return (
    <TopbarContainer>
      <TopbarRender reverse={reverse} headerTitle={headerTitle} addonBeforeHeader={addonBeforeHeader} addonAfterHeader={addonAfterHeader} />
    </TopbarContainer>
  );
};

// 웹 모바일 별 렌더링 설정
const TopbarRender = ({ reverse, headerTitle, addonBeforeHeader, addonAfterHeader }) => {
  const { matchese } = useContext(LayoutContext);

  return !matchese ? (
    <WebTopbar reverse={reverse} />
  ) : (
    <MobileTopbar reverse={reverse} headerTitle={headerTitle} addonBeforeHeader={addonBeforeHeader} addonAfterHeader={addonAfterHeader} />
  );
};

// 웹 렌더링
const WebTopbar = ({ reverse }) => {
  return (
    <div className="topbar-web-container">
      <div className={`topbar-top ${reverse ? '' : 'reverse'}`}>
        <div className="topbar-slogan">Book your journey to wellness</div>
      </div>

      <div className="topbar-bottom">
        <div className="topbar-group">
          <Logo reverse={reverse} />
        </div>

        <Menu reverse={reverse} />

        <div className="topbar-group">
          <HeaderAuth reverse={reverse} />
        </div>
      </div>
    </div>
  );
};

// 모바일 렌더링
const MobileTopbar = ({ reverse, headerTitle, addonBeforeHeader = 'logo', addonAfterHeader = 'icons' }) => {
  return (
    <div className="topbar-mobile-container">
      <HeaderType reverse={reverse} type={addonBeforeHeader} />

      <h3 className="topbar-title">{headerTitle}</h3>

      <HeaderType reverse={reverse} type={addonAfterHeader} />
    </div>
  );
};

//
const HeaderType = ({ type, reverse }) => {
  const typeTemp = type?.type || type;

  if (typeTemp === 'backTic') {
    return <BackTic onClick={type?.onClick} />;
  }

  if (typeTemp === 'logo') {
    return <Logo reverse={reverse} />;
  }

  if (typeTemp === 'icons') {
    return <Icons reverse={reverse} />;
  }

  if (typeTemp === 'backTicWithHome') {
    return (
      <Flex gap="20px">
        <BackTic onClick={type?.onClick} />

        <HomeBtn onClick={type?.onClick} />
      </Flex>
    );
  }

  if (typeTemp === 'empty') {
    return '';
  }
};

export default React.memo(Topbar);
