import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { loginCheck } from 'src/constants';
import { useRouter } from 'next/router';

import alert from 'src/helpers/alert';

import CartService from 'src/service/CartService';

/**
 *
 * @param {*} param0
 * @returns 사용자 장바구니 관리
 */
const CartProvider = ({ children }) => {
  const router = useRouter();

  const [cartList, setCartList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 로그인 시 카트 API 호출
    if (loginCheck()) getCart();
  }, []);

  const getCart = useCallback(() => {
    setIsLoading(true);

    CartService.getCart().then((res) => {
      setCartList(res);
      setIsLoading(false);
    });
  }, []);

  const setCart = useCallback((param) => {
    setIsLoading(true);

    CartService.setCart(param).then(() => {
      setIsLoading(false);

      getCart();
      alert('', '선택하신 상품을 장바구니에 담았습니다.', '장바구니', '계속쇼핑', (_) => {
        if (!_) router.push('/cart');
      });
    });
  }, []);

  const deleteCart = useCallback((list) => {
    if (list?.length > 0) {
      CartService.deleteCart({ cartId: list }).then(() => {
        getCart();
        setIsLoading(false);
      });
    }
  }, []);

  const value = useMemo(
    () => ({
      cart: cartList,
      isLoading,
      setCart,
      deleteCart,
    }),
    [cartList, isLoading, setCart, deleteCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const CartContext = React.createContext({ cart: {} });

export default CartProvider;
