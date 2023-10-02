import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import useVisit from 'src/hook/useVisit';

import AuthModal from '@components/auth/AuthModal';
import MobileDrawer from './drawer/MobileDrawer';
import useSnsLoginCheck from 'src/hook/useSnsLoginCheck';
import MobileNavigation from './menu/MobileNavigation';

/**
 *
 * @param {React} React Component
 * @param {*} headerHide : 헤더 숨기기
 * @param {*} headerPosition : absolute -> 메인과 겹처서 띄우기
 *
 * @param {*} footerHide : 푸터 숨기기
 *
 * @param {*} scrollBtnHide : 스크롤 Tob 이벤트
 *
 * @returns Layout ( 모든 페이지에 감싸서 사용 )
 */

const Layout = ({
  children,
  headerHide,
  headerPosition,
  headerTitle,
  addonBeforeHeader,
  addonAfterHeader,
  mobileNavigationHide,
  footerHide,
  scrollBtnHide,
}: any) => {
  useVisit();
  useSnsLoginCheck();

  return (
    <>
      <Header
        headerHide={headerHide}
        headerPosition={headerPosition}
        headerTitle={headerTitle}
        addonBeforeHeader={addonBeforeHeader}
        addonAfterHeader={addonAfterHeader}
        scrollBtnHide={scrollBtnHide}
      />

      <Main>{children}</Main>
      <Footer footerHide={footerHide} />

      {/* 모바일 네비게이션 바 */}
      <MobileNavigation mobileNavigationHide={mobileNavigationHide} />

      {/* 로그인/회원가입 모달 */}
      <AuthModal />

      {/* 모바일 메뉴창 - 현재사용안함 */}
      <MobileDrawer />
    </>
  );
};

export default Layout;
