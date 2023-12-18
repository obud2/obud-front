import React from 'react';

import Layout from '@components/layout/Layout';
import Contact from '@components/contact/Contact';
import MetaHeader from '@components/common/meta/MetaHeader';
import { IMG_PATH } from 'src/constants';

const Index = () => {
  return (
    <Layout addonBeforeHeader="backTicWithHome" scrollBtnHide mobileNavigationHide>
      <MetaHeader title="obud :: contact" image={`${IMG_PATH}/obud_logo_img.png`} />
      <Contact />
    </Layout>
  );
};

export default Index;
