import React from 'react';

import Layout from '@components/layout/Layout';
import Cart from '@components/cart/Cart';
import MetaHeader from '@components/common/meta/MetaHeader';

const Index = () => {
  return (
    <Layout addonBeforeHeader="backTic" addonAfterHeader="empty" headerTitle="장바구니" mobileNavigationHide>
      <MetaHeader title="obud :: 장바구니" />
      <Cart />
    </Layout>
  );
};

export default Index;
