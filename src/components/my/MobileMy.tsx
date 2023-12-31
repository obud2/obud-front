import React, { useContext } from 'react';

import { useRouter } from 'next/router';
import { UserContext } from 'src/context/UserContext';

import { TAB } from './My';

import { ADMIN, STUDIO, INSTRUCTOR } from 'src/constants';

import { SMobileMy } from './MobileMy.styled';
import { SlArrowRight } from 'react-icons/sl';

import MobileAuth from '@components/layout/auth/MobileAuth';

const MobileMy = () => {
  const router = useRouter();

  const { user } = useContext(UserContext);

  const onClickMyPageItem = (id: string) => {
    if (id === 'admin') {
      window.open('https://admin.obud.co/pages/auth/login');
    } else {
      router.push(`/my/${id}`);
    }
  };

  const adminPageShow = () => {
    let result = false;

    if (user?.userGroup === ADMIN) {
      result = true;
    }

    if (user?.userGroup === STUDIO) {
      result = true;
    }

    if (user?.userGroup === INSTRUCTOR) {
      result = true;
    }

    return result;
  };

  return (
    <SMobileMy>
      <header className="mobile-my-header">
        <p className="hello-message">안녕하세요.</p>
        <MobileAuth />
      </header>

      <main className="mobile-my-main">
        {TAB?.map((item) => (
          <div key={item?.id} className="mobile-my-menu-tab-list" onClick={() => onClickMyPageItem(item?.id)}>
            <p>{item?.title}</p>
            <SlArrowRight />
          </div>
        ))}
        {adminPageShow() && (
          <div className="mobile-my-menu-tab-list" onClick={() => onClickMyPageItem('admin')}>
            <p>호스트 페이지</p>

            <SlArrowRight />
          </div>
        )}
      </main>
    </SMobileMy>
  );
};

export default MobileMy;
