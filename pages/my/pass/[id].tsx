import React from 'react';

import Layout from '@components/layout/Layout';
import MetaHeader from '@components/common/meta/MetaHeader';
import MyPassDetail from '@/components/my/pass/MyPassDetail';

const Index = () => {
  return (
    <Layout scrollBtnHide addonBeforeHeader="backTic" addonAfterHeader="empty" headerTitle="패스" mobileNavigationHide>
      <MetaHeader title="obud :: 패스" />
      <MyPassDetail />
    </Layout>
  );
};

export default Index;
