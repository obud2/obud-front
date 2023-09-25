import React, { useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { OrderContext } from 'src/context/OrderContext';
import { CartContext } from 'src/context/CartContext';

import { addComma, loginCheck } from 'src/constants';
import { SCart } from './Cart.styled';

import _ from 'lodash';
import alert from 'src/helpers/alert';

import FallBackLoading from '@components/loading/FallBackLoading';

import BaseTitle from '@components/base/BaseTitle';
import CartItem from './CartItem';
import CustomCheckBox from '@components/common/checkbox/CustomCheckBox';
import CustomButton from '@components/common/button/CustomButton';
import useAuthModal from 'src/store/useAuthModal';

const HEADER = ['상품정보', '날짜', '시간', '기본금액', '인원', '추가옵션', '예약금액', '비고'];

const Cart = () => {
  const CLASS_URL = '/class';

  const router = useRouter();

  const { setOrder } = useContext(OrderContext);
  const { cart, isLoading, deleteCart } = useContext(CartContext);
  const { onClickOpenAuth } = useAuthModal((state) => ({
    onClickOpenAuth: state.onClickOpenAuth,
  }));

  const [isChecked, setIsChecked] = useState([]);
  const [isImpossibleItems, setIsImpossibleItems] = useState([]);

  const [checkedItems, setCheckedItems] = useState([]);

  const [totalPrice, setTotalPirce] = useState(0);

  useEffect(() => {
    if (Array.isArray(cart)) {
      const temp = [];
      const impossible = [];

      cart?.forEach((a) => {
        temp.push(a?.id);

        if (a?.reservationStatus === 'impossible') impossible.push(a?.id);
      });

      setIsImpossibleItems(impossible);
      setIsChecked(temp);
    }
  }, [cart]);

  useEffect(() => {
    if (Array.isArray(cart) && Array.isArray(isChecked)) {
      let total = 0;
      const temp = [];

      cart?.forEach((a) => {
        if (isChecked.includes(a?.id)) {
          total += a?.totalPrice || 0;
          a.cart = true;
          temp.push(a);
        }
      });

      setTotalPirce(total);
      setCheckedItems(temp);
    }
  }, [cart, isChecked]);

  const onClickCartAllSelect = (e) => {
    if (e) {
      const all = [];

      cart.forEach((a) => {
        all.push(a?.id);
      });

      setIsChecked(all);
    } else {
      setIsChecked([]);
    }
  };

  const onClickCartItem = (id) => {
    const temp = _.cloneDeep(isChecked);
    const findIndex = temp.findIndex((a) => a === id);

    if (findIndex > -1) {
      temp.splice(findIndex, 1);
    } else {
      temp.push(id);
    }

    setIsChecked(temp);
  };

  const onClickOrder = () => {
    if (!loginCheck()) {
      onClickOpenAuth('login');
      return false;
    }

    if (!(checkedItems?.length > 0)) {
      alert('', '예약할 상품을 선택해주세요.');
      return;
    }

    for (const i of checkedItems) {
      if (i?.format?.pastDate) {
        alert('', '상품의 날짜를 확인해주세요.');
        return;
      }
    }

    for (const i of checkedItems) {
      if (i?.reservationStatus === 'impossible') {
        alert('', '품절된 상품이 있습니다.');
        return;
      }
    }

    setOrder(checkedItems).then(() => {
      router.push('/booking');
    });
  };

  return (
    <React.Fragment>
      <SCart>
        <BaseTitle title="장바구니" basic />

        <article className="obud-cart-article">
          <div className="cart-item-header-container">
            <div className="cart-select-container">
              <CustomCheckBox value={isChecked?.length === cart?.length} onClick={onClickCartAllSelect} />
            </div>

            <ul className="cart-item-header">
              {HEADER?.map((item) => (
                <li key={item} className="cart-header-item">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="cart-item-list-container">
            {cart && cart?.length > 0 ? (
              cart?.map((item) => (
                <CartItem
                  key={item?.id}
                  id={item?.id}
                  item={item}
                  isChecked={isChecked?.includes(item?.id)}
                  status={item?.reservationStatus}
                  onClick={onClickCartItem}
                />
              ))
            ) : (
              <div className="cart-empty">
                <i className="icons cart empty" />
                <p>장바구니가 비어있습니다.</p>
              </div>
            )}
          </div>

          <div className="cart-item-check-container">
            <div className="cart-item-button-container">
              <CustomButton className="cart-delete-button" variant="outlined" onClick={() => deleteCart(isChecked)}>
                선택 상품삭제
              </CustomButton>

              <CustomButton className="cart-delete-button" variant="outlined" onClick={() => deleteCart(isImpossibleItems)}>
                품절 상품삭제
              </CustomButton>
            </div>

            <div className="cart-select-total-price-container">
              <p>총 예약금액</p>
              <p>{`${addComma(totalPrice || 0)}원`}</p>
            </div>
          </div>

          <div className="cart-item-reservation">
            <CustomButton className="cart-order-button" onClick={onClickOrder}>
              예약하기
            </CustomButton>
          </div>

          <div className="cart-item-reservation">
            <button className="shopping-button" onClick={() => router.push(CLASS_URL)}>
              계속 쇼핑하기
            </button>
          </div>
        </article>
      </SCart>

      <FallBackLoading isLoading={isLoading} />
    </React.Fragment>
  );
};

export default Cart;
