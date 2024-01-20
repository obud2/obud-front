import React from 'react';

import Layout from '@components/layout/Layout';
import MetaHeader from '@components/common/meta/MetaHeader';

import MyOrderDetail from '@components/my/order/detail/MyOrderDetail';

const Index = () => {
  return (
    <Layout scrollBtnHide addonBeforeHeader="backTic" addonAfterHeader="empty" headerTitle="예약내역" mobileNavigationHide>
      <MetaHeader title="obud :: 예약내역" />
      <MyOrderDetail />
    </Layout>
  );
};

export default Index;
