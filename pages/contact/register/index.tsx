import React from 'react';

import Layout from '@components/layout/Layout';
import MetaHeader from '@components/common/meta/MetaHeader';
import Register from '@components/contact/register/Register';

const Index = () => {
  return (
    <Layout addonBeforeHeader="backTic" addonAfterHeader="empty" mobileNavigationHide>
      <MetaHeader title="obud :: 입점 문의" />
      <Register />
    </Layout>
  );
};

export default Index;
