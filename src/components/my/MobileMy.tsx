import { UserPass, UserPassStatus } from '@/entities/pass';
import { PassService } from '@/service/PassService';
import MobileAuth from '@components/layout/auth/MobileAuth';
import { useRouter } from 'next/router';
import { SlArrowRight } from 'react-icons/sl';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { TABS } from './My';

import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import moment from 'moment';

const MobileMy = () => {
  const router = useRouter();
  const { data: userPasses } = useUserPasses('IN_USE');

  const handleClickPassReserve = (userPass: UserPass) => {
    router.push(`/class/${userPass.place.id}?tab=reservation`);
  };

  const handleClickPassDetail = (userPass: UserPass) => {
    router.push(`my/pass/${userPass.id}`);
  };

  const onClickMyPageItem = (id: string) => {
    router.push(`/my/${id}`);
  };

  return (
    <SMobileMy>
      <header className="mobile-my-header">
        <MobileAuth />
      </header>

      <main className="mobile-my-pass">
        <div className="pass-title">보유한 패스</div>
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
                <Card>
                  <div className="title">
                    {userPass.pass.title} (D-{moment(userPass.endDate).diff(moment(), 'days') + 1})
                  </div>
                  <div className="description">{userPass.place.title}</div>
                  <div className="description option">
                    <span>
                      예약 횟수: ({userPass.totalReservations} / {userPass.pass.maxReservations})
                    </span>
                    <span>
                      취소 횟수: ({userPass.totalCancels} / {userPass.pass.maxCancels})
                    </span>
                  </div>
                  <div className="link">
                    <div className="link-item" onClick={() => handleClickPassReserve(userPass)}>
                      예약 하기
                    </div>
                    <div className="vline" />
                    <div className="link-item" onClick={() => handleClickPassDetail(userPass)}>
                      상세 보기
                    </div>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </main>

      <main className="mobile-my-main">
        {TABS.map(
          (item) =>
            item.id !== 'edit' && ( // '프로필수정' 은 제외
              <div key={item?.id} className="mobile-my-menu-tab-list" onClick={() => onClickMyPageItem(item?.id)}>
                <p>{item?.title}</p>
                <SlArrowRight />
              </div>
            ),
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
  height: 130px;
  margin: 0 5px;

  .title {
    font-size: 1.4rem;
    font-weight: 600;
  }

  .description {
    font-size: 1.1rem;
    margin-top: 8px;
  }

  .option {
    font-size: 1rem;
    span {
      margin-right: 8px;
    }
  }

  .link {
    width: 100%;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin-top: 10px;
    gap: 40px;
  }

  .link-item {
    text-align: center;
    position: relative;
  }

  .vline {
    padding-top: 2px;
    width: 1px;
    height: 80%;
    background-color: #fff;
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
    padding: 32px 0;

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

  .swiper .swiper-pagination {
    position: relative;
    margin-top: 20px;
  }

  .mobile-my-pass {
    width: 100%;
    padding: 25px 0;

    border-bottom: 1px solid rgba(171, 182, 165, 0.2);

    display: flex;
    flex-direction: column;

    .pass-title {
      color: #555555;
      font-size: 1.4rem;
      font-weight: bold;
      margin-bottom: 15px;
    }
  }

  .mobile-my-main {
    width: 100%;
    padding: 15px 0;

    border-bottom: 1px solid rgba(171, 182, 165, 0.2);

    display: flex;
    flex-direction: column;

    gap: 5px;
  }

  .mobile-my-menu-tab-list {
    width: 100%;
    height: 50px;

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
`;
