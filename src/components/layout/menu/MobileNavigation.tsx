import React from 'react';

import { useRouter } from 'next/router';
import useAuthModal from 'src/store/useAuthModal';

import { MENU } from './MobileNavigation.option';
import { SMobileNavigation } from './MobileNavigation.styled';
import { loginCheck } from 'src/constants';

const MobileNavigation = ({ mobileNavigationHide }: any) => {
  const router = useRouter();

  const { onClickOpenAuth } = useAuthModal((state) => ({
    onClickOpenAuth: state.onClickOpenAuth,
  }));

  const onClickNaviItem = (item: any) => {
    if (item?.id === 'my' || item?.id === 'liked') {
      if (!loginCheck()) {
        onClickOpenAuth('login');
        return false;
      }
    }

    router.push(item?.link);
  };

  if (!mobileNavigationHide) {
    return (
      <SMobileNavigation>
        <div className="navigation-items-container">
          {MENU?.map((item) => (
            <MobileNavigationItem
              key={item?.id}
              label={item?.label}
              icon={item?.icon}
              active={router.asPath === item?.link}
              onClick={() => onClickNaviItem(item)}
            />
          ))}
        </div>
      </SMobileNavigation>
    );
  }

  return null;
};

const MobileNavigationItem = ({ icon, label, active, onClick }: any) => {
  return (
    <div className={`navigation-item ${active ? 'active' : ''}`} onClick={onClick}>
      <i className={`icons menu_${icon} ${active ? 'active' : ''}`} />
      <p className="navigation-item-label">{label}</p>
    </div>
  );
};

export default MobileNavigation;
