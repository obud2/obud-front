import React from 'react';

import Layout from '@components/layout/Layout';
import MetaHeader from '@components/common/meta/MetaHeader';
import useSnsLoginCheck from '@/hook/useSnsLoginCheck';

// 소셜 로그인 후 콜백되는 페이지
const Index = () => {
  useSnsLoginCheck();

  return (
    <Layout headerHide footerHide>
      <MetaHeader title="obud :: 소셜로그인" />
    </Layout>
);
};

export default Index;
