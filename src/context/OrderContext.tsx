/* eslint-disable @typescript-eslint/no-empty-function */
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
  lessonId: string;
  lessonTitle: string;
  lessonImages: {
    key: string;
    name: string;
    size: number;
    type: string;
    upload: boolean;
    url: string;
  }[];
  studiosId: string;
  studiosTitle: string;
  instructorName: string;
  format: {
    date: string;
    startTime: string;
    endTime: string;
  };
  // needed for booking page
  maxMember?: number;
  currentMember?: number;
};

export const hasPrice = (
  payOption: Order['payOption'],
): payOption is {
  price: number;
  title: string;
  maxMember: number;
  currentMember: number;
} => (payOption as any).price !== undefined;

/**
 *
 * @param {*} param0
 * @returns 사용자 주문 목록 관리
 */
const OrderProvider = ({ children }) => {
  // 현재 세션에서 결제가 완료된 imp_uid 목록
  const [finishedOrderList, setFinishedOrderList] = useState<string[]>([]);
  const [orderList, setOrderList] = useState<Order[]>([]);

  const setOrder = useCallback((param: Order[]) => {
    setOrderList(param);
  }, []);

  const setFinishedOrder = useCallback((orderId: string) => {
    setFinishedOrderList((prev) => Array.from(new Set([...prev, orderId])));
  }, []);

  const value = useMemo(
    () => ({
      order: orderList,
      setOrder,
      finishedOrder: finishedOrderList,
      setFinishedOrder,
    }),
    [orderList, setOrder, finishedOrderList, setFinishedOrder],
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const OrderContext = React.createContext<{
  order: Order[];
  setOrder: (orders: Order[]) => void;
  finishedOrder: string[];
  setFinishedOrder: (impUid: string) => void;
}>({
  order: [],
  setOrder: () => {},
  finishedOrder: [],
  setFinishedOrder: () => {},
});

export default OrderProvider;
