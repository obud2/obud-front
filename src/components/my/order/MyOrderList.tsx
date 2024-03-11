import React from 'react';

import { useRouter } from 'next/router';

import MyOrderItem from './MyOrderItem';
import { MOBILE } from '@/styled/variablesStyles';
import styled from 'styled-components';
import { Reservation } from '@/entities/reservation';

type Props = {
  reservations: Reservation[];
};

const MyOrderList = ({ reservations }: Props) => {
  const router = useRouter();

  const onClickOrderDetail = (id: Reservation['id']) => {
    router.push(`/my/order/${id}`);
  };

  return (
    <SMyOrderList>
      {reservations.map((reservation) => {
        return (
          <div className="order-list-container" key={reservation.id}>
            {/* <div className="order-date-header">주문일자 {moment(reservation.reserveAt).format('YYYY-MM-DD')}</div> */}
            <div className="order-date-main">
              <MyOrderItem reservation={reservation} onClickOrderDetail={onClickOrderDetail} />
            </div>
          </div>
        );
      })}
      {reservations.length === 0 && <p className="empty-text">예약 된 상품이 없습니다.</p>}
    </SMyOrderList>
  );
};

export default MyOrderList;

const SMyOrderList = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  font-size: 13px;

  .empty-text {
    color: ${(props) => props.theme.main_color_slate_300};
  }

  .order-list-container {
    width: 100%;
    margin-bottom: 40px;

    ${MOBILE} {
      margin-bottom: 24px;
    }

    .order-date-header {
      font-weight: 400;
      line-height: 140%;

      color: #565656;

      padding-bottom: 10px;

      border-bottom: 1px solid ${(props) => props.theme.core_color_slate_50};

      ${MOBILE} {
        display: none;
      }
    }

    .order-date-main {
      width: 100%;
      display: flex;
      flex-direction: column;

      padding: 24px 0;

      gap: 24px;

      ${MOBILE} {
        padding: 0;
      }
    }
  }
`;
