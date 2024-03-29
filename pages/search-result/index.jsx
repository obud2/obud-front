import React from 'react';

import Layout from '@components/layout/Layout';
import MetaHeader from '@components/common/meta/MetaHeader';
import SearchResult from '@/components/search/result/SearchResult';

const Index = () => {
  return (
    <Layout addonBeforeHeader="backTic" addonAfterHeader="empty" mobileNavigationHide>
      <MetaHeader title="obud :: 검색 결과" />
      <SearchResult />
    </Layout>
  );
};

export default Index;
