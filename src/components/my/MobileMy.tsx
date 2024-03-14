import { UserPass, UserPassStatus } from '@/entities/pass';
import { PassService } from '@/service/PassService';
import MobileAuth from '@components/layout/auth/MobileAuth';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { SlArrowRight } from 'react-icons/sl';
import { useQuery } from 'react-query';
import { ADMIN, INSTRUCTOR, STUDIO } from 'src/constants';
import { UserContext } from 'src/context/UserContext';
import styled from 'styled-components';
import { TABS } from './My';

import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import moment from 'moment';

const MobileMy = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { data: userPasses } = useUserPasses('IN_USE');

  const handleClickPass = (userPass: UserPass) => {
    router.push(`/class/${userPass.place.id}?tab=reservation`);
  };

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
        <div className="pass-title">보유 패스</div>
        {userPasses && userPasses?.length === 0 && (
          <div style={{ margin: '0 auto' }}>
            <Card style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '14px' }}>보유한 패스가 없습니다.</div>
            </Card>
          </div>
        )}
        {userPasses && userPasses.length > 0 && (
          <Swiper
            style={
              {
                '--swiper-pagination-color': '#4E5C4F',
                '--swiper-pagination-bullet-inactive-color': '#999999',
                '--swiper-pagination-bullet-inactive-opacity': '1',
                '--swiper-pagination-bullet-size': '6px',
                '--swiper-pagination-bullet-horizontal-gap': '4px',
              } as any
            }
            pagination
            modules={[Pagination]}
          >
            {userPasses.map((userPass) => (
              <SwiperSlide key={userPass.id}>
                <Card onClick={() => handleClickPass(userPass)}>
                  <div className="title">{userPass.place.title}</div>
                  <div className="description">{userPass.pass.title}</div>
                  <div className="description">
                    만료일: {moment(userPass.endDate).format('YYYY-MM-DD')} (D-{moment(userPass.endDate).diff(moment(), 'days')+1})
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </main>

      <main className="mobile-my-main">
        {TABS.map((item) => (
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

const useUserPasses = (status: UserPassStatus) => {
  return useQuery(['userPasses/me', status], () => PassService.listUserPasses({ status }), { select: (data) => data.value });
};

const Card = styled.div`
  background: ${(props) => props.theme.main_color_slate_500};
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  color: #fff;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 300px;
  padding: 20px 32px;
  height: 120px;
  margin: 0 5px;

  .title {
    font-size: 1.4rem;
    font-weight: 600;
  }

  .description {
    font-size: 1.2rem;
    margin-top: 8px;
  }
`;

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

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .mobile-my-main {
    width: 100%;
    padding: 12px 0;

    border-bottom: 1px solid rgba(171, 182, 165, 0.2);

    display: flex;
    flex-direction: column;

    gap: 5px;

    .pass-title {
      color: #555555;
      font-size: 1.3rem;
      margin-bottom: 10px;
      font-weight: bold;
    }

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
