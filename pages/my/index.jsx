import React from 'react';

import Layout from '@components/layout/Layout';
import MetaHeader from '@components/common/meta/MetaHeader';
import MobileMy from '@components/my/MobileMy';

const Index = () => {
  return (
    <Layout>
      <MetaHeader title="obud :: 마이페이지" />
      <MobileMy />
    </Layout>
  );
};

export default Index;
