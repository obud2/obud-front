import React from 'react';

import Layout from '@components/layout/Layout';
import Hiring from '@components/contact/hiring/Hiring';
import MetaHeader from '@components/common/meta/MetaHeader';

const Index = () => {
  return (
    <Layout addonBeforeHeader="backTic" addonAfterHeader="empty" mobileNavigationHide>
      <MetaHeader title="obud :: 강사 지원" />
      <Hiring />
    </Layout>
  );
};

export default Index;
