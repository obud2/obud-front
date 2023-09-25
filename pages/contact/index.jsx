import React from 'react';

import Layout from '@components/layout/Layout';
import Contact from '@components/contact/Contact';
import MetaHeader from '@components/common/meta/MetaHeader';

const Index = () => {
  return (
    <Layout scrollBtnHide mobileNavigationHide>
      <MetaHeader title="obud :: contact" />
      <Contact />
    </Layout>
  );
};

export default Index;
