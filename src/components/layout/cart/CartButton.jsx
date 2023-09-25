import React, { useContext } from 'react';

import { CartContext } from 'src/context/CartContext';

import { useRouter } from 'next/router';
import useDrawer from 'src/store/useDrawer';

import { SCartButton } from './CartButton.styled';

const CartButton = ({ reverse }) => {
  const router = useRouter();

  const { cart } = useContext(CartContext);
  const { onClickCloseDrawer } = useDrawer((state) => ({
    onClickCloseDrawer: state.onClickCloseDrawer,
  }));

  const onClickCartIcon = async () => {
    onClickCloseDrawer();
    router.push('/cart');
  };

  return (
    <SCartButton onClick={onClickCartIcon}>
      <i className={`icons cart ${reverse ? '' : 'active'}`} />

      {cart && cart?.length > 0 && (
        <div className="cart-length-container">
          <p>{cart?.length || 1}</p>
        </div>
      )}
    </SCartButton>
  );
};

export default CartButton;
