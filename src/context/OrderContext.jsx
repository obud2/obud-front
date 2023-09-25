import React, { useCallback, useMemo, useState } from 'react';

/**
 *
 * @param {*} param0
 * @returns 사용자 주문 목록 관리
 */
const OrderProvider = ({ children }) => {
  const [orderList, setOrderList] = useState([]);

  const setOrder = useCallback(async (param) => {
    await setOrderList(param);
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

export const OrderContext = React.createContext({});

export default OrderProvider;
