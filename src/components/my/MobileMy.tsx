import MobileAuth from '@components/layout/auth/MobileAuth';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { SlArrowRight } from 'react-icons/sl';
import { ADMIN, INSTRUCTOR, STUDIO } from 'src/constants';
import { UserContext } from 'src/context/UserContext';
import styled from 'styled-components';
import { TABS, TabType } from './My';
import { FeatureFlagService } from '@/service/FeatureFlagService';

const MobileMy = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);

  const [tabs, setTabs] = useState<TabType[]>(TABS);

  useEffect(() => {
    if (FeatureFlagService.isPassFeatureEnabled()) {
      setTabs([{ id: 'pass', title: '패스 관리' }, ...TABS]);
    }
  }, []);

  const onClickMyPageItem = (id: string) => {
    if (id === 'admin') {
      window.open('https://admin.obud.co/pages/auth/login');
    } else {
      router.push(`/my/${id}`);
    }
  };

  const adminPageShow = () => {
    if (user?.userGroup === ADMIN || user?.userGroup === STUDIO || user?.userGroup === INSTRUCTOR) {
      return true;
    }

    return false;
  };

  return (
    <SMobileMy>
      <header className="mobile-my-header">
        <p className="hello-message">안녕하세요.</p>
        <MobileAuth />
      </header>

      <main className="mobile-my-main">
        {tabs?.map((item) => (
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

const SMobileMy = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  padding: 0 15px;

  .mobile-my-header {
    width: 100%;
    padding: 40px 0 32px;

    border-bottom: 1px solid rgba(171, 182, 165, 0.2);

    .hello-message {
      color: #555555;
      font-size: 1.3rem;
      margin-bottom: 10px;
    }
  }

  .mobile-my-main {
    width: 100%;
    padding: 12px 0;

    border-bottom: 1px solid rgba(171, 182, 165, 0.2);

    display: flex;
    flex-direction: column;

    gap: 5px;

    .mobile-my-menu-tab-list {
      width: 100%;
      height: 60px;

      display: flex;
      align-items: center;
      justify-content: space-between;

      color: #555555;
      font-size: 1.3rem;

      cursor: pointer;

      svg {
        width: 12px;
        height: 12px;

        color: ${(props) => props.theme.main_color_slate_200};
      }
    }
  }
`;
