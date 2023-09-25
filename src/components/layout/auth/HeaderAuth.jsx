import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import useAuthModal from 'src/store/useAuthModal';

import { SHeaderAuth } from './HeaderAuth.styled';
import { HAVE_AUTH, HAVE_NO_AUTH } from './HeaderAuth.group';

import { loginCheck, userLogout } from 'src/constants';

import CartButton from '../cart/CartButton';
import SearchIcon from '../search/SearchIcon';

const HeaderAuth = ({ reverse }) => {
  const router = useRouter();

  const { onClickOpenAuth } = useAuthModal((state) => ({
    onClickOpenAuth: state.onClickOpenAuth,
  }));

  const [auth, setAuth] = useState([]);

  useEffect(() => {
    if (loginCheck()) {
      setAuth(HAVE_AUTH);
    } else {
      setAuth(HAVE_NO_AUTH);
    }
  }, [router]);

  const onClickAuth = (id) => {
    switch (id) {
      case 'login':
        onClickOpenAuth('login');
        break;
      case 'join':
        onClickOpenAuth('joinPortal');
        break;

      case 'my':
        router.push('/my/order');
        break;
      case 'logout':
        userLogout();
        break;

      case 'cart':
        router.push('/cart');
        break;
    }
  };

  return (
    <SHeaderAuth>
      {auth?.map((item) => (
        <li key={item?.id} className={`header-auth-item ${reverse ? 'active' : ''}`} onClick={() => onClickAuth(item?.id)}>
          {item?.title}
        </li>
      ))}

      <CartButton reverse={reverse} />

      <SearchIcon reverse={reverse} />
    </SHeaderAuth>
  );
};

export default HeaderAuth;
