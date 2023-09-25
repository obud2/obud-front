import React from 'react';

import Layout from '@components/layout/Layout';
import Private from '@components/contact/private/Private';
import MetaHeader from '@components/common/meta/MetaHeader';

const Index = () => {
  return (
    <Layout addonBeforeHeader="backTic" addonAfterHeader="empty" mobileNavigationHide>
      <MetaHeader title="obud :: 클래스 문의" />
      <Private />
    </Layout>
  );
};

export default Index;
