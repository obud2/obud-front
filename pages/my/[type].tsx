import React from 'react';

import { useRouter } from 'next/router';

import Layout from '@components/layout/Layout';
import MetaHeader from '@components/common/meta/MetaHeader';

import My from '@components/my/My';

const Index = () => {
  const router = useRouter();
  const { type } = router.query;

  return (
    <Layout addonBeforeHeader={type !== 'order' ? 'backTic' : 'logo'} addonAfterHeader="empty" mobileNavigationHide={type !== 'order'}>
      <MetaHeader title="obud :: 마이페이지" />
      <My />
    </Layout>
  );
};

export default Index;
