import React from 'react';

import { useRouter } from 'next/router';

import { SMyOrderList } from './MyOrderList.styled';

import moment from 'moment';
import MyOrderItem from './MyOrderItem';

const MyOrderList = ({ list }) => {
  const router = useRouter();

  const onClickOrderDetail = (id) => {
    router.push(`/my/order/${id}`);
  };

  return (
    <SMyOrderList>
      {list && Object?.entries(list)?.length > 0 ? (
        Object?.entries(list)?.map((item) => {
          const date = item?.[0] || '';
          const list = item?.[1] || [];

          return (
            <div className="order-list-container" key={`my-order-list-${date}`}>
              <div className="order-date-header">주문일자 {moment(date).format('YYYY-MM-DD')}</div>

              <div className="order-date-main">
                {list && list?.length > 0 && list?.map((a) => <MyOrderItem key={a?.id} data={a} onClickOrderDetail={onClickOrderDetail} />)}
              </div>
            </div>
          );
        })
      ) : (
        <p className="empty-text">예약 된 상품이 없습니다.</p>
      )}
    </SMyOrderList>
  );
};

export default MyOrderList;
