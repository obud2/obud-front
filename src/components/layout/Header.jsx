import React, { useEffect, useMemo, useRef, useState } from 'react';

import { throttle } from 'lodash';
import { HeaderContainer } from './Layout.styled';

import Topbar from './Topbar';

import ScrollAction from './scroll/ScrollAction';

const Header = ({ headerHide, headerPosition, headerTitle, addonBeforeHeader, addonAfterHeader, scrollBtnHide }) => {
  const headerRef = useRef();

  const [scrollBtnOpen, setScrollBtnOpen] = useState(false);

  // Scroll Action
  const listener = useMemo(
    () =>
      throttle(() => {
        if (typeof window === undefined) return;
        if (!headerRef.current) return;

        const open = headerRef.current.clientHeight < window.scrollY;
        if (scrollBtnOpen !== open) setScrollBtnOpen(open);
      }, [300]),
    [scrollBtnOpen],
  );

  useEffect(() => {
    if (typeof window !== undefined) {
      window.addEventListener('scroll', listener);

      return () => {
        window.removeEventListener('scroll', listener);
      };
    }
  }, [listener]);

  return (
    <React.Fragment>
      <HeaderContainer ref={headerRef} hide={headerHide} headerPosition={headerPosition}>
        <Topbar
          reverse={headerPosition}
          headerTitle={headerTitle}
          addonBeforeHeader={addonBeforeHeader}
          addonAfterHeader={addonAfterHeader}
        />
      </HeaderContainer>

      {/* 스크롤 Up */}
      <ScrollAction scrollBtn={scrollBtnOpen} hide={scrollBtnHide} />
    </React.Fragment>
  );
};

export default React.memo(Header);
