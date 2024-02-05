import React from 'react';

import _ from 'lodash';
import moment from 'moment';
import { getUserId } from 'src/constants';

import { useQuery } from 'react-query';

import { SMyOrder } from './MyOrder.styled';

import MyOrderList from './MyOrderList';
import CountCheck from '@components/common/countCheck/CountCheck';
import FallBackLoading from '@components/loading/FallBackLoading';
import { myReservations } from '@/service/UserService';

const MyOrder = () => {
  const userId = getUserId();

  const fetchData = async () => {
    const res = await myReservations();
    const dateSet = new Set();
    const dateToItems = {};

    res.value?.forEach((a) => {
      const date = moment(a?.createdAt).format('YYYYMMDD');

      dateSet.add(date);
    });

    Array.from(dateSet)?.forEach((a) => {
      dateToItems[a] = [];
    });

    res.value?.forEach((a) => {
      const date = moment(a?.createdAt).format('YYYYMMDD');

      if (dateToItems[date]) dateToItems[date]?.push(a);
    });

    const sortedKeys = _.cloneDeep(
      Object.keys(dateToItems).sort((a, b) => {
        const aSort = Number(a);
        const bSort = Number(b);

        return aSort > bSort ? -1 : 1;
      }),
    );

    const sortedObj = {};
    sortedKeys.forEach((key) => {
      const keyFormat = moment(key).format('YYYY-MM-DD');

      sortedObj[keyFormat] = dateToItems[key];
    });

    return {
      total: res?.value?.length ?? 0,
      list: sortedObj,
    };
  };

  const { data, isLoading } = useQuery(['my-order-list', userId], fetchData, { enabled: !!userId });

  return (
    <React.Fragment>
      <SMyOrder>
        <div className="order-list-header">
          <div className="order-list-title">
            예약내역
            <CountCheck count={data?.total ?? 0} />
          </div>
        </div>

        <MyOrderList list={data?.list || {}} />
      </SMyOrder>

      <FallBackLoading isLoading={isLoading} />
    </React.Fragment>
  );
};

export default MyOrder;
