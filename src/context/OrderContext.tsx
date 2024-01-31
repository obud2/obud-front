import React, { useCallback, useMemo, useState } from 'react';

export type Order = {
  planId: string;
  instructor: string;
  price: number;
  startDate: string;
  endDate: string;
  reservationCount: number;
  payOption:
    | {
        price: number;
        title: string;
        maxMember: number;
        currentMember: number;
      }
    | Record<never, never>;
  payOptionCount: number;
  lessonTitle: string;
  lessonImages: {
    key: string;
    name: string;
    size: number;
    type: string;
    upload: boolean;
    url: string;
  }[];
  studiosTitle: string;
  instructorName: string;
  format: {
    date: string;
    startTime: string;
    endTime: string;
  };
};

/**
 *
 * @param {*} param0
 * @returns 사용자 주문 목록 관리
 */
const OrderProvider = ({ children }) => {
  const [orderList, setOrderList] = useState<Order[]>([]);

  const setOrder = useCallback((param: Order[]) => {
    setOrderList(param);
  }, []);

  const value = useMemo(
    () => ({
      order: orderList,
      setOrder,
    }),
    [orderList, setOrder],
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const OrderContext = React.createContext<{
  order: Order[];
  setOrder: (orders: Order[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
}>({ order: [], setOrder: () => {} });

export default OrderProvider;
