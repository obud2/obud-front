import { useState } from 'react';

import { useQuery } from 'react-query';

import { ReservationStatus } from '@/entities/reservation';
import { ReserveService } from '@/service/ReserveService';
import { MOBILE } from '@/styled/variablesStyles';
import CountCheck from '@components/common/countCheck/CountCheck';
import FallBackLoading from '@components/loading/FallBackLoading';
import styled from 'styled-components';
import MyOrderList from './MyOrderList';

const MyOrder = () => {
  const [selectedTab, setSelectedTab] = useState<ReservationStatus>('UPCOMING');

  const { data: reservations = [], isLoading } = useReservations(selectedTab);

  return (
    <>
      <SMyOrder>
        <div className="order-list-header">
          <div className="order-list-title">
            예약내역
            <CountCheck count={reservations?.length ?? 0} />
          </div>
        </div>

        <div className="chip-wrapper">
          <div className={selectedTab === 'UPCOMING' ? 'chip active' : 'chip'} onClick={() => setSelectedTab('UPCOMING')}>
            이용 예정
          </div>
          <div className={selectedTab === 'COMPLETED' ? 'chip active' : 'chip'} onClick={() => setSelectedTab('COMPLETED')}>
            지난 예약
          </div>
          <div className={selectedTab === 'CANCELLED' ? 'chip active' : 'chip'} onClick={() => setSelectedTab('CANCELLED')}>
            취소된 예약
          </div>
        </div>

        {!isLoading && <MyOrderList reservations={reservations} />}
      </SMyOrder>

      <FallBackLoading isLoading={isLoading} />
    </>
  );
};

export default MyOrder;

const useReservations = (status: ReservationStatus) => {
  return useQuery(['reservations/me', status], () => ReserveService.listReservations({ status }), {
    select: (data) => data.value,
  });
};

const SMyOrder = styled.div`
  width: 100%;
  margin-bottom: 104px;

  ${MOBILE} {
    margin-bottom: 0;
  }

  .chip-wrapper {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;

    .chip {
      padding: 4px 8px;
      border-radius: 20px;
      border: 1px solid #e5e5e5;
      font-size: 1.2rem;
      font-family: 400;
      cursor: pointer;

      &:hover {
        background: #f5f5f5;
      }
    }

    .chip.active {
      background: #f5f5f5;
    }
  }

  .order-list-header {
    width: 100%;
    height: 32px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 10px;

    .order-list-title {
      font-size: 1.6rem;
      font-family: 400;

      color: ${(props) => props.theme.main_color_slate_500};

      display: flex;
      align-items: center;
      justify-content: center;

      gap: 5px;
    }
  }
`;
