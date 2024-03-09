import React from 'react';

import Layout from '@components/layout/Layout';
import MetaHeader from '@components/common/meta/MetaHeader';
import PurchasePass from '@/components/purchase/PurchasePass';

const Index = () => {
  return (
    <Layout scrollBtnHide addonBeforeHeader="backTic" addonAfterHeader="empty" headerTitle="패스구매" mobileNavigationHide>
      <MetaHeader title="obud :: 패스구매" />
      <PurchasePass />
    </Layout>
  );
};

export default Index;
